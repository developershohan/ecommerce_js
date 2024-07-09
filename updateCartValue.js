let totalCart = document.querySelector('.totalCart');

export const updateCartValue =(cartProducts)=>{
return (totalCart.innerText = `${cartProducts.length}`)
}