let userId = localStorage.getItem("userId"); // Supondo que você tenha armazenado o ID do usuário no localStorage
let cartItems = [];
let lastItemIdToRemove = null;

function updateCart() {
  const cartContainer = document.getElementById("cart-items");
  cartContainer.innerHTML = "";

  let total = 0;

  cartItems.forEach((item) => {
    const itemTotal = item.price * item.quantity;
    total += itemTotal;

    const cartItem = document.createElement("div");
    cartItem.classList.add("cart-item");

    cartItem.innerHTML = `
      <img src="${item.image}" alt="${item.name}" class="cart-item-image">
      <div class="cart-item-details">
        <h4>${item.name}</h4>
        <p>${item.price.toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL",
        })}</p>
        <div class="cart-item-quantity">
          <button class="quantity-btn" onclick="decreaseQuantity(${
            item.id
          })">-</button>
          <span>${item.quantity}</span>
          <button class="quantity-btn" onclick="increaseQuantity(${
            item.id
          })">+</button>
        </div>
        <p>${itemTotal.toLocaleString("pt-BR", {
          style: "currency",
          currency: "BRL",
        })}</p>
        <button class="remove-btn" onclick="confirmRemoveItem(${
          item.id
        })">Remover</button>
      </div>
    `;

    cartContainer.appendChild(cartItem);
  });

  document.getElementById("cart-total").innerText = total.toLocaleString(
    "pt-BR",
    { style: "currency", currency: "BRL" }
  );
}

function decreaseQuantity(id) {
  const item = cartItems.find((item) => item.id === id);
  if (item.quantity > 1) {
    item.quantity--;
  } else {
    confirmRemoveItem(id);
  }
  saveCartAndUpdate();
}

function increaseQuantity(id) {
  const item = cartItems.find((item) => item.id === id);
  item.quantity++;
  saveCartAndUpdate();
}

function confirmRemoveItem(id) {
  if (cartItems.length === 1) {
    lastItemIdToRemove = id;
    const confirmModal = document.getElementById("confirmModal");
    confirmModal.style.display = "block";

    document.getElementById("confirmBtn").onclick = function () {
      removeItem(id);
      confirmModal.style.display = "none";
    };

    document.getElementById("cancelBtn").onclick = function () {
      confirmModal.style.display = "none";
    };
  } else {
    removeItem(id);
  }
}

function removeItem(id) {
  cartItems = cartItems.filter((item) => item.id !== id);
  saveCartAndUpdate();
}

function saveCartAndUpdate() {
  localStorage.setItem("cart", JSON.stringify(cartItems));
  updateCart();
}

function checkout() {
  if (cartItems.length === 0) {
    const modal = document.getElementById("emptyCartModal");
    modal.style.display = "block";

    document.querySelector(".close-btn").onclick = function () {
      modal.style.display = "none";
    };

    window.onclick = function (event) {
      if (event.target == modal) {
        modal.style.display = "none";
      }
    };
  } else {
    window.location.href = "pagamento.html";
  }
}

document.getElementById("checkout-btn").addEventListener("click", checkout);

function loadCart() {
  cartItems = JSON.parse(localStorage.getItem("cart")) || [];
  updateCart();
}

loadCart();
