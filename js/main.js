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

  const lightbox = document.getElementById("lightbox");
  const lightboxImage = document.getElementById("lightbox-image");
  const lightboxCaption = document.getElementById("lightbox-caption");
  const galleryTiles = Array.from(document.querySelectorAll(".gallery-tile"));
  let activePhoto = 0;

  function showPhoto(index) {
    activePhoto = (index + galleryTiles.length) % galleryTiles.length;
    const tile = galleryTiles[activePhoto];
    const image = tile.querySelector("img");

    lightboxImage.src = image.currentSrc || image.src;
    lightboxImage.alt = image.alt;
    lightboxCaption.textContent = tile.querySelector(".tile-caption").textContent.trim();
  }

  if (lightbox && lightboxImage && lightboxCaption && galleryTiles.length) {
    galleryTiles.forEach((tile, index) => {
      tile.addEventListener("click", () => {
        showPhoto(index);
        lightbox.showModal();
      });
    });

    lightbox.querySelector(".lightbox-close").addEventListener("click", () => lightbox.close());
    lightbox.querySelector(".lightbox-prev").addEventListener("click", () => showPhoto(activePhoto - 1));
    lightbox.querySelector(".lightbox-next").addEventListener("click", () => showPhoto(activePhoto + 1));
    lightbox.addEventListener("click", (event) => {
      if (event.target === lightbox) lightbox.close();
    });
    lightbox.addEventListener("keydown", (event) => {
      if (event.key === "ArrowLeft" || event.key === "ArrowRight") {
        event.preventDefault();
        showPhoto(activePhoto + (event.key === "ArrowRight" ? 1 : -1));
      }
    });
  }

  const year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();
})();