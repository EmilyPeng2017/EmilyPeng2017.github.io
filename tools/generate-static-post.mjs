import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const input = process.argv[2];

if (!input) {
  console.error("Usage: node tools/generate-static-post.mjs source-archive/_posts/post.md");
  process.exit(1);
}

const sourcePath = path.resolve(root, input);
const raw = fs.readFileSync(sourcePath, "utf8");
const { meta, body } = parseFrontMatter(raw);
const date = String(meta.date || new Date().toISOString()).slice(0, 10);
const title = fixEncoding(String(meta.title || path.basename(input, ".md")));
const slug = path.basename(input, ".md").replace(/[^\w\u4e00-\u9fff-]+/g, "-");
const [year, month, day] = date.split("-");
const outDir = path.join(root, year, month, day, slug);
const outFile = path.join(outDir, "index.html");
const categories = normalizeList(meta.categories).join(" / ");
const tags = normalizeList(meta.tags);
const html = renderMarkdown(body);

fs.mkdirSync(outDir, { recursive: true });
fs.writeFileSync(outFile, renderPage({ title, date, categories, tags, html, slug }), "utf8");
updateBlogData({ title, date, categories, url: `${year}/${month}/${day}/${slug}/` });

console.log(`Generated ${path.relative(root, outFile)}`);

function parseFrontMatter(content) {
  if (!content.startsWith("---")) {
    return { meta: {}, body: content };
  }

  const end = content.indexOf("\n---", 3);
  if (end === -1) {
    return { meta: {}, body: content };
  }

  const yaml = content.slice(3, end).trim().split(/\r?\n/);
  const meta = {};
  let currentKey = null;
  for (const line of yaml) {
    const keyMatch = line.match(/^([A-Za-z0-9_-]+):\s*(.*)$/);
    if (keyMatch) {
      currentKey = keyMatch[1];
      const value = keyMatch[2].trim();
      meta[currentKey] = value || [];
      continue;
    }
    const listMatch = line.match(/^\s*-\s+(.*)$/);
    if (listMatch && currentKey) {
      if (!Array.isArray(meta[currentKey])) meta[currentKey] = [];
      meta[currentKey].push(listMatch[1].trim());
    }
  }

  return { meta, body: content.slice(end + 4).trim() };
}

function normalizeList(value) {
  if (!value) return [];
  if (Array.isArray(value)) return value.map((item) => fixEncoding(String(item)));
  return [fixEncoding(String(value))];
}

function renderMarkdown(markdown) {
  const lines = markdown
    .replace(/<!--\s*toc\s*-->/gi, "")
    .replace(/<!--\s*more\s*-->/gi, "")
    .split(/\r?\n/);

  const out = [];
  let paragraph = [];
  let listOpen = false;
  let orderedListOpen = false;
  let quoteOpen = false;
  let table = [];

  const flushParagraph = () => {
    if (paragraph.length) {
      out.push(`<p>${inline(paragraph.join(" "))}</p>`);
      paragraph = [];
    }
  };
  const flushList = () => {
    if (listOpen) {
      out.push("</ul>");
      listOpen = false;
    }
    if (orderedListOpen) {
      out.push("</ol>");
      orderedListOpen = false;
    }
  };
  const flushQuote = () => {
    if (quoteOpen) {
      out.push("</blockquote>");
      quoteOpen = false;
    }
  };
  const flushTable = () => {
    if (!table.length) return;
    const rows = table.filter((row) => !/^\|\s*-+/.test(row));
    const cells = rows.map((row) => row.split("|").slice(1, -1).map((cell) => inline(cell.trim())));
    const [head, ...bodyRows] = cells;
    out.push("<table>");
    out.push(`<thead><tr>${head.map((cell) => `<th>${cell}</th>`).join("")}</tr></thead>`);
    out.push("<tbody>");
    for (const row of bodyRows) out.push(`<tr>${row.map((cell) => `<td>${cell}</td>`).join("")}</tr>`);
    out.push("</tbody></table>");
    table = [];
  };

  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed) {
      flushParagraph(); flushList(); flushQuote(); flushTable();
      continue;
    }
    if (trimmed.startsWith("|") && trimmed.endsWith("|")) {
      flushParagraph(); flushList(); flushQuote();
      table.push(trimmed);
      continue;
    }
    flushTable();
    if (/^<.+>$/.test(trimmed)) {
      flushParagraph(); flushList(); flushQuote();
      out.push(trimmed.replaceAll('src="/', 'src="../../../../'));
      continue;
    }
    const heading = trimmed.match(/^(#{1,4})\s+(.+)$/);
    if (heading) {
      flushParagraph(); flushList(); flushQuote();
      const level = heading[1].length;
      const text = inline(heading[2]);
      const id = slugify(stripHtml(heading[2]));
      out.push(`<h${level} id="${id}">${text}</h${level}>`);
      continue;
    }
    if (trimmed.startsWith(">")) {
      flushParagraph(); flushList();
      if (!quoteOpen) {
        out.push("<blockquote>");
        quoteOpen = true;
      }
      out.push(`<p>${inline(trimmed.replace(/^>\s?/, ""))}</p>`);
      continue;
    }
    const list = trimmed.match(/^[-*]\s+(.+)$/);
    if (list) {
      flushParagraph(); flushQuote();
      if (orderedListOpen) {
        out.push("</ol>");
        orderedListOpen = false;
      }
      if (!listOpen) {
        out.push("<ul>");
        listOpen = true;
      }
      out.push(`<li>${inline(list[1])}</li>`);
      continue;
    }
    const orderedList = trimmed.match(/^\d+\.\s+(.+)$/);
    if (orderedList) {
      flushParagraph(); flushQuote();
      if (listOpen) {
        out.push("</ul>");
        listOpen = false;
      }
      if (!orderedListOpen) {
        out.push("<ol>");
        orderedListOpen = true;
      }
      out.push(`<li>${inline(orderedList[1])}</li>`);
      continue;
    }
    paragraph.push(trimmed);
  }

  flushParagraph(); flushList(); flushQuote(); flushTable();
  return out.join("\n");
}

