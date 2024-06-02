import { Carousel } from 'bootstrap';

new Carousel(document.querySelector('#carousel-productos'), {
  touch: false,
});

const sidebarLinks = document.querySelectorAll('.sidebar-link');
const hamburger = document.querySelector('.hamburger-menu');
const hamburgerInput = document.querySelector('.hamburger-menu input');

function estilizarHamburgesa() {
  hamburgerInput.checked = false;
  hamburger.style.backgroundColor = 'var(--bar-background-color)';
  hamburger.style.boxShadow = '0 4px 6px rgba(0, 0, 0, 0.1)';
  hamburger.children[0].style.display = 'block';
}

hamburgerInput.addEventListener('click', (event) => {
  if (event.target.checked) {
    hamburger.style.backgroundColor = 'unset';
    hamburger.style.boxShadow = 'none';
    hamburger.children[0].style.display = 'none';
  } else {
    estilizarHamburgesa();
  }
});

sidebarLinks.forEach((link) =>
  link.addEventListener('click', () => {
    estilizarHamburgesa();
  })
);

window.addEventListener('resize', () => {
  if (window.innerWidth > 768) {
    estilizarHamburgesa();
  }
});
