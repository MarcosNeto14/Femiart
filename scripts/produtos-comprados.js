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
  const chatContainer = document.getElementById("chat-container");
  const chatHeader = document.getElementById("chat-header");
  const minimizeChatBtn = document.getElementById("minimize-chat");
  const closeChatBtn = document.getElementById("close-chat");
  const sendChatBtn = document.getElementById("send-chat");
  const chatInput = document.getElementById("chat-input");
  const chatHistory = document.getElementById("chat-history");

  // Mostrar o chat ao clicar no ícone de perfil
  document.querySelector("#icon-perfil").addEventListener("click", () => {
    chatContainer.classList.toggle("chat-visible");
  });

  // Minimizar e maximizar o chat ao clicar na barra do cabeçalho
  chatHeader.addEventListener("click", () => {
    toggleChatMinimize();
  });

  // Minimizar e maximizar o chat ao clicar no botão de minimizar
  minimizeChatBtn.addEventListener("click", (event) => {
    event.stopPropagation(); // Impede a propagação para o cabeçalho
    toggleChatMinimize();
  });

  // Fechar o chat ao clicar no botão de fechar
  closeChatBtn.addEventListener("click", (event) => {
    event.stopPropagation(); // Impede a propagação para o cabeçalho
    chatContainer.classList.remove("chat-visible");
  });

  // Enviar mensagem ao clicar no botão "Enviar"
  sendChatBtn.addEventListener("click", sendMessage);

  // Enviar mensagem ao pressionar a tecla "Enter"
  chatInput.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
      event.preventDefault(); // Evita a quebra de linha
      sendMessage();
    }
  });

  // Função para enviar a mensagem e receber a resposta automática
  function sendMessage() {
    const userMessage = chatInput.value.trim();
    if (userMessage !== "") {
      appendMessage("Você", userMessage);
      chatInput.value = "";

      // Resposta automática da vendedora após 1 segundo
      setTimeout(() => {
        appendMessage("Vendedora", "Obrigada pelo seu contato! Em que posso ajudar?");
      }, 1000);
    }
  }

  // Função para adicionar a mensagem no histórico
  function appendMessage(sender, message) {
    const messageElement = document.createElement("div");
    messageElement.innerHTML = `<strong>${sender}:</strong> ${message}`;
    chatHistory.appendChild(messageElement);
    chatHistory.scrollTop = chatHistory.scrollHeight; // Rolar para o fim do chat
  }

  // Alternar entre minimizar e maximizar o chat
  function toggleChatMinimize() {
    if (chatContainer.classList.contains("chat-maximized")) {
      chatContainer.classList.remove("chat-maximized");
      chatContainer.classList.add("chat-minimized");
    } else {
      chatContainer.classList.remove("chat-minimized");
      chatContainer.classList.add("chat-maximized");
    }
  }

  // Função para filtrar produtos comprados
  function getPurchasedItemsByIds(itemIds) {
    return allProducts.filter((item) => itemIds.includes(item.id));
  }

  const filteredItems = getPurchasedItemsByIds(purchasedItemIds);
  updatePurchases(filteredItems);

  // Limpar os IDs de itens comprados do localStorage
  localStorage.removeItem("purchasedItemIds");
});

loadPurchasedItems();
updatePurchases();
