import axios from "axios";
import { getCartProductFromLS } from "./getCartProductFromLS";
import { updateCartValue } from "./updateCartValue";

const rightContainer = document.querySelector(".rightContainer");

const getProducts = async () => {
  try {
    const response = await axios.get("https://dummyjson.com/products");

    const products = response.data.products;

    let content = "";
    if (products.length > 0) {
      products.forEach((item) => {
        content += `
         <div class="cardItem" id="card${item.id}">
          <div class="productImage">
            <img src=${item.thumbnail} alt="Product Image" />
          </div>
          <div class="productDescription">
            <h2>${item.title}</h2>
            <p>
              ${item.description}
            </p>
          </div>
          <div class="productPrice">
            <p>$${item.price}</p>
          </div>
          <div class="productStock">
            <p>Stock:<span class="productStockValue"> ${item.stock}</span></p>
          </div>
          <div class="stockElement">
            <button class="cartIncrement">+</button>
            <p class="productQuantity" data-quantity="1">1</p>
            <button class="cartDecrement">-</button>
          </div>
          <button class="add-to-cart-button">
            <i class="fa-solid fa-cart-shopping"></i> Add To Cart
          </button>
        </div>
                `;
      });
    } else {
      console.log("No products found");
    }

    rightContainer.innerHTML = content;

    // manage quantity and add to cart
    products.forEach((product) => {
      const currentCardElement = document.querySelector(`#card${product.id}`);

      const productQuantity =
        currentCardElement.querySelector(".productQuantity");
      const incrementButton =
        currentCardElement.querySelector(".cartIncrement");
      const decrementButton =
        currentCardElement.querySelector(".cartDecrement");
      const addToCartButton = currentCardElement.querySelector(
        ".add-to-cart-button"
      );

      incrementButton.addEventListener("click", () => {
        let quantity = parseInt(productQuantity.getAttribute("data-quantity"));
        if (quantity < product.stock) {
          quantity += 1;
          productQuantity.setAttribute("data-quantity", quantity);
          productQuantity.innerText = quantity;
        }
      });

      decrementButton.addEventListener("click", () => {
        let quantity = parseInt(productQuantity.getAttribute("data-quantity"));
        if (quantity > 1) {
          quantity -= 1;
          productQuantity.setAttribute("data-quantity", quantity);
          productQuantity.innerText = quantity;
        }
      });

      addToCartButton.addEventListener("click", () => {
        let arrLocalStorageProduct = getCartProductFromLS();

        let quantity =
          currentCardElement.querySelector(".productQuantity").innerText;
        let price = currentCardElement.querySelector(".productPrice").innerText;
        price = price.replace("$", "");
        quantity = Number(quantity);
        price = Number(price * quantity);

        let existingItem = arrLocalStorageProduct.find(
          (item) => item.id === product.id
        );

        if (existingItem) {
          if (quantity > 1) {
            existingItem.quantity += quantity;
            existingItem.price += price;
            localStorage.setItem(
              "cartProductLS",
              JSON.stringify(arrLocalStorageProduct)
            );
            updateCartValue(arrLocalStorageProduct);
          }
        } else {
          const productDetails = {
            id: product.id,
            name: product.title,
            quantity,
            price,
          };
          arrLocalStorageProduct.push(productDetails);
          localStorage.setItem(
            "cartProductLS",
            JSON.stringify(arrLocalStorageProduct)
          );
          updateCartValue(arrLocalStorageProduct);
        }
      });
    });
  } catch (errors) {
    console.error(errors);
  }
};

getProducts();
