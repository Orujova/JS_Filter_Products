const products = document.querySelector(".products");
const search = document.getElementById("search");
const category = document.getElementById("category");
const minPrice = document.getElementById("min_price");
const maxPrice = document.getElementById("max_price");

let data = [];
let categoryFilter = "";
category.addEventListener("change", () => {
  categoryFilter = category.value;
  showData();
});
const showData = () => {
  products.innerHTML = "";
  data.sort((a, b) => a.price - b.price);
  let filteredProducts = data.filter((a) =>
    a.title.toLowerCase().startsWith(search.value.toLowerCase())
  );

  if (+maxPrice.value) {
    filteredProducts = filteredProducts.filter(
      (a) => a.price <= +maxPrice.value
    );
  }
  if (+minPrice.value) {
    filteredProducts = filteredProducts.filter(
      (a) => a.price >= +minPrice.value
    );
  }

  if (!filteredProducts.length) {
    let notFound = document.createElement("h1");
    notFound.classList.add("not__found");
    notFound.textContent = `${search.value} axtarışında heç nə tapılmadı..`;
    products.append(notFound);
    return;
  }

  filteredProducts
    .filter((a) => a.category.includes(categoryFilter))
    .map((a) => {
      console.log(a);
      const product = document.createElement("div");
      product.classList.add("product");
      const productImage = document.createElement("div");
      productImage.classList.add("product__image");
      const photo = document.createElement("img");
      photo.src = a.image;
      productImage.append(photo);
      const productDetails = document.createElement("div");
      productDetails.classList.add("product__details");
      const name = document.createElement("h3");
      name.textContent = a.title.slice(0, 25) + "...";
      const price = document.createElement("h1");
      price.textContent = `$${a.price}`;
      const category = document.createElement("h2");
      category.textContent = a.category.slice(0, 25) + "...";
      productDetails.append(name, price, category);
      product.append(productImage, productDetails);
      products.append(product);
    });
};
search.addEventListener("input", showData);
maxPrice.addEventListener("input", showData);
minPrice.addEventListener("input", showData);
fetch("https://fakestoreapi.com/products")
  .then((res) => res.json())
  .then((responseData) => {
    let categories = responseData.map((a) =>a.category)
    categories = categories.filter((a,b) => b=== categories.indexOf(a))
    categories.map((categorys) => {
      const option = document.createElement("option")
      option.textContent = categorys;
      category.append(option)
    })
    data = responseData;
    showData();
    search.disabled = false;
    category.disabled = false;
    minPrice.disabled = false;
    maxPrice.disabled = false;
  });
