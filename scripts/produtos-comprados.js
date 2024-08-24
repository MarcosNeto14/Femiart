// Simulação de dados dos produtos comprados
let purchasedItems = [
  {
      id: 1,
      name: "Panela de Barro",
      price: 120.0,
      purchaseDate: "20/07/2024",
      vendor: "Loja Artesanatos da Vila",
      deliveryTime: "7 dias úteis",
      status: "Enviado",
      image: "../assets/produtos/panela.jpg",
  },
  {
      id: 2,
      name: "Conjunto de Talheres",
      price: 80.0,
      purchaseDate: "22/07/2024",
      vendor: "Utensílios Gourmet",
      deliveryTime: "5 dias úteis",
      status: "Aguardando Envio",
      image: "../assets/produtos/talheres.jpg",
  },
];

function updatePurchases() {
  const purchaseContainer = document.getElementById("purchase-items");
  purchaseContainer.innerHTML = "";

  let total = 0;

  purchasedItems.forEach((item) => {
      total += item.price;

      const purchaseItem = document.createElement("div");
      purchaseItem.classList.add("cart-item");

      purchaseItem.innerHTML = `
          <img src="${item.image}" alt="${item.name}" class="item-image" style="width: 300px; height: auto; object-fit: cover;">
          <div class="item-details" style="flex: 1; display: flex; flex-direction: column; justify-content: space-between;">
              <h3>${item.name}</h3>
              <p><strong>Data de Compra:</strong> ${item.purchaseDate}</p>
              <p><strong>Vendedora:</strong> ${item.vendor}</p>
              <p><strong>Prazo de Entrega:</strong> ${item.deliveryTime}</p>
              <p><strong>Status:</strong> ${item.status}</p>
              <p><strong>Preço da Compra: R$</strong> ${item.price.toFixed(2)}</p>
              <div class="contact-seller" style="display: flex; align-items: center; margin-top: 10px;">
                  <span style="margin-left: auto; font-size: 12px;">Falar com a vendedora</span>
                  <a href="#" class="chat-icon-container" style="margin-left: 10px;">
                      <img src="../assets/icons/chat.png" alt="Chat" class="chat-icon" style="width: 24px; height: auto;">
                  </a>
              </div>
          </div>
      `;

      purchaseContainer.appendChild(purchaseItem);
  });

  document.getElementById("total-compras").innerText = total.toFixed(2);
}

document.addEventListener('DOMContentLoaded', function() {
  const chatButtons = document.querySelectorAll('.chat-icon-container');
  const chatContainer = document.getElementById('chat-container');
  const minimizeButton = document.getElementById('minimize-chat');
  const closeButton = document.getElementById('close-chat');
  const chatInput = document.getElementById('chat-input');
  const sendButton = document.getElementById('send-chat');
  const chatHistory = document.getElementById('chat-history');
  const chatHeader = document.getElementById('chat-header');

  // Abrir o chat ao clicar em "Falar com a vendedora"
  chatButtons.forEach(button => {
      button.addEventListener('click', () => {
          chatContainer.classList.remove('chat-hidden');
          chatContainer.classList.add('chat-maximized');
      });
  });

  // Minimizar o chat
  minimizeButton.addEventListener('click', () => {
      if (chatContainer.classList.contains('chat-maximized')) {
          chatContainer.classList.remove('chat-maximized');
          chatContainer.classList.add('chat-minimized');
      } else {
          chatContainer.classList.remove('chat-minimized');
          chatContainer.classList.add('chat-maximized');
      }
  });

  // Fechar o chat
  closeButton.addEventListener('click', (event) => {
      event.stopPropagation();
      chatContainer.classList.add('chat-hidden');
      chatContainer.classList.remove('chat-maximized', 'chat-minimized');
  });

  // Enviar mensagem e simular resposta da vendedora
  function sendMessage() {
      const message = chatInput.value.trim();
      if (message) {
          const messageElement = document.createElement('div');
          messageElement.textContent = `Você: ${message}`;
          chatHistory.appendChild(messageElement);
          chatInput.value = '';

          // Simular resposta da vendedora/IA
          setTimeout(() => {
              const responseElement = document.createElement('div');
              responseElement.textContent = 'Vendedora: Olá, tudo bem? Qual seria sua dúvida? E qual o produto em questão?';
              chatHistory.appendChild(responseElement);
              chatHistory.scrollTop = chatHistory.scrollHeight;
          }, 1000);
      }
  }

  sendButton.addEventListener('click', sendMessage);

  // Enviar mensagem ao pressionar "Enter"
  chatInput.addEventListener('keypress', function(event) {
      if (event.key === 'Enter') {
          event.preventDefault();
          sendMessage();
      }
  });

  // Também permitir que o cabeçalho do chat alterne entre minimizar/maximizar
  chatHeader.addEventListener('click', () => {
      minimizeButton.click();
  });
});


updatePurchases();
