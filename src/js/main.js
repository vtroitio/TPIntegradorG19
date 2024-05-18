import * as bootstrap from 'bootstrap';
import { models } from '../data/models.js';
import Product from './Product.js';

const canvases = document.querySelectorAll('.product-canvas');
canvases.forEach((canvas, index) => new Product(canvas, models[index]));

const sidebarLinks = document.querySelectorAll('.sidebar-link');
sidebarLinks.forEach((link) =>
  link.addEventListener('click', () => {
    document.querySelector('.hamburger-menu input').checked = false;
  })
);
