import { Carousel } from 'bootstrap';

const sidebarLinks = document.querySelectorAll('.sidebar-link');
const hamburgerInput = document.querySelector('.hamburger-menu input');

sidebarLinks.forEach((link) =>
  link.addEventListener('click', () => (hamburgerInput.checked = false))
);

window.addEventListener('resize', () => {
  if (window.innerWidth > 768) hamburgerInput.checked = false;
});
