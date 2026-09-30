// Navigation is fully usable without JavaScript. This adds the current-section indicator.
const year = document.querySelector('#year');
if (year) year.textContent = String(new Date().getFullYear());

const links = Array.from(document.querySelectorAll('nav a[href^="#"]'));
const sections = links.map(link => document.querySelector(link.getAttribute('href'))).filter(Boolean);
let scheduled = false;

function updateNavigation() {
  let active;
  for (const section of sections) {
    if (section.getBoundingClientRect().top <= window.innerHeight * 0.3) active = section;
  }
  if (window.scrollY > 0 && window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 3) {
    active = sections[sections.length - 1];
  }
  for (const link of links) {
    if (active && link.getAttribute('href') === '#' + active.id) link.setAttribute('aria-current', 'location');
    else link.removeAttribute('aria-current');
  }
  scheduled = false;
}

function scheduleNavigationUpdate() {
  if (!scheduled) {
    scheduled = true;
    requestAnimationFrame(updateNavigation);
  }
}
window.addEventListener('scroll', scheduleNavigationUpdate, { passive: true });
window.addEventListener('resize', scheduleNavigationUpdate);
window.addEventListener('load', scheduleNavigationUpdate);
updateNavigation();
