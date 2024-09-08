import { produtos } from "./produtos.js";

document.addEventListener("DOMContentLoaded", () => {
  const urlParams = new URLSearchParams(window.location.search);
  const idProduto = Number(urlParams.get("id"));

  const produto = produtos.find((produto) => produto.id === idProduto);

  if (produto) {
    document.querySelector(".product-image img").src = produto.foto;
    document.querySelector(".product-info h1").textContent = produto.nome;

    document.querySelector(
      ".product-info .price"
    ).textContent = `Preço: ${produto.preco}`; // Preço

    document.querySelector(".rating").innerHTML = `${gerarEstrelhas(
      produto.avaliacao
    )} ${produto.avaliacao}/5`; // Avaliação

    document.querySelector(".product-info .vendas").textContent = `Vendas: ${produto.vendas}`;

    document.querySelector(".product-info .avaliacao-usuario").textContent = `Avaliação do usuário: ${produto.avaliacaoUsuario}`;

    document.querySelector(
      ".seller"
    ).innerHTML = `Vendido por: <a href="seller.html?seller=${produto.vendedor}">${produto.vendedor}</a>`;
    const addToCartButton = document.querySelector(".add-to-cart");

    addToCartButton.addEventListener("click", () => {
      let cart = JSON.parse(localStorage.getItem("cart")) || [];
    
      let existingItem = cart.find((item) => item.id === produto.id);
    
      const precoConvertido = parseFloat(produto.preco.replace("R$", "").replace(".", "").replace(",", "."));
    
      if (existingItem) {
        existingItem.quantity++;
      } else {
        cart.push({
          id: produto.id,
          name: produto.nome,
          price: precoConvertido,  // Preço correto
          quantity: 1,
          image: produto.foto,
        });
      }
    
      localStorage.setItem("cart", JSON.stringify(cart));
      
      // Mostrar notificação de adição ao carrinho
      showAddToCartNotification();
    });
  }
});

function gerarEstrelhas(avaliacao) {
  const estrelaCheia = Math.floor(avaliacao);
  const temMetadeEstrela = avaliacao % estrelaCheia >= 0.5;

  let htmlEstrels = "";

  for (let i = 0; i < estrelaCheia; i++) {
    htmlEstrels += '<i class="fas fa-star"></i>';
  }

  if (temMetadeEstrela) {
    htmlEstrels += '<i class="fas fa-star-half-alt"></i>';
  }

  return htmlEstrels;
}

function showAddToCartNotification() {
  const notification = document.createElement("div");
  notification.id = "cart-notification";
  notification.innerText = "Produto adicionado à sacola!";
  document.body.appendChild(notification);

  // Exibir a notificação
  setTimeout(() => {
    notification.classList.add("show");
  }, 100);  // Delay para garantir a animação

  // Remover a notificação após 2 segundos
  setTimeout(() => {
    notification.classList.remove("show");
    setTimeout(() => {
      notification.remove();  // Remover do DOM
    }, 500);  // Delay para a transição de ocultar
  }, 2000);
}

