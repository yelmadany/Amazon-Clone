export const cart = [];

export let cartquantity = 0;

export function addToCart(product) {
  let i = 0;
  for (i; i < cart.length; i++) if (cart[i].productID === product.id) break;
  //const cartItem = cart.filter((item) => product.id === item.productID);
  //if (!cartItem.length) {
  if (i === cart.length) {
    cart.push(
      {
        productID: product.id,
        productName: product.name,
        quantity: 1
      }
    );
  }
  else {
    cart[i].quantity++;
  }
}

export function updateCartQuantity() {
  cartquantity++;
  document.querySelector(".cart-quantity").innerHTML = cartquantity;
}