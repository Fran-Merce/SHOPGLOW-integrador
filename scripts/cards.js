import { handleAddToCart } from "./cart.js";
const redirectUrl = (data) => (window.location.href = `./pages/${data}.html`);

const cardsHome = (className, size, { url, price, id,name}) => {
  return `
  <div data-id="${id}" class="${size} ${className}">
    <div class="cardProduct-img-wrapper" >
      <img class="${size} ${className}__img" src="${url}" alt="">
    </div>
  
    <div class="${className}__content">
      <div class=${className}__info>
        <p class="${className}__text">${name}</p>
        <p class="${className}__text">$${price}</p>
      </div >
        <div class="size-wrapper cardProduct__size"> 
          <div data-size="S" class="size-item"><p>S</p></div>
          <div data-size="M" class="size-item"><p>M</p></div>
          <div data-size="L" class="size-item"><p>L</p></div>
          <div data-size="XL" class="size-item"><p>XL</p></div>
          <div data-size="XXL" class="size-item"><p>XLL</p></div>
        </div>
      </div>
      <button  class="btn-add-cart ${className}__btn">Agregar</button>
    
    </div>
  </div>`;
};

const cardCategories = (className, {name, url }) =>
  `
  <div data-category="${name}" class="${className}">
    <img src="${url}" alt="">
    <p>${name}</p>
  </div>`;

const displayProducts = (products, className, size, container) => {
  products.map((product) => {
    container.innerHTML += cardsHome(className, size, product);
    loadProductsEvents();
  });
};

const displayCategories = (categories) => {
  const categoriesContainer = document.querySelector("#categoriesContainer");
  categories.map(
    (categorie) =>
      (categoriesContainer.innerHTML += cardCategories(
        "categories__card",
        categorie
      ))
  );
  loadCategoriesEvents();
};
const loadCategoriesEvents = () => {
  const categoryCard = document.querySelectorAll(".categories__card");
  categoryCard.forEach((card) =>
    card.addEventListener("click", () => {
      localStorage.setItem("category", card.dataset.category);
      redirectUrl("products");
    })
  );
};


const loadProductsEvents = () => {
  document.querySelectorAll(".btn-add-cart")
    .forEach(btn => btn.addEventListener("click", handleAddToCart));
    
  document.querySelectorAll(".size-item").forEach(size => {
    size.addEventListener("click", () => {
      size.parentElement.querySelectorAll(".size-item").forEach(item=>
        item !== size && item.classList.remove("size-item--selected"));
      size.classList.add("size-item--selected");
    });
  });
};

export { displayProducts, displayCategories };
