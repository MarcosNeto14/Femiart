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
  
  updatePurchases();
  