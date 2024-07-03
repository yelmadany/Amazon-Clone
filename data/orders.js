import * as Date from '../scripts/utils/date.js';

export let orders;

function loadOrders() {
  orders = JSON.parse(localStorage.getItem('orders'));
  if (!orders) { //this is important as initally it would be undefined.
    orders = [];
  }
}

loadOrders();

function save() {
  localStorage.setItem('orders', JSON.stringify(orders));
}

export function addToOrders(cartIds, price) {
  orders.push({
    itemId: cartIds,
    date: Date.getOrderPlacedDate(),
    price: price,
    orderId: '1111111111'
  });

  save();
}