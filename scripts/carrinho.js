// Simulação de dados do carrinho
let cartItems = [
  {
    id: 1,
    name: "Panela de Barro",
    price: 120.0,
    quantity: 2,
    image: "../assets/produtos/panela.jpg",
  },
  {
    id: 2,
    name: "Conjunto de Talheres",
    price: 80.0,
    quantity: 1,
    image: "../assets/produtos/talheres.jpg",
  },
];

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
            <img src="${item.image}" alt="${item.name}">
            <div>
                <h4>${item.name}</h4>
                <p>R$ ${item.price.toFixed(2)}</p>
            </div>
            <div>
                <button class="quantity-btn" onclick="decreaseQuantity(${
                  item.id
                })">-</button>
                <span>${item.quantity}</span>
                <button class="quantity-btn" onclick="increaseQuantity(${
                  item.id
                })">+</button>
            </div>
            <p>R$ ${itemTotal.toFixed(2)}</p>
            <button class="remove-btn" onclick="removeItem(${
              item.id
            })">Remover</button>
        </div>
        `;

    cartContainer.appendChild(cartItem);
  });

  document.getElementById("cart-total").innerText = total.toFixed(2);
}

function decreaseQuantity(id) {
  const item = cartItems.find((item) => item.id === id);
  if (item.quantity > 1) {
    item.quantity--;
  } else {
    removeItem(id);
  }
  updateCart();
}

function increaseQuantity(id) {
  const item = cartItems.find((item) => item.id === id);
  item.quantity++;
  updateCart();
}

function removeItem(id) {
  cartItems = cartItems.filter((item) => item.id !== id);
  updateCart();
}

document.getElementById("checkout-btn").addEventListener("click", () => {
  alert("Compra finalizada!");
});

updateCart();
