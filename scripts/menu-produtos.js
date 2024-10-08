import { produtos } from "./produtos.js"; // Certifique-se de que o caminho está correto

document.addEventListener("DOMContentLoaded", () => {
  const categorias = document.querySelectorAll("#list-categorias li");
  const productContainer = document.getElementById("product-container");
  const searchInput = document.getElementById("in-pesquisa");
  const filterButton = document.getElementById("filter-button");
  const filterPanel = document.getElementById("filter-panel");
  const minPriceInput = document.getElementById("min-price");
  const maxPriceInput = document.getElementById("max-price");
  const minRatingInput = document.getElementById("min-rating");

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

  filterButton.addEventListener("click", () => {
    filterPanel.classList.toggle("hidden");
  });

  minPriceInput.addEventListener("input", aplicarFiltros);
  maxPriceInput.addEventListener("input", aplicarFiltros);
  minRatingInput.addEventListener("input", aplicarFiltros);

  function aplicarFiltros() {
    let produtosFiltrados = produtos;

    if (currentCategoria !== "Todos os Produtos") {
      produtosFiltrados = produtosFiltrados.filter(
        (produto) => produto.categoria === currentCategoria
      );
    }

    if (currentSearchQuery) {
      produtosFiltrados = produtosFiltrados.filter(
        (produto) =>
          produto.nome.toLowerCase().includes(currentSearchQuery) ||
          produto.categoria.toLowerCase().includes(currentSearchQuery)
      );
    }

    const minPrice = parseFloat(minPriceInput.value.replace(",", ".")) || 0;
    const maxPrice =
      parseFloat(maxPriceInput.value.replace(",", ".")) || Infinity;

    produtosFiltrados = produtosFiltrados.filter((produto) => {
      const precoNumber = parseFloat(
        produto.preco.replace("R$", "").replace(".", "").replace(",", ".")
      );
      return precoNumber >= minPrice && precoNumber <= maxPrice;
    });

    const minRating = parseFloat(minRatingInput.value.replace(",", ".")) || 0;

    produtosFiltrados = produtosFiltrados.filter(
      (produto) => produto.avaliacao >= minRating
    );

    atualizarProdutos(produtosFiltrados);
  }

  function atualizarProdutos(produtos) {
    productContainer.innerHTML = "";
    if (produtos.length === 0) {
      productContainer.innerHTML =
        "<p>Nenhum produto encontrado com os filtros aplicados.</p>";
      return;
    }
    produtos.forEach((produto) => {
      productContainer.appendChild(criarElementoProduto(produto));
    });
  }

  function criarElementoProduto(produto) {
    const estrelaHtml = gerarEstrelas(produto.avaliacao);
    const produtoElemento = document.createElement("div");
    produtoElemento.className = "product-card";
    
    produtoElemento.innerHTML = `
      <a href="detalhes-produto.html?id=${produto.id}" style="text-decoration: none; color: inherit;">
        <img class="product-image" src="${produto.foto}" alt="${produto.nome}" />
        <div class="product-info">
          <h3 class="product-name">${produto.nome}</h3>
          <p class="product-price">${produto.preco}</p>
          <p class="product-rating">Avaliação: ${estrelaHtml} ${produto.avaliacao}</p>
          <p class="product-seller">Vendedor: ${produto.vendedor}</p>
          <button class="buy-button">COMPRAR</button>
        </div>
      </a>`;
  
    const buyButton = produtoElemento.querySelector(".buy-button");
    buyButton.addEventListener("click", (event) => {
      event.preventDefault(); // Impedir o comportamento padrão do link
  
      // Adicionar o produto ao carrinho
      const product = {
        id: produto.id,
        name: produto.nome,
        price: parseFloat(produto.preco.replace("R$", "").replace(".", "").replace(",", ".")),
        quantity: 1,
        image: produto.foto,
      };
  
      let cart = JSON.parse(localStorage.getItem("cart")) || [];
      const existingProduct = cart.find((item) => item.id === product.id);
  
      if (existingProduct) {
        existingProduct.quantity++;
      } else {
        cart.push(product);
      }
  
      localStorage.setItem("cart", JSON.stringify(cart));
  
      // Exibir notificação de produto adicionado ao carrinho
      showAddToCartNotification();
  
      // Redirecionar para a página de detalhes do produto após um pequeno atraso
      setTimeout(() => {
        window.location.href = `detalhes-produto.html?id=${produto.id}`;
      }, 1000); // 1 segundo para permitir que a notificação seja vista antes do redirecionamento
    });
  
    return produtoElemento;
  }

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

  categorias[0].classList.add("active");
  aplicarFiltros();
  });
  function showAddToCartNotification() {
    const notification = document.createElement("div");
    notification.id = "cart-notification";
    notification.innerText = "Produto adicionado à sacola!";
    document.body.appendChild(notification);

    // Exibir a notificação com um efeito
    setTimeout(() => {
      notification.classList.add("show");
    }, 100); // Delay para a animação aparecer

    // Remover a notificação após 2 segundos
    setTimeout(() => {
      notification.classList.remove("show");
      setTimeout(() => {
        notification.remove(); // Remover do DOM
      }, 500); // Delay para a transição de ocultar
    }, 2000);
  }


document.addEventListener("DOMContentLoaded", displayUserName);
