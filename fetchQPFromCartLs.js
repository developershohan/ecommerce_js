import { getCartProductFromLS } from "./getCartProductFromLS";

export const fetchQPFromCartLs = (id, price) => {
  let arrLocalStorageProduct = getCartProductFromLS();

  let existingProduct = arrLocalStorageProduct.find(
    (product) => product.id === id
  );

  let quantity = 1;

  if (existingProduct) {
    quantity = existingProduct.quantity;
    price = existingProduct.price / existingProduct.quantity; 
  }
  
  return { quantity, price: (price * quantity).toFixed(2) };
};
