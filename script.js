// Function to check if an element is in the viewport
function isInViewport(element) {
  var rect = element.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  );
}

// Function to handle the scroll event
function handleScroll() {
  var sections = document.querySelectorAll('.scroll-section');
  var introSection = document.getElementById('intro-section');

  sections.forEach(function(section) {
    if (isInViewport(section)) {
      section.classList.add('section-reveal');
    } else {
      section.classList.remove('section-reveal');
    }
  });

  var scrollPosition = window.pageYOffset;
  var introSectionHeight = introSection.offsetHeight;
  var introSectionOpacity = 1 - (scrollPosition / introSectionHeight);

  introSection.style.opacity = introSectionOpacity.toFixed(2);
}

// Add event listener for scroll event
window.addEventListener('scroll', handleScroll);

// Smooth scrolling function
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

// Smooth scroll when clicking on navigation links
const navLinks = document.querySelectorAll('nav ul li a');

navLinks.forEach((link) => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    const target = link.getAttribute('href');
    smoothScroll(target, 1000); // Adjust duration (in milliseconds) as desired
  });
});
