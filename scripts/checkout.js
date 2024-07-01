//Import Data, here we are using the cart data
import * as ProductLibrary from "../data/products.js";
import * as CartLibrary from "../data/cart.js";
import * as Utils from "./utils/money.js";
import * as Date from "./utils/date.js";
import * as DeliveryLibrary from "../data/deliveryOptions.js";



const myCart = CartLibrary.cart;
const myOptions = DeliveryLibrary.DeliveryOptions;
const checkoutSummary = document.querySelector('.order-summary');
const checkoutHeader = document.querySelector('.return-to-home-link');
const checkoutPayment = document.querySelector('.payment-summary');
//const checkoutDeliveryOption = document.querySelector('.js-delivery');

function loadCheckout() {

  //intitalizing the price information 
  let itemPrices = 0;
  let shippingPrice = 0;
  const tax = 10;

  //Generating the html for the individual cart items
  let cartHTML = '';
  myCart.forEach((item) => {
    const product = ProductLibrary.findItemInProducts(item.productID);//get product

    const deliveryOption = DeliveryLibrary.findItemInDeliveryOptions(item.deliveryOption);//get the delivery option chosen

    //add cart item
    cartHTML += `
    <div class="cart-item-container">
    <div class="delivery-date">
    Delivery date: ${Date.getDeliveryDate(deliveryOption)}
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
    </div>`;


    myOptions.forEach((option) => {
      //add each DeliveryOption
      cartHTML += `
      <div class="delivery-option">
      <input type="radio" ${option.id === deliveryOption.id ? "checked" : ""} class="delivery-option-input" name="delivery-option-${product.id}" data-cart-id = "${item.productID}" data-option-id = "${option.id}">
      <div>
      <div class="delivery-option-date">
      ${Date.getDeliveryDate(option)}
      </div>
      <div class="delivery-option-price">
      ${option.name}
      </div>
      </div>
      </div>`;
    });

    cartHTML += `</div></div></div>`; //bug fix
    //Calculations for price portion of the application
    itemPrices += (product.priceCents * item.quantity);
  });
  checkoutSummary.innerHTML = cartHTML;
  //-----------------------------------

  //Calculating money
  const preTaxPrice = itemPrices + shippingPrice;
  const taxPrice = itemPrices * (tax / 100);
  const postTaxtPrice = Utils.convertToDollars((preTaxPrice + taxPrice));

  //Generate the price information HTML:
  cartHTML = `      
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
  checkoutPayment.innerHTML = cartHTML;  //Load
  //--------------------------------

  //update the headers
  checkoutHeader.innerText = CartLibrary.cartquantity + " items"

  //Deleting items from cart button functionality
  document.querySelectorAll(".delete-quantity-link").forEach((deleteButton) => {
    deleteButton.addEventListener('click', () => {
      const productId = deleteButton.dataset.productId;
      CartLibrary.deleteItemFromCart(productId);
      loadCheckout();
    })
  });

  document.querySelectorAll('.delivery-option-input').forEach((optionbutton) => {
    optionbutton.addEventListener('click', () => {
      const { cartId, optionId } = optionbutton.dataset;
      CartLibrary.setDeliveryOption(cartId, optionId);
      loadCheckout();
    })
  });
  /*

  document.querySelectorAll(".update-quantity-link").forEach((updateButton) => {
    updateButton.addEventListener('click', () => {
      const productId = updateButton.dataset.productId;

      CartLibrary.deleteItemFromCart(productId);
      loadCheckout(); //change it so that u only update the specific thingy mingy
    })
  });
  */
}


loadCheckout();