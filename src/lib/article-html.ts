/** Normaliza el HTML de un artículo para que se vea como las noticias migradas. */
export function normalizeArticleHtml(input: string): string {
  let html = (input || "").trim();
  if (!html) return "<p></p>";

  html = html
    .replace(/<script[\s\S]*?<\/script>/gi, "")
    .replace(/\bon\w+="[^"]*"/gi, "")
    .replace(/hashtag#/gi, "#");

  // Pegado plano sin etiquetas de bloque
  if (!/<(p|h[1-6]|ul|ol|li|figure|blockquote|div|img)[\s>/]/i.test(html)) {
    return plainTextToParagraphs(html);
  }

  // Un solo <p>…</p> con saltos de línea internos (caso típico del admin)
  const singleP = html.match(/^<p\b[^>]*>([\s\S]*)<\/p>$/i);
  if (
    singleP &&
    /\n/.test(singleP[1]) &&
    !/<(p|h[1-6]|ul|ol|figure|div)\b/i.test(singleP[1])
  ) {
    return plainTextToParagraphs(decodeBasicEntities(singleP[1]));
  }

  // contenteditable a veces genera <div> en lugar de <p>
  html = html
    .replace(/<div(\s[^>]*)?>/gi, "<p>")
    .replace(/<\/div>/gi, "</p>")
    .replace(/<p>\s*<br\s*\/?>\s*<\/p>/gi, "")
    .replace(/(<p>\s*<\/p>)+/gi, "");

  html = linkifyHtml(html);
  return html.trim() || "<p></p>";
}

function plainTextToParagraphs(text: string): string {
  const cleaned = text.replace(/\r\n/g, "\n").trim();
  if (!cleaned) return "<p></p>";

  const blocks = cleaned.split(/\n\s*\n+/);
  const parts = blocks.map((block) => {
    const lines = block
      .split("\n")
      .map((l) => l.trim())
      .filter(Boolean);
    if (!lines.length) return "";
    const inner = lines.map(escapeHtml).map(linkifyPlain).join("<br>");
    return `<p>${inner}</p>`;
  });

  return parts.filter(Boolean).join("\n") || "<p></p>";
}

function escapeHtml(s: string) {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

function decodeBasicEntities(s: string) {
  return s
    .replace(/&nbsp;/gi, " ")
    .replace(/&amp;/g, "&")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">")
    .replace(/&quot;/g, '"');
}

function linkifyPlain(s: string) {
  return s.replace(
    /(https?:\/\/[^\s<]+)/g,
    '<a href="$1" target="_blank" rel="noopener noreferrer">$1</a>'
  );
}

function linkifyHtml(html: string) {
  // Solo URLs sueltas fuera de atributos/etiquetas
  return html.replace(
    /(^|[^"'>=])(https?:\/\/[^\s<]+)/g,
    (_m, before: string, url: string) =>
      `${before}<a href="${url}" target="_blank" rel="noopener noreferrer">${url}</a>`
  );
}

/** HTML → texto plano para extracto / búsqueda. */
export function plainTextFromHtml(html: string) {
  return html
    .replace(/<script[\s\S]*?<\/script>/gi, "")
    .replace(/<style[\s\S]*?<\/style>/gi, "")
    .replace(/<br\s*\/?>/gi, "\n")
    .replace(/<\/p>/gi, "\n")
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}
