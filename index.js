let currentImageIndex = 0;
let images = [];

document.addEventListener("DOMContentLoaded", () => {
  images = Array.from(document.querySelectorAll(".gallery-preview img, .gallery-container img"));
  images.forEach((img, index) => {
    img.addEventListener("click", () => openLightbox(index));
  });
});

function openLightbox(index) {
  currentImageIndex = index;
  document.getElementById("lightboxImage").src = images[index].src;
  document.getElementById("lightboxOverlay").style.display = "flex";
}

function closeLightbox() {
  document.getElementById("lightboxOverlay").style.display = "none";
}

function showPrevImage() {
  currentImageIndex = (currentImageIndex - 1 + images.length) % images.length;
  document.getElementById("lightboxImage").src = images[currentImageIndex].src;
}

function showNextImage() {
  currentImageIndex = (currentImageIndex + 1) % images.length;
  document.getElementById("lightboxImage").src = images[currentImageIndex].src;
}
// Theme Toggle Script
const themeToggleButton = document.getElementById('theme-toggle-button');
const currentTheme = localStorage.getItem('theme');

// Apply saved theme on load
if (currentTheme === 'light') {
    document.body.classList.add('light-mode');
    if (themeToggleButton) themeToggleButton.textContent = '🌙 Dark Mode';
} else {
    // Default to dark mode if no theme is set or if it's explicitly dark
    document.body.classList.remove('light-mode');
    if (themeToggleButton) themeToggleButton.textContent = '☀️ Light Mode';
}

if (themeToggleButton) {
    themeToggleButton.addEventListener('click', () => {
        document.body.classList.toggle('light-mode');
        let theme = 'dark';
        if (document.body.classList.contains('light-mode')) {
            theme = 'light';
            themeToggleButton.textContent = '🌙 Dark Mode';
        } else {
            themeToggleButton.textContent = '☀️ Light Mode';
        }
        localStorage.setItem('theme', theme);
    });
}

// Ensure this script runs after the DOM is fully loaded,
// especially if the button isn't found immediately.
document.addEventListener('DOMContentLoaded', () => {
    const themeBtn = document.getElementById('theme-toggle-button'); // Re-check for button
    if (themeBtn) {
        // Re-apply text content based on current theme in case it wasn't set above
        if (document.body.classList.contains('light-mode')) {
            themeBtn.textContent = '🌙 Dark Mode';
        } else {
            themeBtn.textContent = '☀️ Light Mode';
        }

        // Re-attach event listener if it wasn't attached because button was not found initially
        if (!themeBtn.hasAttribute('data-listener-attached')) {
             themeBtn.addEventListener('click', () => {
                document.body.classList.toggle('light-mode');
                let theme = 'dark';
                if (document.body.classList.contains('light-mode')) {
                    theme = 'light';
                    themeBtn.textContent = '🌙 Dark Mode';
                } else {
                    themeBtn.textContent = '☀️ Light Mode';
                }
                localStorage.setItem('theme', theme);
            });
            themeBtn.setAttribute('data-listener-attached', 'true');
        }
    } else {
        console.warn('Theme toggle button not found on this page.');
    }
});