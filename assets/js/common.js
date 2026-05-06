document.addEventListener("DOMContentLoaded", () => {
  const page = document.body.dataset.page;
  document.querySelectorAll(".nav-links a").forEach((link) => {
    if (link.dataset.page === page) {
      link.classList.add("active");
    }
  });

  const MAX_NEWS = 20;
  document.querySelectorAll(".news-list").forEach((list) => {
    const items = Array.from(list.querySelectorAll(".news-item"));
    if (items.length > MAX_NEWS) {
      items.forEach((item, index) => {
        if (index >= MAX_NEWS) {
          item.classList.add("news-hidden");
        }
      });
      const button = document.createElement("button");
      button.className = "show-more-btn";
      button.textContent = "Show more";
      list.insertAdjacentElement("afterend", button);
      button.addEventListener("click", () => {
        items.forEach((item) => item.classList.remove("news-hidden"));
        button.remove();
      });
    }
  });
});
