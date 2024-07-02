//import modules and Step 1 save the data 
import * as CartLibrary from '../data/cart.js';
import { products } from '../data/products.js';
import * as Utils from './utils/money.js';

//Step 2 Generate the HTML
const productPage = document.querySelector('.products-grid');
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
      <img class="product-rating-stars" src="${product.getImageURL()}">
      <div class="product-rating-count link-primary">
        ${product.rating.count}
      </div>
    </div>

    <div class="product-price">
      $${Utils.convertToDollars(product.priceCents)}
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

    ${product.showExtra()}

    <div class="product-spacer"></div>

    <div class="added-to-cart">
      <img src="images/icons/checkmark.png">
      Added
    </div>

    <button class="add-to-cart-button button-primary js-add-to-cart" 
    data-product-id = "${product.id}">
      Add to Cart
    </button>
    </div>
`
});

//STep 3, load it onto the page
productPage.innerHTML = productsHTML;

//Load the cart 
document.querySelector('.cart-quantity').innerText = CartLibrary.cartquantity;

//Cart feature
document.querySelectorAll(".js-add-to-cart").forEach((button) => {
  button.addEventListener('click', () => {

    const product = { id: button.dataset.productId };
    CartLibrary.addToCart(product.id);
    CartLibrary.updateCartQuantity();
  });
});