// Fetch and display products
function fetchProducts(query = '') {
  fetch('https://fakestoreapi.com/products')
    .then(response => response.json())
    .then(data => {
      // Filter if query is provided
      if (query.trim() !== '') {
        data = data.filter(item =>
          item.title.toLowerCase().includes(query.toLowerCase())
        );
      }
      renderProducts(data);
    })
    .catch(error => {
      console.error('Error fetching products:', error);
      document.getElementById('products-container').innerHTML = '<p style="color: white;">Failed to load products.</p>';
    });
}

// Render products to the DOM
function renderProducts(products) {
  const container = document.getElementById('products-container');
  if (products.length === 0) {
    container.innerHTML = '<p style="color: white;">No products found.</p>';
    return;
  }

  container.innerHTML = products
    .map(product => `
      <article class="card">
        <div class="card__title">${product.category}</div>
        <div class="card__body">
          <img src="${product.image}" alt="${product.title}" />
          <h2>${product.title}</h2>
          <p class="price">$${product.price}</p>
          <p class="description">${product.description}</p>
        </div>
        <div class="card__footer">
          <button>Add to Cart</button>
        </div>
      </article>
    `)
    .join('');
}

// Event listener for search
document.getElementById('search-btn').addEventListener('click', () => {
  const query = document.getElementById('search-input').value;
  fetchProducts(query);
});

// Load all products on page load
fetchProducts();
