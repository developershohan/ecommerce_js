export const getCartProductFromLS = () => {
  const products = localStorage.getItem("cartProductLS");
  return products ? JSON.parse(products) : [];
}
