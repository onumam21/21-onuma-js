document.addEventListener("DOMContentLoaded", () => {
  document
    .getElementById("createProduct")
    .addEventListener("click", addProduct);
  document.getElementById("addToOrder").addEventListener("click", addToOrder);
  document.getElementById("cancelOrder").addEventListener("click", cancelOrder);
});

function addProduct() {
  const productName = document.getElementById("pName").value;
  const productPrice = document.getElementById("price").value;
  const productImage = document.getElementById("imgURL").value;

  if (productName === "" || productPrice === "" || productImage === "") {
    alert("Please fill out all fields.");
    return;
  }

  const productDashboard = document.getElementById("productDashboard");

  const productCard = document.createElement("div");
  productCard.className = "product-card";

  const img = document.createElement("img");
  img.src = productImage;
  img.alt = productName;
  img.width = 100;

  const name = document.createElement("p");
  name.textContent = "Name: " + productName;

  const price = document.createElement("p");
  price.textContent = "Price: ฿" + productPrice;

  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.className = "product-checkbox";

  productCard.appendChild(img);
  productCard.appendChild(name);
  productCard.appendChild(price);
  productCard.appendChild(checkbox);

  productDashboard.appendChild(productCard);

  document.getElementById("pName").value = "";
  document.getElementById("price").value = "";
  document.getElementById("imgURL").value = "";
}

function addToOrder() {
  const productCards = document.querySelectorAll(".product-card");
  const orderList = document.getElementById("orderList");
  orderList.innerHTML;

  productCards.forEach((card) => {
    const checkbox = card.querySelector(".product-checkbox");
    if (checkbox.checked) {
      const orderItem = document.createElement("div");
      orderItem.className = "order-item";

      const img = card.querySelector("img").cloneNode(true);
      const name = card.querySelector("p").cloneNode(true);
      const price = card.querySelectorAll("p")[1].cloneNode(true);

      const quantityInput = document.createElement("input");
      quantityInput.type = "number";
      quantityInput.value = 1;
      quantityInput.min = 1;
      quantityInput.className = "quantity-input";
      quantityInput.addEventListener("input", updateTotalPrice);

      const removeButton = document.createElement("button");
      removeButton.textContent = "Remove";
      removeButton.addEventListener("click", () => {
        orderList.removeChild(orderItem);
        updateTotalPrice();
      });

      orderItem.appendChild(img);
      orderItem.appendChild(name);
      orderItem.appendChild(price);
      orderItem.appendChild(quantityInput);
      orderItem.appendChild(removeButton);

      orderList.appendChild(orderItem);
    }
  });
}
