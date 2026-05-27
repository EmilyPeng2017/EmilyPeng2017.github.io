document.addEventListener("DOMContentLoaded", () => {
  const container = document.getElementById("blog-list");
  const counter = document.getElementById("blog-count");
  const timeline = document.getElementById("blog-timeline");
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
    const monthId = getMonthId(post.date);
    return `
      <article class="publication" id="post-${escapeAttr(slugify(post.date + "-" + post.title))}" data-month="${escapeAttr(monthId)}">
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

  if (timeline) {
    renderTimeline(timeline, posts);
    trackActiveMonth(timeline);
  }
});

const monthFormatter = new Intl.DateTimeFormat("en", { month: "short" });

function renderTimeline(container, posts) {
  const grouped = posts.reduce((result, post) => {
    const date = parsePostDate(post.date);
    if (!date) {
      return result;
    }

    const year = String(date.getUTCFullYear());
    const month = String(date.getUTCMonth() + 1).padStart(2, "0");
    const monthKey = `${year}-${month}`;

    if (!result[year]) {
      result[year] = { count: 0, months: {} };
    }

    if (!result[year].months[monthKey]) {
      result[year].months[monthKey] = {
        label: monthFormatter.format(date),
        count: 0,
        target: `month-${monthKey}`
      };
    }

    result[year].count += 1;
    result[year].months[monthKey].count += 1;
    return result;
  }, {});

  Object.entries(grouped).forEach(([, yearGroup]) => {
    Object.entries(yearGroup.months).forEach(([monthKey]) => {
      const firstPost = document.querySelector(`[data-month="${monthKey}"]`);
      if (firstPost) {
        firstPost.id = `month-${monthKey}`;
      }
    });
  });

  container.innerHTML = Object.entries(grouped)
    .sort(([a], [b]) => Number(b) - Number(a))
    .map(([year, yearGroup]) => {
      const firstMonth = Object.keys(yearGroup.months).sort().reverse()[0];
      const yearTarget = yearGroup.months[firstMonth].target;
      const months = Object.entries(yearGroup.months)
        .sort(([a], [b]) => b.localeCompare(a))
        .map(([monthKey, monthGroup]) => `
          <a class="timeline-month" href="#${escapeAttr(monthGroup.target)}" data-month-link="${escapeAttr(monthKey)}">
            <span>${escapeHtml(monthGroup.label)}</span>
            <span class="timeline-count">${monthGroup.count}</span>
          </a>
        `).join("");

      return `
        <div class="timeline-year">
          <a class="timeline-year-link" href="#${escapeAttr(yearTarget)}">
            <span>${escapeHtml(year)}</span>
            <span class="timeline-count">${yearGroup.count}</span>
          </a>
          <div class="timeline-months">${months}</div>
        </div>
      `;
    })
    .join("");
}

function trackActiveMonth(timeline) {
  const posts = Array.from(document.querySelectorAll("[data-month]"));
  const links = Array.from(timeline.querySelectorAll("[data-month-link]"));

  if (!posts.length || !links.length || !("IntersectionObserver" in window)) {
    return;
  }

  const setActive = (monthKey) => {
    links.forEach((link) => {
      link.classList.toggle("is-active", link.dataset.monthLink === monthKey);
    });
  };

  const observer = new IntersectionObserver((entries) => {
    const visible = entries
      .filter((entry) => entry.isIntersecting)
      .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];

    if (visible) {
      setActive(visible.target.dataset.month);
    }
  }, {
    rootMargin: "-20% 0px -70% 0px",
    threshold: 0
  });

  posts.forEach((post) => observer.observe(post));
  setActive(posts[0].dataset.month);
}

function getMonthId(dateValue) {
  const date = parsePostDate(dateValue);
  if (!date) {
    return "unknown";
  }

  return `${date.getUTCFullYear()}-${String(date.getUTCMonth() + 1).padStart(2, "0")}`;
}

function parsePostDate(dateValue) {
  const match = String(dateValue).match(/^(\d{4})-(\d{2})-(\d{2})$/);
  if (!match) {
    return null;
  }

  return new Date(Date.UTC(Number(match[1]), Number(match[2]) - 1, Number(match[3])));
}

function slugify(value) {
  return String(value)
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "") || "post";
}

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
