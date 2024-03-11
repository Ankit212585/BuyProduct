const data = [
  {
    id: 1,
    name: "Invicta Men's Pro Diver",
    img: "https://m.media-amazon.com/images/I/71e04Q53xlL._AC_UY879_.jpg",
    price: 74,
    cat: "Dress",
  },
  {
    id: 11,
    name: "Invicta Men's Pro Diver 2",
    img: "https://m.media-amazon.com/images/I/71e04Q53xlL._AC_UY879_.jpg",
    price: 74,
    cat: "Dress",
  },
  {
    id: 2,
    name: "Timex Men's Expedition Scout ",
    img: "https://m.media-amazon.com/images/I/91WvnZ1g40L._AC_UY879_.jpg",
    price: 40,
    cat: "Sport",
  },
  {
    id: 3,
    name: "Breitling Superocean Heritage",
    img: "https://m.media-amazon.com/images/I/61hGDiWBU8L._AC_UY879_.jpg",
    price: 200,
    cat: "Luxury",
  },
  {
    id: 4,
    name: "Casio Classic Resin Strap ",
    img: "https://m.media-amazon.com/images/I/51Nk5SEBARL._AC_UY879_.jpg",
    price: 16,
    cat: "Sport",
  },
  {
    id: 5,
    name: "Garmin Venu Smartwatch ",
    img: "https://m.media-amazon.com/images/I/51kyjYuOZhL._AC_SL1000_.jpg",
    price: 74,
    cat: "Casual",
  },
];

// Get All the components in HTMl
const productsContainer = document.querySelector(".products");
const SearchInput = document.querySelector(".Search");
const CategoriesContainer = document.querySelector(".cats");
const priceRange = document.querySelector(".priceRange");
const priceValue = document.querySelector(".priceValue");
const payment = document.querySelector(".payment");
const close = document.querySelector(".close");

// display all the products in the screen using map loop
const displayProducts = (filterProducts) => {
  productsContainer.innerHTML = filterProducts
    .map(
      (product) =>
        `<div class="product">
    <img
      src=${product.img}
      alt="logo"
    />
    <span class="name">${product.name}</span>
    <span class="priceText">${product.price}</span>
  </div>`
    )
    .join("");
};
displayProducts(data);

productsContainer.addEventListener("click", () => {
  payment.style.display = "flex";
});

close.addEventListener("click", () => {
  payment.style.display = "none";
});

// add keyup values in search Bar and inclued the display products value
SearchInput.addEventListener("keyup", (e) => {
  const value = e.target.value;

  if (value) {
    displayProducts(
      data.filter((item) => item.name.toLowerCase().indexOf(value) !== -1)
    );
  } else {
    displayProducts(data);
  }
});

// Add categories using map loop
const setCategories = () => {
  const allcats = data.map((item) => item.cat);
  const categories = [
    "All",
    ...allcats.filter((item, i) => {
      return allcats.indexOf(item) === i;
    }),
  ];

  // Add categories using map loop
  CategoriesContainer.innerHTML = categories
    .map((cat) => ` <span class="cat">${cat}</span>`)
    .join("");

  CategoriesContainer.addEventListener("click", (e) => {
    const SelectedCat = e.target.textContent;

    // I'm giving a if condition from selectedCat
    SelectedCat === "All"
      ? displayProducts(data)
      : displayProducts(data.filter((item) => item.cat === SelectedCat));
  });
};

const setPrice = () => {
  const pricelist = data.map((item) => item.price);

  // spread operator help to set the min or max number
  const minPrice = Math.min(...pricelist);
  const maxPrice = Math.max(...pricelist);

  priceRange.min = minPrice;
  priceRange.max = maxPrice;
  priceRange.value = maxPrice;
  priceValue.textContent = "$" + maxPrice;

  // this event listner helps to set the price range

  priceRange.addEventListener("input", (e) => {
    priceValue.textContent = "$" + e.target.value;
    displayProducts(data.filter((item) => item.price <= e.target.value));
  });
};

setCategories();
setPrice();
