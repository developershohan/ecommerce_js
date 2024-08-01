import { fetchQPFromCartLs } from "./fetchQPFromCartLs";
import { getCartProductFromLS } from "./getCartProductFromLS";
import axios from "axios";
import { incrementDecrement } from "./incrementDecrement";
import { updateTotalPrice } from "./updateTotalPrice";

const cart_container = document.querySelector(".cart_container");
let arrLocalStorageProduct = getCartProductFromLS();

try {
  const response = await axios.get("https://dummyjson.com/products");

  const products = response.data.products;

  let content = "";

  let filteredProducts = products.filter((currentProduct) => {
    return arrLocalStorageProduct.some(
      (currElem) => currElem.id === currentProduct.id
    );
  });

  if (filteredProducts.length > 0) {
    filteredProducts.forEach((item) => {
      const lsActualData = fetchQPFromCartLs(item.id, item.price);

      content += `
      <div class="cart_list" data-id="${item.id}" data-stock="${item.stock}" data-price="${item.price}">
        <img class="product_img" src="${item.thumbnail}" alt="${item.title}" />
        <h1 class="product_name">${item.title}</h1>
        <h3 class="product_price">$${lsActualData.price}</h3>
        <div class="stockElement">
          <button class="cartIncrement">+</button>
          <p class="productQuantity" data-quantity="${lsActualData.quantity}">${lsActualData.quantity}</p>
          <button class="cartDecrement">-</button>
        </div>
        <button class="add-to-cart-button remove_button">
          <i class="fa-solid fa-cart-shopping"></i> Remove
        </button>
      </div>
    `;
    });
  } else {
    content += `No products found`;
  }

  cart_container.innerHTML = content;

  const remove_buttons = document.querySelectorAll(".remove_button");
  remove_buttons.forEach((button) => {
    button.addEventListener("click", () => {
      const cartList = button.closest(".cart_list");
      const id = cartList.dataset.id;
  
      let arrLocalStorageProduct = getCartProductFromLS();

      let cartProducts = arrLocalStorageProduct.filter(
        (curProduct) => curProduct.id !== parseInt(id) 
      );
      localStorage.setItem("cartProductLS", JSON.stringify(cartProducts));

      // Remove the item from the DOM
      cartList.remove();
    });
  });

  const stockElements = document.querySelectorAll(".stockElement");
  stockElements.forEach(stockElement => {
    stockElement.addEventListener("click", (e) => {
      const productElement = e.target.closest(".cart_list");
      const id = productElement.dataset.id;
      const stock = parseInt(productElement.dataset.stock);
      const price = parseFloat(productElement.dataset.price);
      
      incrementDecrement(e, id, stock, price);
    });
  });
  

} catch (errors) {
  console.error(errors);
}
updateTotalPrice()