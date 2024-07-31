import { getCartProductFromLS } from "./getCartProductFromLS";

export const fetchQPFromCartLs = (id, price) => {
  let arrLocalStorageProduct = getCartProductFromLS();

  let existingProdtuct = arrLocalStorageProduct.find(
    (product) => product.id === id
  );
  let quantity = 1;

  if (existingProdtuct) {
    quantity = existingProdtuct.quantity;
    price = existingProdtuct.price;
  }
  return { quantity, price };
};
