import { allProducts } from "./produtos-status-compra.js";

let purchasedItems = [];

function updatePurchases() {
  const purchaseContainer = document.getElementById("purchase-items");
  purchaseContainer.innerHTML = "";

  let total = 0;

  purchasedItems.forEach((item) => {
    total += item.price;

    const purchaseItem = document.createElement("div");
    purchaseItem.classList.add("cart-item");

    purchaseItem.innerHTML = `
            <img src="${item.image}" alt="${
      item.name
    }" class="item-image" style="width: 300px; height: auto; object-fit: cover;">
            <div class="item-details">
                <h4>${item.name}</h4>
                <p>${item.price.toLocaleString("pt-BR", {
                  style: "currency",
                  currency: "BRL",
                })}</p>
                <p>Data da Compra: ${item.purchaseDate}</p>
                <p>Vendedor: ${item.vendor}</p>
                <p>Tempo de Entrega: ${item.deliveryTime}</p>
                <p>Status: ${item.status}</p>
            </div>
        `;

    purchaseContainer.appendChild(purchaseItem);
  });

  document.getElementById("total-compras").innerText = total.toLocaleString(
    "pt-BR",
    { style: "currency", currency: "BRL" }
  );
}

function loadPurchasedItems() {
  const purchasedItemIds =
    JSON.parse(localStorage.getItem("purchasedItemIds")) || [];

  // Filtra os produtos não entregues para exibição
  purchasedItems = allProducts.filter((item) =>
    purchasedItemIds.includes(item.id)
  );
  updatePurchases();
}

document.addEventListener("DOMContentLoaded", function () {
  loadPurchasedItems();
  const chatButtons = document.querySelectorAll(".chat-icon-container");
  const chatContainer = document.getElementById("chat-container");
  const minimizeButton = document.getElementById("minimize-chat");
  const closeButton = document.getElementById("close-chat");
  const chatInput = document.getElementById("chat-input");
  const sendButton = document.getElementById("send-chat");
  const chatHistory = document.getElementById("chat-history");
  const chatHeader = document.getElementById("chat-header");

  const purchasedItemIds =
    JSON.parse(localStorage.getItem("purchasedItemIds")) || [];

  // Abrir o chat ao clicar em "Falar com a vendedora"
  chatButtons.forEach((button) => {
    button.addEventListener("click", () => {
      chatContainer.classList.remove("chat-hidden");
      chatContainer.classList.add("chat-maximized");
    });
  });

  // Minimizar o chat
  minimizeButton.addEventListener("click", () => {
    if (chatContainer.classList.contains("chat-maximized")) {
      chatContainer.classList.remove("chat-maximized");
      chatContainer.classList.add("chat-minimized");
    } else {
      chatContainer.classList.remove("chat-minimized");
      chatContainer.classList.add("chat-maximized");
    }
  });

  // Fechar o chat
  closeButton.addEventListener("click", (event) => {
    event.stopPropagation();
    chatContainer.classList.add("chat-hidden");
    chatContainer.classList.remove("chat-maximized", "chat-minimized");
  });

  // Enviar mensagem e simular resposta da vendedora
  function sendMessage() {
    const message = chatInput.value.trim();
    if (message) {
      const messageElement = document.createElement("div");
      messageElement.textContent = `Você: ${message}`;
      chatHistory.appendChild(messageElement);
      chatInput.value = "";

      // Simular resposta da vendedora/IA
      setTimeout(() => {
        const responseElement = document.createElement("div");
        responseElement.textContent =
          "Vendedora: Olá, tudo bem? Qual seria sua dúvida? E qual o produto em questão?";
        chatHistory.appendChild(responseElement);
        chatHistory.scrollTop = chatHistory.scrollHeight;
      }, 1000);
    }
  }

  sendButton.addEventListener("click", sendMessage);

  // Enviar mensagem ao pressionar "Enter"
  chatInput.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
      event.preventDefault();
      sendMessage();
    }
  });

  // Também permitir que o cabeçalho do chat alterne entre minimizar/maximizar
  chatHeader.addEventListener("click", () => {
    minimizeButton.click();
  });

  // Função para filtrar produtos comprados
  function getPurchasedItemsByIds(itemIds) {
    return allProducts.filter((item) => itemIds.includes(item.id));
  }

  const filteredItems = getPurchasedItemsByIds(purchasedItemIds);
  updatePurchases(filteredItems);

  // Limpar os IDs de itens comprados do localStorage
  localStorage.removeItem("purchasedItemIds");
});

updatePurchases();
