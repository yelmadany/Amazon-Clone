import * as OrdersLibrary from '../data/orders.js';
import * as ProductLibrary from '../data/products.js';
//step 1 get the data

const myOrders = OrdersLibrary.orders;

async function loadPage() {
  await ProductLibrary.loadProductsFetch();

  let orderhtml = ``;
  myOrders.forEach((order) => {
    console.log(order.itemId);
    const product = ProductLibrary.findItemInProducts(order.itemId);

    //step 2 generate the html
    orderhtml += `
      <div class="order-container">
      
      <div class="order-header">
      <div class="order-header-left-section">
      <div class="order-date">
      <div class="order-header-label">Order Placed:</div>
      <div>${order.date}</div>
      </div>
      <div class="order-total">
      <div class="order-header-label">Total:</div>
      <div>$${order.price}</div>
      </div>
      </div>
      
      <div class="order-header-right-section">
      <div class="order-header-label">Order ID:</div>
      <div>${order.orderId}</div>
      </div>
      </div>
      <div class="order-details-grid">
      `;


    order.itemId.forEach((id) => {
      const product = ProductLibrary.findItemInProducts(id);

      orderhtml += `
      <div class="product-image-container">
      <img src=${product.image}>
      </div>
      
      <div class="product-details">
      <div class="product-name">
      ${product.name}
      </div>
      <div class="product-delivery-date">
      Arriving on: August 15
      </div>
      <div class="product-quantity">
      Quantity: 1
      </div>
      <button class="buy-again-button button-primary">
      <img class="buy-again-icon" src="images/icons/buy-again.png">
      <span class="buy-again-message">Buy it again</span>
      </button>
      </div>
      
      <div class="product-actions">
      <a href="tracking.html">
      <button class="track-package-button button-secondary">
      Track package
      </button>
      </a>
      </div> `;
    });

    orderhtml += `</div></div>`;

  });

  //step 3 load
  const orderGrid = document.querySelector('.orders-grid');
  orderGrid.innerHTML = orderhtml;
}



loadPage();

