import axios from "axios";
const rightContainer = document.querySelector(".rightContainer");
// const baseUrl = 'https://dummyjson.com/products'

const getProducts = async () => {
  try {
    const response = await axios.get("https://dummyjson.com/products");

    const products = response.data.products;

    let content = "";
    if (products.length > 0) {
      products.map((item, index) => {
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
              <p class="productQuantity">1</p>
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
    const stock = document
      .querySelector(".stockElement")
      .addEventListener("click", (e) => {
        if (e.target.classList.contains("cartIncrement")) {
          const quantity = parseInt(e.target.nextElementSibling.textContent);
          e.target.nextElementSibling.textContent = quantity + 1;
        } else if (e.target.classList.contains("cartDecrement")) {
          const quantity = parseInt(
            e.target.previousElementSibling.textContent
          );
          if (quantity > 1) {
            e.target.previousElementSibling.textContent = quantity - 1;
          }
        }
      });
    console.log(stock);
  } catch (errors) {
    console.error(errors);
  }
};

getProducts();
