import {
  products
} from "../data/products.js";
import {
  defaultAlert,
  handleDeleteAlert
} from "./alerts.js";

export const cartItemGen = ({
  url,
  price,
  quantity,
  id,
  size
}) => {
  return `
    <div  data-id=${id}  class="cart__col1__body__item">
      <div class="cart__col1__body__item__img">
        <img src="${url}" alt="product-1" />
      </div>
      <div class="cart__col1__body__item__info">
        <p>${size}</p>
        <div>
        <p>$${price} 1/u </p>
        </div>
        <div class="handleQuantity">
          <i class="quantity-controls quantityAdd bx bxs-plus-circle" id=""></i>
          <p data-quantity="${quantity}" class="quantityNum">${quantity}</p>
          <i class="quantity-controls quantitySubstract bx bxs-minus-circle "id=""></i>
        </div>
        <div>
        <p class="cart__col1__body__item__delete bx bx-x"></p>
        </div>
      </div>
    </div>
  `;
};

export const displayCartItem = () => {
  const cart = localStorage.getItem("cart") ? JSON.parse(localStorage.getItem("cart")) : [];
  if (cart.length !== 0) {
    const cartContainer = document.querySelector("#cartBody");
    cart.map(product => cartContainer.innerHTML += cartItemGen(product));
    loadCartEvents();
  }
  cartVoid();
};

export const handleAddToCart = e => {
  const size = sizeValidation(e);
  const cartTotalProducts= document.querySelector("#cartLink");
  if (size) {
    const productIdCart = parseInt(e.target.parentNode.dataset.id);
    const productFiltered = products.filter(product => product.id === productIdCart);
    let cart = localStorage.getItem("cart") ?JSON.parse(localStorage.getItem("cart")) : [];
    if (cart.length === 0) {
      cart = [{...productFiltered[0],quantity: 1,  size: size,  otalPrice: productFiltered[0].price,}];
      Swal.fire(defaultAlert("Producto Agregado al carrito", "", "swal-custom-class"));
    } else {
      const productExist = cart.find(product => product.id === productIdCart);
      productExist
        ? Swal.fire((defaultAlert("Producto ya agregado En el carrito", "","swal-custom-class", "warning")))
        : cart.push(
          {...productFiltered[0],
            quantity: 1,
            size: size,
            totalPrice: productFiltered[0].price
          }) && Swal.fire(defaultAlert("Producto Agregado al carrito","","swal-custom-class"));  
    }
    localStorage.setItem("cart", JSON.stringify(cart));
    cartTotalProducts.setAttribute("data-total", cart.length);
  }
};

export const handleDelete = (e) => {
  Swal.fire();
  const productIdCart=parseInt(e.target.parentNode.parentNode.parentNode.dataset.id)
  const cart = JSON.parse(localStorage.getItem("cart"));
  const productSelected = cart.find(product => product.id === productIdCart);
  console.log(productSelected)
  const productIndex = cart.indexOf(productSelected);
  console.log(productIndex)
  cart.splice(productIndex, 1);
  localStorage.setItem("cart", JSON.stringify(cart));
  e.target.parentNode.parentNode.parentNode.remove()
  cartVoid();
  totalPriceCalc();
};

const handlequantity = e => {
  const cart = JSON.parse(localStorage.getItem("cart"));
  const productIdCart = parseInt(e.target.parentNode.parentNode.parentNode.dataset.id);
  const quantityValue = e.target.parentNode.querySelector(".quantityNum");
  let productSelected = cart.find(product => product.id === productIdCart);
  if (e.target.classList.contains("quantityAdd")) {
    productSelected.quantity++;
  }
  if (e.target.classList.contains("quantitySubstract")) {
    productSelected.quantity === 1 
      ? handleDeleteAlert(e,productSelected)
      : productSelected.quantity--;
    }

  productSelected.totalPrice = productSelected.price * productSelected.quantity;
  quantityValue.innerHTML = productSelected.quantity;
  localStorage.setItem("cart", JSON.stringify(cart));
  totalPriceCalc();

};


const totalPriceCalc = () => {
  const cart = JSON.parse(localStorage.getItem("cart"));
  const totalPrice = document.querySelector("#totalPrice");
  let total = 0;
  if (cart.length !== 0) {

    cart.forEach(product => {
      total += product.price * product.quantity
      console.log('price',product.price)
      console.log('totalPrice',product.totalPrice)
      console.log('total',total)
    });
    totalPrice.innerHTML = new Intl.NumberFormat("es-ES", {style: "currency",currency: "ARS",}).format(total);
  }else {
    totalPrice.innerHTML = new Intl.NumberFormat("es-ES", {  style: "currency",  currency: "ARS",}).format(total);
  }
};

const sizeValidation = e => {
  const sizeItem = e.target.parentNode.querySelector(".size-item--selected");
  if (sizeItem === null) {
    Swal.fire(defaultAlert("Seleccione un tamaño", "", "swal-custom-class", "warning"));
    return false;
  }
  return sizeItem.dataset.size;
};

const cartVoid = () => {
  const localStorageCart = localStorage.getItem("cart");
  const cartContainer = document.querySelector("#cartBody");
  if (localStorageCart === null || localStorageCart === "[]") {
    cartContainer.innerHTML = '<h2 class="cart__void">Carrito Vacio</h2>';
    const btnCheckout = document.querySelector("#button-checkout");
    btnCheckout.classList.add("btn-disabled");
  }
};

const loadCartEvents = () => {
  const handlequantityElement = document.querySelectorAll(".handleQuantity");
  const handleDeleteBtn = document.querySelectorAll(".cart__col1__body__item__delete");
  handlequantityElement.forEach(btn => btn.addEventListener("click", handlequantity));
  handleDeleteBtn.forEach(btn =>btn.addEventListener("click", handleDeleteAlert));
  totalPriceCalc();
};

document.addEventListener("load", () => displayCartItem());