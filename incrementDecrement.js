import { getCartProductFromLS } from "./getCartProductFromLS";
import { updateTotalPrice } from "./updateTotalPrice";

export const incrementDecrement = (event, id, stock, price) => {
    const button = event.target;
    const productElement = button.closest(".cart_list");
    const quantityElement = productElement.querySelector(".productQuantity");
    const priceElement = productElement.querySelector(".product_price");
  
    let quantity = parseInt(quantityElement.dataset.quantity);
  
    if (button.classList.contains("cartIncrement")) {
      if (quantity < stock) {
        quantity++;
      }
    } else if (button.classList.contains("cartDecrement")) {
      if (quantity > 1) {
        quantity--;
      }
    }
  
    // Update the DOM
    quantityElement.textContent = quantity;
    quantityElement.dataset.quantity = quantity;
    priceElement.textContent = `$${(price * quantity).toFixed(2)}`;
  
    // Update the local storage
    let arrLocalStorageProduct = getCartProductFromLS();
    arrLocalStorageProduct = arrLocalStorageProduct.map(product => {
      if (product.id === parseInt(id)) {
        return { ...product, quantity, price: price * quantity };
      }
      return product;
    });
    localStorage.setItem("cartProductLS", JSON.stringify(arrLocalStorageProduct));
    updateTotalPrice()
  }
  