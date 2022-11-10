import { menuArray } from "./data.js";

const paymentProcess = document.getElementById("paymentProcess");
const orders = document.getElementById("orders");
const menuContainer = document.getElementById("menu-container");
const orderDetails = document.getElementById("orderDetails");
const totalPrice = document.getElementById("totalPrice");
const errorMsg = document.getElementById("errorMsg");
const confirmation = document.getElementById("confirmation");
var total = 0;
var orderedMenu = [];

document.addEventListener("click", function (e) {
  if (e.target.dataset.id) {
    handleSelectdMenu(e.target.dataset.id);
  } else if (e.target.parentElement.className === "removeBtn") {
    handleRemoveSelectedMenu(e.target.id);
  } else if (e.target.id == "payBtn") {
    paymentProcess.style.display = "flex";
  }
});

paymentProcess.addEventListener("submit", (e) => {
  e.preventDefault();
  let formData = new FormData(paymentProcess);
  if (!formData.get("name")) {
    errorMsg.innerHTML = "Enter your name";
  } else if (!formData.get("cardNo")) {
    errorMsg.innerHTML = "Enter your card number";
  } else if (!formData.get("cvv")) {
    errorMsg.innerHTML = "Enter your cvv";
  } else {
    errorMsg.innerHTML = "";
    paymentProcess.reset();
    paymentProcess.style.display = "none";
    orderDetails.style.display = "none";
    confirmation.style.display = "flex";
  }
});

function render() {
  menuArray.map((menu) => {
    const SingleMenuCard = `
         <div
        class="border-b-2 flex w-full md:w-2/4 justify-between items-center py-12 px-0 mx-auto"
        id="menu-card"
      >
        <div class="flex gap-3 md:gap-8">
          <label class="text-9xl">${menu.emoji}</label>
          <div class="flex flex-col gap-2">
            <h1>${menu.name}</h1>
            <p class="text-gray-500"><span>${menu.ingredients.map(
              (ingredient) => {
                return ingredient;
              }
            )}</span></p>
            <label for="">$${menu.price}</label>
          </div>
        </div>
        <i class="fa-solid fa-circle-plus text-black bg-white" data-id = "${
          menu.id
        }"></i>
      </div>
    `;

    menuContainer.innerHTML += SingleMenuCard;
  });
}

function handleSelectdMenu(menuId) {
  orders.innerHTML = "";
  confirmation.style.display = "none";
  orderDetails.style.display = "flex";
  var selectedMenu = menuArray.filter((menu) => {
    return menu.id == menuId;
  })[0];

  if (orderedMenu.length == 0) {
    orderedMenu.push(selectedMenu);
    total += selectedMenu.price;
  } else {
    let alreadySelectedMenu = orderedMenu.filter((menu) => {
      return menu.id == menuId;
    })[0];
    if (alreadySelectedMenu === undefined) {
      orderedMenu.push(selectedMenu);
      total += selectedMenu.price;
    }
  }

  orderedMenu.map((menu) => {
    orders.innerHTML += `<div class="flex justify-between py-2">
          <label for="" class="removeBtn" >${menu.name} <span class="pl-3 text-gray-600" id = "${menu.id}">Remove</span></label>
          <label for="">${menu.price}</label>
        </div>`;
  });

  totalPrice.innerHTML = total;
}

function handleRemoveSelectedMenu(menuId) {
  orders.innerHTML = "";
  orderedMenu.filter((orders, index) => {
    if (orders.id == menuId) {
      orderedMenu.splice(index, 1);
      total -= orders.price;
    }
  });

  orderedMenu.map((order) => {
    orders.innerHTML += `<div class="flex justify-between py-2">
          <label for="" class="removeBtn" >${order.name} <span class="pl-3 text-gray-600" id = "${order.id}">Remove</span></label>
          <label for="">${order.price}</label>
        </div>`;
  });
  totalPrice.innerHTML = total;
  total == 0 && (orderDetails.style.display = "none");
}

render();
