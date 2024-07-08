import axios from "axios";

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

    // manage quantity
    products.forEach((product) => {
      const currentCardElement = document.querySelector(`#card${product.id}`);
      const productQuantity =
        currentCardElement.querySelector(".productQuantity");
      const incrementButton =
        currentCardElement.querySelector(".cartIncrement");
      const decrementButton =
        currentCardElement.querySelector(".cartDecrement");

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
    });
  } catch (errors) {
    console.error(errors);
  }
};

getProducts();
