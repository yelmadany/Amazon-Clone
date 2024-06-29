//Import Data, here we are using the cart data
import * as ProductLibrary from "../data/products.js";
import * as CartLibrary from "../data/cart.js";
import * as Utils from "./utils/money.js");

const myCart = CartLibrary.cart;
const checkoutPage = document.querySelector('.order-summary');
loadCheckout();

function loadCheckout() {

  //intitalizing the price information 
  let itemPrices = 0;
  let shippingPrice = 0;
  const tax = 10;

  //Generating the html for the individual cart items
  let cartHTML = '';
  myCart.forEach((item) => {
    const product = ProductLibrary.findItemInProducts(item.productID);
    cartHTML += `
    <div class="cart-item-container">
    <div class="delivery-date">
    Delivery date: Tuesday, June 21
    </div>
    
    <div class="cart-item-details-grid">
    <img class="product-image" src="${product.image}">
    
    <div class="cart-item-details">
    <div class="product-name">
    ${product.name}
    </div>
    <div class="product-price">
    $${(product.priceCents / 100).toFixed(2)}
    </div>
    <div class="product-quantity">
    <span>
    Quantity: <span class="quantity-label">${item.quantity}</span>
    </span>
    <span class="update-quantity-link link-primary" data-product-id = "${product.id}">
    Update
    </span>
    <span class="delete-quantity-link link-primary" data-product-id = "${product.id}">
    Delete
    </span>
    </div>
    </div>
    
    <div class="delivery-options">
    <div class="delivery-options-title">
    Choose a delivery option:
    </div>
    <div class="delivery-option">
    <input type="radio" checked class="delivery-option-input" name="delivery-option-${product.id}">
    <div>
    <div class="delivery-option-date">
    Tuesday, June 21
    </div>
    <div class="delivery-option-price">
    FREE Shipping
    </div>
    </div>
    </div>
    <div class="delivery-option">
    <input type="radio" class="delivery-option-input" name="delivery-option-${product.id}">
    <div>
    <div class="delivery-option-date">
    Wednesday, June 15
    </div>
    <div class="delivery-option-price">
    $4.99 - Shipping
    </div>
    </div>
    </div>
    <div class="delivery-option">
    <input type="radio" class="delivery-option-input" name="delivery-option-${product.id}">
    <div>
    <div class="delivery-option-date">
    Monday, June 13
    </div>
    <div class="delivery-option-price">
    $9.99 - Shipping
    </div>
    </div>
    </div>
    </div>
    </div>
    </div>`;
    //Calculations for price portion of the application
    itemPrices += product.priceCents;
  });
  const preTaxPrice = itemPrices + shippingPrice;
  const taxPrice = itemPrices * (tax / 100);
  const postTaxtPrice = Utils.convertToDollars(preTaxPrice + taxPrice);

  //Generate the price information HTML:

  cartHTML += `      
  <div class="payment-summary">
  <div class="payment-summary-title">
  Order Summary
  </div>
  
  <div class="payment-summary-row">
  <div>Items (${CartLibrary.cartquantity}):</div>
  <div class="payment-summary-money">${Utils.convertToDollars(itemPrices)}</div>
  </div>
  
  <div class="payment-summary-row">
  <div>Shipping &amp; handling:</div>
  <div class="payment-summary-money">$${Utils.convertToDollars(shippingPrice)}</div>
  </div>
  
  <div class="payment-summary-row subtotal-row">
  <div>Total before tax:</div>
  <div class="payment-summary-money">$${Utils.convertToDollars(preTaxPrice)}</div>
  </div>

        <div class="payment-summary-row">
        <div>Estimated tax (${tax}%):</div>
        <div class="payment-summary-money">$${Utils.convertToDollars(taxPrice)}</div>
        </div>
        
        <div class="payment-summary-row total-row">
        <div>Order total:</div>
        <div class="payment-summary-money">${postTaxtPrice}</div>
        </div>
        
        <button class="place-order-button button-primary">
        Place your order
        </button>
        </div>`;

  //load to the webpage
  checkoutPage.innerHTML = cartHTML;

  document.querySelectorAll(".delete-quantity-link").forEach((deleteButton) => {
    deleteButton.addEventListener('click', () => {
      const productId = deleteButton.dataset.productId;
      //alert("ok");
      CartLibrary.deleteItemFromCart(productId);
      loadCheckout();
    })
  });
}