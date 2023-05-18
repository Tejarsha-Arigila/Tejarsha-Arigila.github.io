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
  var sections = document.querySelectorAll('.animate-section');

  sections.forEach(function(section, index) {
    if (isInViewport(section) && !section.classList.contains('section-reveal')) {
      section.classList.add('section-reveal');
      section.style.transitionDelay = (index * 0.2) + 's'; // Delay each section's transition
    }
  });
}

// Add event listener for scroll event
window.addEventListener('scroll', handleScroll);

// Initial check on page load
window.addEventListener('DOMContentLoaded', function() {
  handleScroll();
});