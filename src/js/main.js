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

async function fetchProducts() {
  try {
    const response = await fetch('http://localhost:3000/api/products');
    const products = await response.json();
    renderProducts(products);
  } catch (error) {
    console.error('Error fetching products:', error);
  }
}

async function createProduct(product) {
  try {
    const response = await fetch('http://localhost:3000/api/products', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(product),
    });
    const newProduct = await response.json();
    fetchProducts();
  } catch (error) {
    console.error('Error creating product:', error);
  }
}

document.getElementById('productForm').addEventListener('submit', async (event) => {
  event.preventDefault();
  const name = document.getElementById('productName').value;
  const price = document.getElementById('productPrice').value;
  await createProduct({ name, price });
});

async function renderProducts(products) {
  const productList = document.getElementById('productList');
  productList.innerHTML = '';
  products.forEach(product => {
    const productItem = document.createElement('div');
    productItem.textContent = `${product.name} - $${product.price}`;
    productList.appendChild(productItem);
  });
}

fetchProducts();
