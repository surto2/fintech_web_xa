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

async function commitToGitHub(
  filePath: string,
  content: string | Buffer,
  message: string
) {
  const token = process.env.GITHUB_TOKEN;
  const repo = process.env.GITHUB_REPO || "surto2/fintech_web_xa";
  if (!token) return { committed: false as const };

  const apiPath = path.relative(root, filePath).split(path.sep).join("/");
  const url = `https://api.github.com/repos/${repo}/contents/${apiPath}`;
  const headers = {
    Authorization: `Bearer ${token}`,
    Accept: "application/vnd.github+json",
    "X-GitHub-Api-Version": "2022-11-28",
  };

  let sha: string | undefined;
  const current = await fetch(url, { headers, cache: "no-store" });
  if (current.ok) {
    const data = (await current.json()) as { sha: string };
    sha = data.sha;
  }

  const encoded = Buffer.isBuffer(content)
    ? content.toString("base64")
    : Buffer.from(content, "utf8").toString("base64");

  const res = await fetch(url, {
    method: "PUT",
    headers: { ...headers, "Content-Type": "application/json" },
    body: JSON.stringify({
      message,
      content: encoded,
      sha,
      branch: process.env.GITHUB_BRANCH || "main",
    }),
  });

  if (!res.ok) {
    const err = await res.text();
    throw new Error(`GitHub commit failed: ${res.status} ${err}`);
  }

  return { committed: true as const };
}

export async function readPostsFile(): Promise<Post[]> {
  const raw = await fs.readFile(postsPath, "utf8");
  return JSON.parse(raw) as Post[];
}

export async function writePostsFile(posts: Post[], message: string) {
  const content = `${JSON.stringify(posts, null, 2)}\n`;
  await fs.writeFile(postsPath, content, "utf8");
  try {
    return await commitToGitHub(postsPath, content, message);
  } catch (error) {
    // Local write succeeded; GitHub is optional
    console.error(error);
    return { committed: false as const, error: String(error) };
  }
}

export async function readSettingsFile(): Promise<SiteSettings> {
  const raw = await fs.readFile(settingsPath, "utf8");
  return JSON.parse(raw) as SiteSettings;
}

export async function writeSettingsFile(settings: SiteSettings, message: string) {
  const content = `${JSON.stringify(settings, null, 2)}\n`;
  await fs.writeFile(settingsPath, content, "utf8");
  try {
    return await commitToGitHub(settingsPath, content, message);
  } catch (error) {
    console.error(error);
    return { committed: false as const, error: String(error) };
  }
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
  await fs.mkdir(dir, { recursive: true });

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

  await fs.writeFile(absolute, file.buffer);

  const publicUrl = `/uploads/${year}/${month}/${filename}`;
  let committed = false;
  let error: string | undefined;
  try {
    const result = await commitToGitHub(
      absolute,
      file.buffer,
      `Admin: subir imagen ${publicUrl}`
    );
    committed = result.committed;
  } catch (err) {
    console.error(err);
    error = String(err);
  }

  return { url: publicUrl, committed, error };
}
