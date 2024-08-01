import { getCartProductFromLS } from "./getCartProductFromLS";

export const updateTotalPrice = ()=>{
    let arrLocalStorageProduct = getCartProductFromLS();
    let subtotal = document.querySelector(".subtotal span")

    let initialPrice = 0
    let totalPrice = arrLocalStorageProduct.reduce((accum, curElem)=>{
let price = parseInt(curElem.price) || 0
return accum + price
    },initialPrice)

    subtotal.innerHTML = `$${totalPrice}`
}