$(document).ready(function () {
  let products = [];
  let displayedProducts = [];

  const fetchProducts = async () => {
    const response = await fetch('https://fakestoreapi.com/products');
    const data = await response.json();
    products = data;
    displayedProducts = products;
    showProducts(displayedProducts);
  };

  const showProducts = (products) => {
    $('#productContainer').empty();
    products.forEach((product) => {
      $('#productContainer').append(`
              <div class="product">
                  <img src="${product.image}" alt="${product.title}" class="product-image">
                  <div class="title-diviser">
                    <div class="product-divider"></div> 
                    <h2 class="product-title">${product.title}</h2>
                  </div>
                  <p class="product-price">$ ${product.price}</p>
              </div>
          `);
    });
  };

  const sortProducts = (products, ascending = true) => {
    return products.sort((a, b) =>
      ascending ? a.price - b.price : b.price - a.price
    );
  };

  const filterProducts = (products, category) => {
    return category === 'all'
      ? products
      : products.filter((product) => product.category === category);
  };

  const initialize = async () => {
    fetchProducts();
    showProducts(displayedProducts);

    $('#categoryFilter').change(function () {
      displayedProducts = filterProducts(products, $(this).val());
      showProducts(displayedProducts);
    });

    $('#sortAsc').click(function () {
      displayedProducts = sortProducts(displayedProducts, true);
      showProducts(displayedProducts);
    });

    $('#sortDesc').click(function () {
      displayedProducts = sortProducts(displayedProducts, false);
      showProducts(displayedProducts);
    });
  };

  initialize();
});
