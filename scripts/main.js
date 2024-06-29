//Step 1 Data : done in Products.js

//Step 2 Generate the HTML
const ProductPage = document.querySelector('.products-grid');

let productsHTML = ""

products.forEach((product) => {
  productsHTML += `
    <div class="product-container">
    <div class="product-image-container">
      <img class="product-image" src="${product.image}">
    </div>

    <div class="product-name limit-text-to-2-lines">
      ${product.name}
    </div>

    <div class="product-rating-container">
      <img class="product-rating-stars" src="images/ratings/rating-${(product.rating.stars * 10)}.png">
      <div class="product-rating-count link-primary">
        ${product.rating.count}
      </div>
    </div>

    <div class="product-price">
      $${(product.priceCents / 100).toFixed(2)}
    </div>

    <div class="product-quantity-container">
      <select>
        <option selected value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
        <option value="5">5</option>
        <option value="6">6</option>
        <option value="7">7</option>
        <option value="8">8</option>
        <option value="9">9</option>
        <option value="10">10</option>
      </select>
    </div>

    <div class="product-spacer"></div>

    <div class="added-to-cart">
      <img src="images/icons/checkmark.png">
      Added
    </div>

    <button class="add-to-cart-button button-primary js-add-to-cart" 
    data-product-id = "${product.id}" data-product-name = "${product.name}">
      Add to Cart
    </button>
    </div>
`
});

//STep 3, load it onto the page

ProductPage.innerHTML = productsHTML;


//Cart feature
document.querySelectorAll(".js-add-to-cart").forEach((button) => {
  button.addEventListener('click', () => {

    const product = { id: button.dataset.productId, name: button.dataset.productName };
    let cartItem;

    for (let i = 0; i < cart.length; i++) {
      if (cart[i].productID === product.id) {
        cartItem = cart[i];
        break;
      }
    }
    //const cartItem = cart.filter((item) => product.id === item.productID);
    console.log(cartItem);
    //if (!cartItem.length) {
    if (!cartItem) {
      cart.push(
        {
          productID: product.id,
          productName: product.name,
          quantity: 1
        }
      );
    }
    else {
      cartItem.quantity++;
    }

    document.querySelector(".cart-quantity").innerHTML = cart.length;

  });
});