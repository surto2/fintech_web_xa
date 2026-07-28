import { promises as fs } from "fs";
import path from "path";
import type { Post } from "@/lib/posts";
import type { SiteSettings } from "@/lib/site";
import { plainTextFromHtml } from "@/lib/article-html";

export { plainTextFromHtml, normalizeArticleHtml } from "@/lib/article-html";

const root = process.cwd();
const postsPath = path.join(root, "content", "posts.json");
const settingsPath = path.join(root, "content", "site-settings.json");
const uploadsRoot = path.join(root, "public", "uploads");

const ALLOWED_UPLOAD_TYPES: Record<string, string> = {
  "image/jpeg": ".jpg",
  "image/png": ".png",
  "image/webp": ".webp",
  "image/gif": ".gif",
};

export const MAX_UPLOAD_BYTES = 5 * 1024 * 1024;

export type WriteResult = {
  committed: boolean;
  local: boolean;
  error?: string;
};

export type RepoWriteFile = {
  absolutePath: string;
  content: string | Buffer;
};

function githubConfig() {
  const token = process.env.GITHUB_TOKEN;
  const repo = process.env.GITHUB_REPO || "surto2/fintech_web_xa";
  const branch = process.env.GITHUB_BRANCH || "main";
  return { token, repo, branch };
}

function githubHeaders(token: string) {
  return {
    Authorization: `Bearer ${token}`,
    Accept: "application/vnd.github+json",
    "X-GitHub-Api-Version": "2022-11-28",
  };
}

async function tryLocalWrite(filePath: string, content: string | Buffer) {
  try {
    await fs.mkdir(path.dirname(filePath), { recursive: true });
    await fs.writeFile(filePath, content);
    return true;
  } catch (error) {
    console.error("Local write skipped:", error);
    return false;
  }
}

function toRepoPath(absolutePath: string) {
  const apiPath = path.relative(root, absolutePath).split(path.sep).join("/");
  if (!apiPath || apiPath.startsWith("..")) {
    throw new Error(`Ruta inválida para GitHub: ${absolutePath}`);
  }
  return apiPath;
}

/** Un solo commit de GitHub con varios archivos (evita doble deploy). */
async function commitFilesToGitHub(
  files: RepoWriteFile[],
  message: string
): Promise<{ committed: true } | { committed: false; error: string }> {
  const { token, repo, branch } = githubConfig();
  if (!token) {
    return { committed: false, error: "Falta GITHUB_TOKEN en el entorno" };
  }
  if (!files.length) return { committed: true };

  const headers = githubHeaders(token);
  const signal = AbortSignal.timeout(55_000);
  const base = `https://api.github.com/repos/${repo}`;

  try {
    const refRes = await fetch(`${base}/git/ref/heads/${branch}`, {
      headers,
      cache: "no-store",
      signal,
    });
    if (!refRes.ok) {
      return {
        committed: false,
        error: `GitHub ref failed: ${refRes.status} ${await refRes.text()}`,
      };
    }
    const refData = (await refRes.json()) as { object: { sha: string } };
    const latestCommitSha = refData.object.sha;

    const commitRes = await fetch(
      `${base}/git/commits/${latestCommitSha}`,
      { headers, cache: "no-store", signal }
    );
    if (!commitRes.ok) {
      return {
        committed: false,
        error: `GitHub commit read failed: ${commitRes.status} ${await commitRes.text()}`,
      };
    }
    const commitData = (await commitRes.json()) as { tree: { sha: string } };

    const treeItems: {
      path: string;
      mode: "100644";
      type: "blob";
      sha: string;
    }[] = [];

    for (const file of files) {
      const encoded = Buffer.isBuffer(file.content)
        ? file.content.toString("base64")
        : Buffer.from(file.content, "utf8").toString("base64");
      const blobRes = await fetch(`${base}/git/blobs`, {
        method: "POST",
        headers: { ...headers, "Content-Type": "application/json" },
        body: JSON.stringify({ content: encoded, encoding: "base64" }),
        signal,
      });
      if (!blobRes.ok) {
        return {
          committed: false,
          error: `GitHub blob failed: ${blobRes.status} ${await blobRes.text()}`,
        };
      }
      const blob = (await blobRes.json()) as { sha: string };
      treeItems.push({
        path: toRepoPath(file.absolutePath),
        mode: "100644",
        type: "blob",
        sha: blob.sha,
      });
    }

    const treeRes = await fetch(`${base}/git/trees`, {
      method: "POST",
      headers: { ...headers, "Content-Type": "application/json" },
      body: JSON.stringify({
        base_tree: commitData.tree.sha,
        tree: treeItems,
      }),
      signal,
    });
    if (!treeRes.ok) {
      return {
        committed: false,
        error: `GitHub tree failed: ${treeRes.status} ${await treeRes.text()}`,
      };
    }
    const tree = (await treeRes.json()) as { sha: string };

    const newCommitRes = await fetch(`${base}/git/commits`, {
      method: "POST",
      headers: { ...headers, "Content-Type": "application/json" },
      body: JSON.stringify({
        message,
        tree: tree.sha,
        parents: [latestCommitSha],
      }),
      signal,
    });
    if (!newCommitRes.ok) {
      return {
        committed: false,
        error: `GitHub create commit failed: ${newCommitRes.status} ${await newCommitRes.text()}`,
      };
    }
    const newCommit = (await newCommitRes.json()) as { sha: string };

    const updateRes = await fetch(`${base}/git/refs/heads/${branch}`, {
      method: "PATCH",
      headers: { ...headers, "Content-Type": "application/json" },
      body: JSON.stringify({ sha: newCommit.sha }),
      signal,
    });
    if (!updateRes.ok) {
      return {
        committed: false,
        error: `GitHub update ref failed: ${updateRes.status} ${await updateRes.text()}`,
      };
    }

    return { committed: true };
  } catch (error) {
    return { committed: false, error: `GitHub error: ${String(error)}` };
  }
}

