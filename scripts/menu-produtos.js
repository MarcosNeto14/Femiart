document.addEventListener("DOMContentLoaded", () => {
  const categorias = document.querySelectorAll("#list-categorias li");
  const productContainer = document.getElementById("product-container");
  const searchInput = document.getElementById("in-pesquisa");
  const filterButton = document.getElementById("filter-button");
  const filterPanel = document.getElementById("filter-panel");
  const minPriceInput = document.getElementById("min-price");
  const maxPriceInput = document.getElementById("max-price");
  const minRatingInput = document.getElementById("min-rating");

  const todosProdutos = [
    { id: 1, nome: "Sabonete Artesanal", preco: "R$ 10,00", avaliacao: 4.5, foto: "../assets/produtos/sabonete.jpg", vendedor: "Maria", categoria: "Banho" },
    { id: 2, nome: "Panela de Barro", preco: "R$ 120,00", avaliacao: 4.8, foto: "../assets/produtos/panela.jpg", vendedor: "José", categoria: "Cozinha" },
    { id: 3, nome: "Toalha de Banho Bordada", preco: "R$ 45,00", avaliacao: 4.7, foto: "../assets/produtos/toalha.jpg", vendedor: "Ana", categoria: "Banho" },
    { id: 4, nome: "Conjunto de Talheres", preco: "R$ 80,00", avaliacao: 4.6, foto: "../assets/produtos/talheres.jpg", vendedor: "Carlos", categoria: "Cozinha" },
    { id: 5, nome: "Vaso de Cerâmica", preco: "R$ 60,00", avaliacao: 4.5, foto: "../assets/produtos/vaso.jpg", vendedor: "Fernanda", categoria: "Jardim e Decoração" },
    { id: 6, nome: "Quadro Decorativo", preco: "R$ 150,00", avaliacao: 4.9, foto: "../assets/produtos/quadro.jpg", vendedor: "Lucas", categoria: "Jardim e Decoração" },
    { id: 7, nome: "Almofada Artesanal", preco: "R$ 35,00", avaliacao: 4.3, foto: "../assets/produtos/almofada.jpg", vendedor: "Mariana", categoria: "Quarto" },
    { id: 8, nome: "Cobertor de Lã", preco: "R$ 90,00", avaliacao: 4.4, foto: "../assets/produtos/cobertor.jpg", vendedor: "Roberto", categoria: "Quarto" },
    { id: 9, nome: "Porta Sabonete", preco: "R$ 20,00", avaliacao: 4.2, foto: "../assets/produtos/porta_sabonete.jpg", vendedor: "Elisa", categoria: "Banho" },
    { id: 10, nome: "Fruteira de Madeira", preco: "R$ 100,00", avaliacao: 4.6, foto: "../assets/produtos/fruteira.jpg", vendedor: "Ricardo", categoria: "Cozinha" },
    { id: 11, nome: "Jardineira Suspensa", preco: "R$ 120,00", avaliacao: 4.8, foto: "../assets/produtos/jardineira.jpg", vendedor: "Bianca", categoria: "Jardim e Decoração" },
    { id: 12, nome: "Espelho Decorativo", preco: "R$ 75,00", avaliacao: 4.7, foto: "../assets/produtos/espelho.jpg", vendedor: "Juliana", categoria: "Jardim e Decoração" },
  ];
  
  let currentCategoria = "Todos os Produtos";
  let currentSearchQuery = "";

  categorias.forEach((categoria) => {
    categoria.addEventListener("click", () => {
      categorias.forEach((c) => c.classList.remove("active"));
      categoria.classList.add("active");
      currentCategoria = categoria.getAttribute("data-categoria");
      aplicarFiltros();
    });
  });

  searchInput.addEventListener("input", () => {
    currentSearchQuery = searchInput.value.toLowerCase();
    aplicarFiltros();
  });

  // Toggle filter panel visibility
  filterButton.addEventListener("click", () => {
    filterPanel.classList.toggle("hidden");
  });

  // Apply filters when inputs change
  minPriceInput.addEventListener("input", aplicarFiltros);
  maxPriceInput.addEventListener("input", aplicarFiltros);
  minRatingInput.addEventListener("input", aplicarFiltros);

  function aplicarFiltros() {
    let produtosFiltrados = todosProdutos;

    // Filter by category
    if (currentCategoria !== "Todos os Produtos") {
      produtosFiltrados = produtosFiltrados.filter((produto) => produto.categoria === currentCategoria);
    }

    // Filter by search query
    if (currentSearchQuery) {
      produtosFiltrados = produtosFiltrados.filter(
        (produto) =>
          produto.nome.toLowerCase().includes(currentSearchQuery) ||
          produto.categoria.toLowerCase().includes(currentSearchQuery)
      );
    }

    // Filter by price
    const minPrice = parseFloat(minPriceInput.value.replace(',', '.')) || 0;
    const maxPrice = parseFloat(maxPriceInput.value.replace(',', '.')) || Infinity;

    produtosFiltrados = produtosFiltrados.filter((produto) => {
      const precoNumber = parseFloat(produto.preco.replace('R$', '').replace('.', '').replace(',', '.'));
      return precoNumber >= minPrice && precoNumber <= maxPrice;
    });

    // Filter by rating
    const minRating = parseFloat(minRatingInput.value.replace(',', '.')) || 0;

    produtosFiltrados = produtosFiltrados.filter((produto) => produto.avaliacao >= minRating);

    atualizarProdutos(produtosFiltrados);
  }

  function atualizarProdutos(produtos) {
    productContainer.innerHTML = "";
    if (produtos.length === 0) {
      productContainer.innerHTML = "<p>Nenhum produto encontrado com os filtros aplicados.</p>";
      return;
    }
    produtos.forEach((produto) => {
      productContainer.appendChild(criarElementoProduto(produto));
    });
    // adicionarListenersCompra(); // Not needed as the event listener is added in criarElementoProduto
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

    const buyButton = produtoElemento.querySelector(".buy-button");
    buyButton.addEventListener("click", () => {
        const product = {
            id: produto.id,
            name: produto.nome,
            price: parseFloat(produto.preco.replace('R$', '').replace('.', '').replace(',', '.')),
            quantity: 1,  // Quantidade inicial de 1
            image: produto.foto,
        };

        let cart = JSON.parse(localStorage.getItem('cart')) || [];
        const existingProduct = cart.find(item => item.id === product.id);

        if (existingProduct) {
            existingProduct.quantity++;
        } else {
            cart.push(product);
        }

        localStorage.setItem('cart', JSON.stringify(cart));
        window.location.href = "carrinho.html";
    });

    return produtoElemento;
  }

  categorias[0].classList.add("active");
  aplicarFiltros();
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
