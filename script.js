function toggleMenu() {
  const menu = document.querySelector(".menu-links");
  const icon = document.querySelector(".hamburger-icon");
  menu.classList.toggle("open");
  icon.classList.toggle("open");
}

// Per-card image carousel
document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".project-card").forEach((card, cardIndex) => {
    const slides = card.querySelector(".project-slides");
    const dotsContainer = card.querySelector(".slide-dots");
    const imgs = slides.querySelectorAll("img");
    let current = 0;

    // Build dots
    imgs.forEach((_, i) => {
      const dot = document.createElement("div");
      dot.className = "slide-dot" + (i === 0 ? " active" : "");
      dot.onclick = () => goTo(i);
      dotsContainer.appendChild(dot);
    });

    function goTo(index) {
      current = index;
      slides.style.transform = `translateX(-${100 * current}%)`;
      dotsContainer.querySelectorAll(".slide-dot").forEach((d, i) =>
        d.classList.toggle("active", i === current)
      );
    }

    // Auto-advance
    setInterval(() => goTo((current + 1) % imgs.length), 3000);

    // Swipe support
    let startX = 0;
    slides.addEventListener("touchstart", e => startX = e.touches[0].clientX);
    slides.addEventListener("touchend", e => {
      const diff = startX - e.changedTouches[0].clientX;
      if (Math.abs(diff) > 40) goTo(diff > 0
        ? Math.min(current + 1, imgs.length - 1)
        : Math.max(current - 1, 0));
    });
  });
});

// Outer track scroll arrows
function scrollCarousel(dir) {
  const track = document.getElementById("projectsTrack");
  track.scrollBy({ left: dir * 320, behavior: "smooth" });
}