function inline(text) {
  return text
    .replace(/!\[([^\]]*)\]\(([^)]+)\)/g, '<img src="$2" alt="$1">')
    .replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>")
    .replace(/`([^`]+)`/g, "<code>$1</code>")
    .replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>');
}

function stripHtml(text) {
  return text.replace(/<[^>]+>/g, "");
}

function slugify(text) {
  return text.toLowerCase().replace(/[^\w\u4e00-\u9fff]+/g, "-").replace(/^-|-$/g, "");
}

function fixEncoding(text) {
  return text
    .replaceAll("â€”", "-")
    .replaceAll("â€“", "-")
    .replaceAll("â€\"", "-")
    .replaceAll("â€™", "'")
    .replaceAll("â€œ", '"')
    .replaceAll("â€\u009d", '"');
}

function renderPage({ title, date, categories, tags, html, slug }) {
  const tagHtml = tags.map((tag) => `<span>${tag}</span>`).join("");
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <title>${title} - Sai (Emily) Peng</title>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="https://fonts.googleapis.com/css2?family=Lato:wght@300;400;700;900&family=Fira+Sans:wght@400;500;700;800&family=Source+Code+Pro:wght@400;600;800&display=swap" rel="stylesheet">
  <link rel="stylesheet" href="../../../../css/blog-post.css">
</head>
<body>
  <header class="topbar">
    <div class="nav-inner">
      <a class="brand" href="../../../../index.html">Sai (Emily) Peng</a>
      <nav class="nav-links">
        <a href="../../../../index.html">Home</a>
        <a href="../../../../publications.html">Publications</a>
        <a href="../../../../awards.html">Awards</a>
        <a href="../../../../service.html">Service</a>
        <a href="../../../../blogs.html" class="active">Blogs</a>
      </nav>
    </div>
  </header>

  <main class="post-shell">
    <article class="post-card">
      <a class="back-link" href="../../../../blogs.html">Back to blogs</a>
      <p class="kicker">${categories || "blog"}</p>
      <h1>${title}</h1>
      <div class="post-meta">
        <time datetime="${date}">${date}</time>
        ${tags.length ? `<div class="tags">${tagHtml}</div>` : ""}
      </div>
      <div class="post-content">
${html}
      </div>
    </article>
  </main>

  <footer class="site-footer">
    <p>&copy; 2026 Sai (Emily) Peng</p>
  </footer>
</body>
</html>
`;
}

function updateBlogData(post) {
  const dataPath = path.join(root, "assets", "js", "blogs-data.js");
  const existing = fs.readFileSync(dataPath, "utf8");
  const match = existing.match(/window\.BLOG_POSTS\s*=\s*(\[[\s\S]*\]);?\s*$/);
  if (!match) throw new Error("Could not parse assets/js/blogs-data.js");
  const posts = JSON.parse(match[1]);
  const withoutDuplicate = posts.filter((item) => item.url !== post.url);
  withoutDuplicate.unshift(post);
  fs.writeFileSync(dataPath, `window.BLOG_POSTS = ${JSON.stringify(withoutDuplicate, null, 2)};\n`, "utf8");
}
