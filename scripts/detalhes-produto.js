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

    document.querySelector(
      ".seller"
    ).innerHTML = `Vendido por: <a href="seller.html?seller=${produto.vendedor}">${produto.vendedor}</a>`; // Vendedor
    // Obtenha o botão da página HTML
    const addToCartButton = document.querySelector(".add-to-cart");

    // Adicione um listener ao evento 'click' do botão
    addToCartButton.addEventListener("click", () => {
      // Primeiro, obtenha o carrinho atual do localStorage
      let cart = JSON.parse(localStorage.getItem("cart")) || [];

      // Em seguida, verifique se o item já está no carrinho
      let existingItem = cart.find((item) => item.id === produto.id);

      if (existingItem) {
        // Se o item já existe, apenas incremente a quantidade
        existingItem.quantity++;
      } else {
        // Se não existe, adicione um novo item ao carrinho
        cart.push({
          id: produto.id,
          name: produto.nome,
          price: parseFloat(produto.preco.replace(/[^0-9.-]+/g, "")),
          quantity: 1,
          image: produto.foto,
        });
      }

      // Finalmente, salve o carrinho atualizado de volta ao localStorage
      localStorage.setItem("cart", JSON.stringify(cart));
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
