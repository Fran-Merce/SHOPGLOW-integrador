import { products } from "../data/products.js";
import { displayProducts } from "./cards.js";
const productContainer = document.querySelector("#productsContainer");
const filterSelects = document.querySelectorAll(".filter__select");
const logoutBtn = document.getElementById("logoutBtn");


// Filter Invidual Functions

const filterCategory = (products, optionSelected) =>(
  optionSelected === "all"
    ? products
    : products.filter(product => product.category === optionSelected))


const filterPrice = (products, optionSelected) =>
  optionSelected === "all"
    ? products
    : products.filter(product => product.price <= optionSelected);


const sortProductsByPrice = (option,products) => {
  option === "low"
    ? products.sort((a, b) => a.price - b.price)
    : products.sort((a, b) => b.price - a.price);
};
const filterProductsByGender = (option,products) => products.filter(product => product.gender === option)
    

const filterProducts = () => {
  
  let productsFiltered = [...products];
  const selectFilterPriceSort = document.querySelector("#productsFilterSort").value;  
  const selectCategory = document.querySelector("#productsFilterCategory").value;
  const selectFilterPrice = document.querySelector("#productsFilterPrice").value;
  const selectFilterGender = document.querySelector("#productsFilterByGender").value;
  productsFiltered = [...filterCategory(productsFiltered, selectCategory)];
  productsFiltered = [...filterPrice(productsFiltered, selectFilterPrice)];
  productsFiltered=[...filterProductsByGender(selectFilterGender,productsFiltered)]
  selectFilterPriceSort !== "" && sortProductsByPrice(selectFilterPriceSort,productsFiltered);
  displayProductsFiltered(productsFiltered);

};

//  UI FUNCTIONS

const deleteHtml = (container) => {
  while (container.firstChild) {
    container.removeChild(container.firstChild);
  }
}

const displayProductsFiltered = (productsFiltered) => {
  deleteHtml(productContainer);
  displayProducts(productsFiltered, "cardProduct","xl", productContainer);
};

const init = () => {
  const category = localStorage.getItem("category") 
  ? localStorage.getItem("category").toLocaleLowerCase() 
  : "all";
  document.querySelector(`#productsFilterCategory`).value = category.toLowerCase()
  displayProducts(filterCategory(products,category), "cardProduct","xl", productContainer);
}

filterSelects.forEach(select => select.addEventListener("change", filterProducts));
cartLink.addEventListener("click",()=>   window.location.href=`/pages/cart.html`)
document.addEventListener("DOMContentLoaded", init);

  
!localStorage.getItem('isLogged') && window.location.replace('./register.html')
localStorage.getItem('isLogged') ==='false' && window.location.replace('./login.html')

logoutBtn.addEventListener("click", () => {
  localStorage.setItem("isLogged", false);
  window.location.replace = "./login.html";
})
AOS.init();