document.addEventListener("DOMContentLoaded", () => {
  const categorias = document.querySelectorAll("#list-categorias li");
  const productContainer = document.getElementById("product-container");
  const searchBar = document.getElementById("search-bar");
  const searchInput = document.getElementById("in-pesquisa");

  const todosProdutos = [
    {
      nome: "Sabonete Artesanal",
      preco: "R$ 10,00",
      avaliacao: 4.5,
      foto: "../assets/produtos/sabonete.jpg",
      vendedor: "Maria",
      categoria: "Banho",
    },
    {
      nome: "Panela de Barro",
      preco: "R$ 120,00",
      avaliacao: 4.8,
      foto: "../assets/produtos/panela.jpg",
      vendedor: "José",
      categoria: "Cozinha",
    },
    {
      nome: "Toalha de Banho Bordada",
      preco: "R$ 45,00",
      avaliacao: 4.7,
      foto: "../assets/produtos/toalha.jpg",
      vendedor: "Ana",
      categoria: "Banho",
    },
    {
      nome: "Conjunto de Talheres",
      preco: "R$ 80,00",
      avaliacao: 4.6,
      foto: "../assets/produtos/talheres.jpg",
      vendedor: "Carlos",
      categoria: "Cozinha",
    },
    {
      nome: "Vaso de Cerâmica",
      preco: "R$ 60,00",
      avaliacao: 4.5,
      foto: "../assets/produtos/vaso.jpg",
      vendedor: "Fernanda",
      categoria: "Jardim e Decoração",
    },
    {
      nome: "Quadro Decorativo",
      preco: "R$ 150,00",
      avaliacao: 4.9,
      foto: "../assets/produtos/quadro.jpg",
      vendedor: "Lucas",
      categoria: "Jardim e Decoração",
    },
    {
      nome: "Almofada Artesanal",
      preco: "R$ 35,00",
      avaliacao: 4.3,
      foto: "../assets/produtos/almofada.jpg",
      vendedor: "Mariana",
      categoria: "Quarto",
    },
    {
      nome: "Cobertor de Lã",
      preco: "R$ 90,00",
      avaliacao: 4.4,
      foto: "../assets/produtos/cobertor.jpg",
      vendedor: "Roberto",
      categoria: "Quarto",
    },
    {
      nome: "Porta Sabonete",
      preco: "R$ 20,00",
      avaliacao: 4.2,
      foto: "../assets/produtos/porta_sabonete.jpg",
      vendedor: "Elisa",
      categoria: "Banho",
    },
    {
      nome: "Fruteira de Madeira",
      preco: "R$ 100,00",
      avaliacao: 4.6,
      foto: "../assets/produtos/fruteira.jpg",
      vendedor: "Ricardo",
      categoria: "Cozinha",
    },
    {
      nome: "Jardineira Suspensa",
      preco: "R$ 120,00",
      avaliacao: 4.8,
      foto: "../assets/produtos/jardineira.jpg",
      vendedor: "Bianca",
      categoria: "Jardim e Decoração",
    },
    {
      nome: "Espelho Decorativo",
      preco: "R$ 75,00",
      avaliacao: 4.7,
      foto: "../assets/produtos/espelho.jpg",
      vendedor: "Juliana",
      categoria: "Jardim e Decoração",
    },
  ];

  categorias.forEach((categoria) => {
    categoria.addEventListener("click", () => {
      categorias.forEach((c) => c.classList.remove("active"));
      categoria.classList.add("active");
      const categoriaSelecionada = categoria.getAttribute("data-categoria");
      exibirProdutos(categoriaSelecionada);
    });
  });

  searchBar.addEventListener("submit", (event) => {
    event.preventDefault();
    const query = searchInput.value.toLowerCase();
    exibirProdutosPorPesquisa(query);
  });

  function exibirProdutos(categoria) {
    productContainer.innerHTML = "";

    const produtos =
      categoria === "Todos os Produtos"
        ? todosProdutos
        : obterProdutosPorCategoria(categoria);

    produtos.forEach((produto) => {
      const estrelaHtml = gerarEstrelas(produto.avaliacao);

      const produtoElemento = document.createElement("div");
      produtoElemento.className = "product-card";
      produtoElemento.innerHTML = `
        <img class="product-image" src="${produto.foto}" alt="${produto.nome}" />
        <div class="product-info">
          <h3 class="product-name">${produto.nome}</h3>
          <p class="product-price">${produto.preco}</p>
          <p class="product-rating">Avaliação: ${estrelaHtml} ${produto.avaliacao}</p>
          <p class="product-seller">Vendedor: ${produto.vendedor}</p>
          <button class="buy-button">COMPRAR</button>
        </div>
      `;
      productContainer.appendChild(produtoElemento);
    });
  }

  function exibirProdutosPorPesquisa(query) {
    productContainer.innerHTML = "";

    const produtos = todosProdutos.filter(
      (produto) =>
        produto.nome.toLowerCase().includes(query) ||
        produto.categoria.toLowerCase().includes(query)
    );

    produtos.forEach((produto) => {
      const produtoElemento = document.createElement("div");
      produtoElemento.className = "product-card";
      produtoElemento.innerHTML = `
        <img class="product-image" src="${produto.foto}" alt="${produto.nome}" />
        <div class="product-info">
          <h3 class="product-name">${produto.nome}</h3>
          <p class="product-price">${produto.preco}</p>
          <p class="product-rating">Avaliação: ${produto.avaliacao}</p>
          <p class="product-seller">Vendedor: ${produto.vendedor}</p>
          <button class="buy-button">COMPRAR</button>
        </div>
      `;
      productContainer.appendChild(produtoElemento);
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
