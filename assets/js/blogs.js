document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("blog-list");
  const counter = document.getElementById("blog-count");
  const posts = Array.isArray(window.BLOG_POSTS) ? window.BLOG_POSTS : [];

  if (counter) {
    counter.textContent = `${posts.length} posts`;
  }

  if (!container) {
    return;
  }

  if (!posts.length) {
    container.innerHTML = "<p>No posts found.</p>";
    return;
  }

  container.innerHTML = posts.map((post) => {
    const category = post.categories ? `<span class="meta-chip">${escapeHtml(post.categories)}</span>` : "";
    return `
      <article class="publication">
        <div class="pub-cover">${escapeHtml(post.date)}</div>
        <div>
          <h3><a href="${escapeAttr(post.url)}" target="_blank" rel="noreferrer">${escapeHtml(post.title)}</a></h3>
          <div class="archive-meta">
            ${category}
          </div>
        </div>
      </article>
    `;
  }).join("");
});

function escapeHtml(value) {
  return String(value)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/\"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

function escapeAttr(value) {
  return escapeHtml(value);
}