function finalizeWrite(
  local: boolean,
  github: { committed: true } | { committed: false; error: string }
): WriteResult {
  if (github.committed) return { committed: true, local };
  if (local) return { committed: false, local: true, error: github.error };
  return {
    committed: false,
    local: false,
    error:
      github.error ||
      "No se pudo guardar. En Vercel hace falta GITHUB_TOKEN con Contents: Write.",
  };
}

export async function writeRepoFiles(
  files: RepoWriteFile[],
  message: string
): Promise<WriteResult> {
  let localOk = true;
  for (const file of files) {
    const ok = await tryLocalWrite(file.absolutePath, file.content);
    if (!ok) localOk = false;
  }
  const github = await commitFilesToGitHub(files, message);
  return finalizeWrite(localOk, github);
}

export async function readPostsFile(): Promise<Post[]> {
  const raw = await fs.readFile(postsPath, "utf8");
  return JSON.parse(raw) as Post[];
}

export async function writePostsFile(
  posts: Post[],
  message: string
): Promise<WriteResult> {
  const content = `${JSON.stringify(posts, null, 2)}\n`;
  return writeRepoFiles([{ absolutePath: postsPath, content }], message);
}

export async function readSettingsFile(): Promise<SiteSettings> {
  const raw = await fs.readFile(settingsPath, "utf8");
  return JSON.parse(raw) as SiteSettings;
}

export async function writeSettingsFile(
  settings: SiteSettings,
  message: string
): Promise<WriteResult> {
  const content = `${JSON.stringify(settings, null, 2)}\n`;
  return writeRepoFiles([{ absolutePath: settingsPath, content }], message);
}

export function slugify(input: string) {
  return input
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "")
    .slice(0, 80);
}

export function extensionForMime(mime: string) {
  return ALLOWED_UPLOAD_TYPES[mime] || null;
}

export function isAllowedUploadMime(mime: string) {
  return mime in ALLOWED_UPLOAD_TYPES;
}

export function postsFilePath() {
  return postsPath;
}

/** Prepara ruta/buffer de imagen sin hacer commit (se agrupa al guardar el post). */
export async function prepareUploadFile(file: {
  buffer: Buffer;
  mime: string;
  originalName: string;
}) {
  const ext = extensionForMime(file.mime);
  if (!ext) throw new Error("Tipo de archivo no permitido");
  if (file.buffer.byteLength > MAX_UPLOAD_BYTES) {
    throw new Error("La imagen supera el límite de 5 MB");
  }

  const now = new Date();
  const year = String(now.getFullYear());
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const base =
    slugify(path.parse(file.originalName).name) || `imagen-${Date.now()}`;
  const dir = path.join(uploadsRoot, year, month);

  let filename = `${base}${ext}`;
  let absolute = path.join(dir, filename);
  let n = 2;
  while (true) {
    try {
      await fs.access(absolute);
      filename = `${base}-${n++}${ext}`;
      absolute = path.join(dir, filename);
    } catch {
      break;
    }
  }

  return {
    absolutePath: absolute,
    publicUrl: `/uploads/${year}/${month}/${filename}`,
    buffer: file.buffer,
  };
}

/** @deprecated Preferir guardar imágenes junto al post (un solo deploy). */
export async function saveUploadedImage(file: {
  buffer: Buffer;
  mime: string;
  originalName: string;
}) {
  const planned = await prepareUploadFile(file);
  const result = await writeRepoFiles(
    [{ absolutePath: planned.absolutePath, content: planned.buffer }],
    `Admin: subir imagen ${planned.publicUrl}`
  );
  if (!result.committed && !result.local) {
    throw new Error(result.error || "No se pudo subir la imagen");
  }
  return { url: planned.publicUrl, ...result };
}
