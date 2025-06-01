function toggleMenu() {
      const menu = document.getElementById("navMenu");
      menu.classList.toggle("show");
    }

    document.querySelectorAll("#navMenu a").forEach(link => {
      link.addEventListener("click", () => {
        document.getElementById("navMenu").classList.remove("show");
      });
    });

    let currentIndex = 0;
let galleryItems = [];

document.addEventListener("DOMContentLoaded", () => {
  // Grab images and videos separately then combine
  const imgs = Array.from(document.querySelectorAll(".gallery-container img"));
  const vids = Array.from(document.querySelectorAll(".gallery-container video"));
  galleryItems = imgs.concat(vids);

  galleryItems.forEach((item, i) => {
    item.addEventListener("click", () => openLightbox(i));
  });
});

function openLightbox(i) {
  currentIndex = i;
  const imgElem = document.getElementById("lightboxImage");
  const vidElem = document.getElementById("lightboxVideo");
  const infoElem = document.getElementById("lightboxInfo");
  const item = galleryItems[i];

  if (item.tagName.toLowerCase() === "img") {
    vidElem.style.display = "none";
    vidElem.pause();
    vidElem.src = "";
    
    imgElem.style.display = "block";
    imgElem.src = item.src;
    imgElem.alt = item.alt || "";

    const title = item.dataset.title || "Untitled";
    const date = item.dataset.date || "Unknown Date";
    const location = item.dataset.location || "Unknown Location";
    const photographer = item.dataset.photographer || item.dataset.name || "Unknown Photographer"; // Added fallback for existing data-name
    const camera = item.dataset.camera || "Unknown Camera";
    infoElem.innerHTML = `<h3>${title}</h3>
                          <p><strong>Date:</strong> ${date}</p>
                          <p><strong>Location:</strong> ${location}</p>
                          <p><strong>Photographer:</strong> ${photographer}</p>
                          <p><strong>Camera:</strong> ${camera}</p>`;

  } else if (item.tagName.toLowerCase() === "video") {
    imgElem.style.display = "none";
    imgElem.src = "";

    vidElem.style.display = "block";
    const source = item.querySelector("source");
    vidElem.src = source ? source.src : item.src;
    vidElem.load();
    vidElem.play();

    infoElem.innerHTML = `<h3>Video Preview</h3><p>Enjoy the video!</p>`;
  }

  document.getElementById("lightboxOverlay").style.display = "flex";
}

function closeLightbox() {
  const vidElem = document.getElementById("lightboxVideo");
  vidElem.pause();
  vidElem.src = "";

  document.getElementById("lightboxOverlay").style.display = "none";
}

function showPrev() {
  currentIndex = (currentIndex - 1 + galleryItems.length) % galleryItems.length;
  openLightbox(currentIndex);
}

function showNext() {
  currentIndex = (currentIndex + 1) % galleryItems.length;
  openLightbox(currentIndex);
}


    function filterGallery(category) {
      const items = document.querySelectorAll(".gallery-item");
      items.forEach(item => {
        if (category === "all" || item.classList.contains(category)) {
          item.style.display = "block";
        } else {
          item.style.display = "none";
        }
      });
    }

    function resizeMasonryItem(item) {
  const grid = document.querySelector('.gallery-container');
  const rowHeight = parseInt(window.getComputedStyle(grid).getPropertyValue('grid-auto-rows'));
  const rowGap = parseInt(window.getComputedStyle(grid).getPropertyValue('gap'));
  const content = item.querySelector('img, video');

  if (!content) return;

  // Calculate how many rows this item should span
  const itemHeight = content.getBoundingClientRect().height;
  const rowSpan = Math.ceil((itemHeight + rowGap) / (rowHeight + rowGap));
  item.style.gridRowEnd = `span ${rowSpan}`;
}

function resizeAllMasonryItems() {
  const items = document.querySelectorAll('.gallery-item');
  items.forEach(resizeMasonryItem);
}

// Run after images load
window.addEventListener('load', resizeAllMasonryItems);
window.addEventListener('resize', resizeAllMasonryItems);

// Also run resize on each image/video once they load (for lazy loading)
document.querySelectorAll('.gallery-item img, .gallery-item video').forEach(media => {
  media.addEventListener('load', () => {
    resizeMasonryItem(media.parentElement);
  });
});
