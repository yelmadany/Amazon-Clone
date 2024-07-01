export let cart;
export let cartquantity;


export function loadCart() {
  cart = JSON.parse(localStorage.getItem('cart'));
  cartquantity = JSON.parse(localStorage.getItem('cartquan'));

  if (!cart) {
    cart = [
      {
        productID: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
        quantity: 3,
        deliveryOption: "1"
      },

      {
        productID: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
        quantity: 1,
        deliveryOption: "1"
      }
    ];

    cartquantity = 4;
  }
}

loadCart();

function save() {
  localStorage.setItem('cart', JSON.stringify(cart));
  localStorage.setItem('cartquan', JSON.stringify(cartquantity));
}

export function addToCart(productId) {
  let i = 0;
  for (i; i < cart.length; i++) if (cart[i].productID === productId) break;
  //const cartItem = cart.filter((item) => product.id === item.productID);
  //if (!cartItem.length) {
  if (i === cart.length) {
    cart.push(
      {
        productID: productId,
        quantity: 1,
        deliveryOption: "1" //default is free shipping
      }
    );
  }
  else {
    cart[i].quantity++;
  }
  save();
}

export function updateCartQuantity() {
  cartquantity++;
  document.querySelector(".cart-quantity").innerHTML = cartquantity;
  save();
}

export function deleteItemFromCart(id) {
  const index = cart.findIndex(item => item.productID === id);
  if (cart[index].quantity === 1) {
    cart.splice(index, 1);
  }
  else {
    cart[index].quantity--;
  }

  cartquantity--;

  save();
}

function findItemInCart(id) {
  let i = 0;
  for (i; i < cart.length; i++) if (cart[i].productID === id) break;

  if (i === cart.length) {
    return "";
  }
  return cart[i];
}

export function setDeliveryOption(cartId, optionId) {
  const cartItem = findItemInCart(cartId);
  cartItem.deliveryOption = optionId;
}

