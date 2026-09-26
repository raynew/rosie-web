(function () {
  "use strict";

  const cfg = window.SITE_CONFIG || {};
  const linkUrls = {
    profile: cfg.profileUrl,
    instagram: cfg.instagramUrl,
    moodboard: cfg.moodboardUrl,
  };

  document.querySelectorAll("[data-link]").forEach((link) => {
    const url = linkUrls[link.dataset.link];
    if (url) link.href = url;
  });

  const year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();
})();