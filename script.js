// Get all the required elements
const sections = document.querySelectorAll('.scroll-section');
const introSection = document.getElementById('intro-section');
const navLinks = document.querySelectorAll('nav ul li a');

/**
 * Check if an element is in the viewport.
 * @param {HTMLElement} element - The element to check.
 * @returns {boolean} - True if the element is in the viewport, false otherwise.
 */
function isInViewport(element) {
  const rect = element.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
}

/**
 * Show or hide the section based on its visibility in the viewport.
 */
function toggleSectionVisibility() {
  sections.forEach((section) => {
    if (isInViewport(section)) {
      section.classList.add('section-reveal');
    } else {
      section.classList.remove('section-reveal');
    }
  });
}

/**
 * Modify the opacity of the introduction section based on the scroll position.
 */
function adjustIntroSectionOpacity() {
  const scrollPosition = window.pageYOffset;
  const introSectionHeight = introSection.offsetHeight;
  const introSectionOpacity = 1 - (scrollPosition / introSectionHeight);
  introSection.style.opacity = introSectionOpacity.toFixed(2);
}

/**
 * The scroll event handler.
 */
function handleScroll() {
  toggleSectionVisibility();
  adjustIntroSectionOpacity();
}

/**
 * Smoothly scroll to the given target.
 * @param {string} target - The selector of the target to scroll to.
 * @param {number} duration - The duration of the scrolling animation in milliseconds.
 */
function smoothScroll(target, duration) {
  const targetElement = document.querySelector(target);
  const targetPosition = targetElement.offsetTop;
  const startPosition = window.pageYOffset;
  const distance = targetPosition - startPosition;
  let startTime = null;

  function animation(currentTime) {
    if (startTime === null) startTime = currentTime;
    const timeElapsed = currentTime - startTime;
    const run = ease(timeElapsed, startPosition, distance, duration);
    window.scrollTo(0, run);
    if (timeElapsed < duration) requestAnimationFrame(animation);
  }

  // Easing function
  function ease(t, b, c, d) {
    t /= d / 2;
    if (t < 1) return (c / 2) * t * t + b;
    t--;
    return (-c / 2) * (t * (t - 2) - 1) + b;
  }

  requestAnimationFrame(animation);
}

/**
 * Attach click events to navigation links for smooth scrolling.
 */
function attachSmoothScrollToNavLinks() {
  navLinks.forEach((link) => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const target = link.getAttribute('href');
      smoothScroll(target, 1000);
    });
  });
}

// Add event listener for scroll event
window.addEventListener('scroll', handleScroll);

// Attach smooth scroll to navigation links
attachSmoothScrollToNavLinks();
