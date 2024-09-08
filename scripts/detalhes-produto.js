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
