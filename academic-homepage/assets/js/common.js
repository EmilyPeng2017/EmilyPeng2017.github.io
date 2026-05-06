document.addEventListener("DOMContentLoaded", () => {
  const page = document.body.dataset.page;
  document.querySelectorAll(".nav-links a").forEach((link) => {
    if (link.dataset.page === page) {
      link.classList.add("active");
    }
  });
});
