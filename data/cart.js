export let cart = JSON.parse(localStorage.getItem('cart'));
export let cartquantity = JSON.parse(localStorage.getItem('cartquan'));

if (!cart) {
  cart = [
    {
      productID: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
      quantity: 3,
    },

    {
      productID: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
      quantity: 1,
    }
  ];

  cartquantity = 4;
}

function save() {
  localStorage.setItem('cart', JSON.stringify(cart));
  localStorage.setItem('cartquan', JSON.stringify(cartquantity));
}

export function addToCart(product) {
  let i = 0;
  for (i; i < cart.length; i++) if (cart[i].productID === product.id) break;
  //const cartItem = cart.filter((item) => product.id === item.productID);
  //if (!cartItem.length) {
  if (i === cart.length) {
    cart.push(
      {
        productID: product.id,
        quantity: 1,
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