const getProductFromLS = () => {
  let productInCart = localStorage.getItem("cartProductLS");
  productInCart = JSON.parse(productInCart);

  if (!productInCart) {
    productInCart = [];
  }

  let totalCart = productInCart.length;

  const totalCartElement = document.querySelector(".totalCart");
  if (totalCartElement) {
    totalCartElement.innerText = totalCart;
  }
};

getProductFromLS();
