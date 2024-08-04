document.addEventListener("DOMContentLoaded", () => {
  const categorias = document.querySelectorAll("#list-categorias li");
  const productContainer = document.getElementById("product-container");
  const searchBar = document.getElementById("search-bar");
  const searchInput = document.getElementById("in-pesquisa");

  const todosProdutos = [
    { nome: "Sabonete Artesanal", preco: "R$ 10,00", avaliacao: 4.5, foto: "../assets/produtos/sabonete.jpg", vendedor: "Maria", categoria: "Banho" },
    { nome: "Panela de Barro", preco: "R$ 120,00", avaliacao: 4.8, foto: "../assets/produtos/panela.jpg", vendedor: "José", categoria: "Cozinha" },
    { nome: "Toalha de Banho Bordada", preco: "R$ 45,00", avaliacao: 4.7, foto: "../assets/produtos/toalha.jpg", vendedor: "Ana", categoria: "Banho" },
    { nome: "Conjunto de Talheres", preco: "R$ 80,00", avaliacao: 4.6, foto: "../assets/produtos/talheres.jpg", vendedor: "Carlos", categoria: "Cozinha" },
    { nome: "Vaso de Cerâmica", preco: "R$ 60,00", avaliacao: 4.5, foto: "../assets/produtos/vaso.jpg", vendedor: "Fernanda", categoria: "Jardim e Decoração" },
    { nome: "Quadro Decorativo", preco: "R$ 150,00", avaliacao: 4.9, foto: "../assets/produtos/quadro.jpg", vendedor: "Lucas", categoria: "Jardim e Decoração" },
    { nome: "Almofada Artesanal", preco: "R$ 35,00", avaliacao: 4.3, foto: "../assets/produtos/almofada.jpg", vendedor: "Mariana", categoria: "Quarto" },
    { nome: "Cobertor de Lã", preco: "R$ 90,00", avaliacao: 4.4, foto: "../assets/produtos/cobertor.jpg", vendedor: "Roberto", categoria: "Quarto" },
    { nome: "Porta Sabonete", preco: "R$ 20,00", avaliacao: 4.2, foto: "../assets/produtos/porta_sabonete.jpg", vendedor: "Elisa", categoria: "Banho" },
    { nome: "Fruteira de Madeira", preco: "R$ 100,00", avaliacao: 4.6, foto: "../assets/produtos/fruteira.jpg", vendedor: "Ricardo", categoria: "Cozinha" },
    { nome: "Jardineira Suspensa", preco: "R$ 120,00", avaliacao: 4.8, foto: "../assets/produtos/jardineira.jpg", vendedor: "Bianca", categoria: "Jardim e Decoração" },
    { nome: "Espelho Decorativo", preco: "R$ 75,00", avaliacao: 4.7, foto: "../assets/produtos/espelho.jpg", vendedor: "Juliana", categoria: "Jardim e Decoração" },
  ];

  categorias.forEach((categoria) => {
    categoria.addEventListener("click", () => {
      categorias.forEach((c) => c.classList.remove("active"));
      categoria.classList.add("active");
      exibirProdutos(categoria.getAttribute("data-categoria"));
    });
  });

  searchBar.addEventListener("submit", (event) => {
    event.preventDefault();
    exibirProdutosPorPesquisa(searchInput.value.toLowerCase());
  });

  function exibirProdutos(categoria) {
    const produtos = categoria === "Todos os Produtos" ? todosProdutos : obterProdutosPorCategoria(categoria);
    atualizarProdutos(produtos);
  }

  function exibirProdutosPorPesquisa(query) {
    const produtos = todosProdutos.filter(
      (produto) =>
        produto.nome.toLowerCase().includes(query) ||
        produto.categoria.toLowerCase().includes(query)
    );
    atualizarProdutos(produtos);
  }

  function atualizarProdutos(produtos) {
    productContainer.innerHTML = "";
    produtos.forEach((produto) => {
      productContainer.appendChild(criarElementoProduto(produto));
    });
    adicionarListenersCompra();
  }

  function criarElementoProduto(produto) {
    const estrelaHtml = gerarEstrelas(produto.avaliacao);
    const produtoElemento = document.createElement("div");
    produtoElemento.className = "product-card";
    produtoElemento.innerHTML = `
      <a href="detalhes-produto.html"><img class="product-image" src="${produto.foto}" alt="${produto.nome}" /></a>
      <div class="product-info">
        <h3 class="product-name"><a href="detalhes-produto.html">${produto.nome}</a></h3>
        <p class="product-price">${produto.preco}</p>
        <p class="product-rating">Avaliação: ${estrelaHtml} ${produto.avaliacao}</p>
        <p class="product-seller">Vendedor: ${produto.vendedor}</p>
        <button class="buy-button">COMPRAR</button>
      </div>
    `;
    return produtoElemento;
  }

  function adicionarListenersCompra() {
    document.querySelectorAll(".buy-button").forEach((button) => {
      button.addEventListener("click", () => {
        window.location.href = "carrinho.html";
      });
    });
  }

  function obterProdutosPorCategoria(categoria) {
    return todosProdutos.filter((produto) => produto.categoria === categoria);
  }

  categorias[0].classList.add("active");
  exibirProdutos(categorias[0].getAttribute("data-categoria"));
});

function gerarEstrelas(avaliacao) {
  const estrelas = Math.floor(avaliacao);
  const meiaEstrela = avaliacao % 1 >= 0.5;
  let estrelasHtml = "";

  for (let i = 0; i < estrelas; i++) {
    estrelasHtml += '<i class="fas fa-star"></i>';
  }

  if (meiaEstrela) {
    estrelasHtml += '<i class="fas fa-star-half-alt"></i>';
  }

  return estrelasHtml;
}
