import { promises as fs } from "fs";
import path from "path";
import type { Post } from "@/lib/posts";
import type { SiteSettings } from "@/lib/site";

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

async function tryLocalWrite(filePath: string, content: string | Buffer) {
  try {
    await fs.mkdir(path.dirname(filePath), { recursive: true });
    await fs.writeFile(filePath, content);
    return true;
  } catch (error) {
    // En Vercel el filesystem es de solo lectura: es esperado.
    console.error("Local write skipped:", error);
    return false;
  }
}

async function commitToGitHub(
  filePath: string,
  content: string | Buffer,
  message: string
): Promise<{ committed: true } | { committed: false; error: string }> {
  const token = process.env.GITHUB_TOKEN;
  const repo = process.env.GITHUB_REPO || "surto2/fintech_web_xa";
  if (!token) {
    return {
      committed: false,
      error: "Falta GITHUB_TOKEN en el entorno",
    };
  }

  const apiPath = path.relative(root, filePath).split(path.sep).join("/");
  if (!apiPath || apiPath.startsWith("..")) {
    return { committed: false, error: `Ruta inválida para GitHub: ${filePath}` };
  }

  const url = `https://api.github.com/repos/${repo}/contents/${apiPath}`;
  const headers = {
    Authorization: `Bearer ${token}`,
    Accept: "application/vnd.github+json",
    "X-GitHub-Api-Version": "2022-11-28",
  };

  const signal = AbortSignal.timeout(25_000);

  let sha: string | undefined;
  try {
    const current = await fetch(url, { headers, cache: "no-store", signal });
    if (current.ok) {
      const data = (await current.json()) as { sha: string };
      sha = data.sha;
    }
  } catch (error) {
    return {
      committed: false,
      error: `GitHub GET timeout/error: ${String(error)}`,
    };
  }

  const encoded = Buffer.isBuffer(content)
    ? content.toString("base64")
    : Buffer.from(content, "utf8").toString("base64");

  try {
    const res = await fetch(url, {
      method: "PUT",
      headers: { ...headers, "Content-Type": "application/json" },
      body: JSON.stringify({
        message,
        content: encoded,
        sha,
        branch: process.env.GITHUB_BRANCH || "main",
      }),
      signal,
    });

    if (!res.ok) {
      const err = await res.text();
      return {
        committed: false,
        error: `GitHub commit failed: ${res.status} ${err}`,
      };
    }
  } catch (error) {
    return {
      committed: false,
      error: `GitHub PUT timeout/error: ${String(error)}`,
    };
  }

  return { committed: true };
}

function finalizeWrite(
  local: boolean,
  github: { committed: true } | { committed: false; error: string }
): WriteResult {
  if (github.committed) {
    return { committed: true, local };
  }
  if (local) {
    return { committed: false, local: true, error: github.error };
  }
  return {
    committed: false,
    local: false,
    error:
      github.error ||
      "No se pudo guardar. En Vercel el disco es de solo lectura: configura GITHUB_TOKEN con permiso Contents: Write.",
  };
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
  const local = await tryLocalWrite(postsPath, content);
  const github = await commitToGitHub(postsPath, content, message);
  return finalizeWrite(local, github);
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
  const local = await tryLocalWrite(settingsPath, content);
  const github = await commitToGitHub(settingsPath, content, message);
  return finalizeWrite(local, github);
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

export function plainTextFromHtml(html: string) {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, "")
    .replace(/<style[\s\S]*?<\/style>/gi, "")
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

export function extensionForMime(mime: string) {
  return ALLOWED_UPLOAD_TYPES[mime] || null;
}

export function isAllowedUploadMime(mime: string) {
  return mime in ALLOWED_UPLOAD_TYPES;
}

/** Guarda una imagen en public/uploads/YYYY/MM y, si hay token, la sube a GitHub. */
export async function saveUploadedImage(file: {
  buffer: Buffer;
  mime: string;
  originalName: string;
}) {
  const ext = extensionForMime(file.mime);
  if (!ext) {
    throw new Error("Tipo de archivo no permitido");
  }
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
  // Evitar colisiones si el disco es escribible
  while (true) {
    try {
      await fs.access(absolute);
      filename = `${base}-${n++}${ext}`;
      absolute = path.join(dir, filename);
    } catch {
      break;
    }
  }

  const local = await tryLocalWrite(absolute, file.buffer);
  const publicUrl = `/uploads/${year}/${month}/${filename}`;
  const github = await commitToGitHub(
    absolute,
    file.buffer,
    `Admin: subir imagen ${publicUrl}`
  );
  const result = finalizeWrite(local, github);
  if (!result.committed && !result.local) {
    throw new Error(result.error || "No se pudo subir la imagen");
  }
  return { url: publicUrl, ...result };
}
