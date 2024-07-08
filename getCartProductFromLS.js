export const getCartProductFromLS = (product) => {
let cartProducts = localStorage.getItem('cartProductLS');
if (!cartProducts) {
    return []

}
cartProducts = JSON.parse(cartProducts)
return cartProducts

    console.log(product.id);
    // Add logic to handle the product
  };
  