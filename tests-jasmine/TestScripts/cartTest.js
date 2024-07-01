import * as CartLibrary from "../../data/cart.js"

describe('2. Cart Related Testing', () => {
  describe('Add to Cart', () => {
    //test a new item to the cart
    it('Adding a new item to the cart', () => {

      spyOn(localStorage, 'getItem').and.callFake((name) => {
        if (name === 'cart') {
          return JSON.stringify([]);
        }
        else {
          return JSON.stringify(0);
        }
      });

      spyOn(localStorage, 'setItem');

      CartLibrary.loadCart();

      console.log(CartLibrary.cart);

      CartLibrary.addToCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6'); //default

      expect(CartLibrary.cart.length).toEqual(1);
      expect(CartLibrary.cart[0].productID).toEqual('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
      expect(CartLibrary.cart[0].quantity).toEqual(1);
      expect(localStorage.setItem).toHaveBeenCalledTimes(2);
    });


    //test to add existing item
    it('Adding an existing item to the cart', () => {

      spyOn(localStorage, 'getItem').and.callFake((name) => {
        if (name === 'cart') {
          return JSON.stringify([{
            productID: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
            quantity: 3,
            deliveryOption: "1"
          }]);
        }
        else {
          return JSON.stringify(3);
        }
      });

      spyOn(localStorage, 'setItem');

      CartLibrary.loadCart();

      CartLibrary.addToCart('e43638ce-6aa0-4b85-b27f-e1d07eb678c6'); //default

      expect(CartLibrary.cart.length).toEqual(1);
      expect(CartLibrary.cart[0].productID).toEqual('e43638ce-6aa0-4b85-b27f-e1d07eb678c6');
      expect(CartLibrary.cart[0].quantity).toEqual(4);
      expect(localStorage.setItem).toHaveBeenCalledTimes(2);
    });


  });

});