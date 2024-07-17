document.addEventListener("DOMContentLoaded", () => {
  const categorias = document.querySelectorAll("#list-categorias li");
  const productContainer = document.getElementById("product-container");
  const searchBar = document.getElementById("search-bar");
  const searchInput = document.getElementById("in-pesquisa");

  const todosProdutos = [
    { nome: "Sabonete Artesanal", preco: 12.50, imagem: "../assets/produtos/sabonete.jpg", categoria: "Banho" },
    { nome: "Toalha Bordada", preco: 25.00, imagem: "../assets/produtos/toalha.jpg", categoria: "Banho" },
    { nome: "Panela de Cerâmica", preco: 50.00, imagem: "../assets/produtos/panela.jpg", categoria: "Cozinha" },
    { nome: "Vaso Decorativo", preco: 35.00, imagem: "../assets/produtos/vaso.jpg", categoria: "Jardim e Decoração" },
    { nome: "Travesseiro Confortável", preco: 40.00, imagem: "../assets/produtos/travesseiro.jpg", categoria: "Quarto" },
  ];

  categorias.forEach(categoria => {
    categoria.addEventListener("click", () => {
      categorias.forEach(c => c.classList.remove("active"));
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

    const produtos = categoria === "Todos os Produtos"
      ? todosProdutos
      : obterProdutosPorCategoria(categoria);

    produtos.forEach(produto => {
      const produtoElemento = document.createElement("div");
      produtoElemento.className = "product-card";
      produtoElemento.innerHTML = `
        <img class="product-image" src="${produto.imagem}" alt="${produto.nome}" />
        <div class="product-info">
          <h3 class="product-name">${produto.nome}</h3>
          <p class="product-price">R$ ${produto.preco.toFixed(2)}</p>
        </div>
      `;
      productContainer.appendChild(produtoElemento);
    });
  }

  function exibirProdutosPorPesquisa(query) {
    productContainer.innerHTML = "";

    const produtos = todosProdutos.filter(produto => 
      produto.nome.toLowerCase().includes(query) || 
      produto.categoria.toLowerCase().includes(query)
    );

    produtos.forEach(produto => {
      const produtoElemento = document.createElement("div");
      produtoElemento.className = "product-card";
      produtoElemento.innerHTML = `
        <img class="product-image" src="${produto.imagem}" alt="${produto.nome}" />
        <div class="product-info">
          <h3 class="product-name">${produto.nome}</h3>
          <p class="product-price">R$ ${produto.preco.toFixed(2)}</p>
        </div>
      `;
      productContainer.appendChild(produtoElemento);
    });
  }

  function obterProdutosPorCategoria(categoria) {
    return todosProdutos.filter(produto => produto.categoria === categoria);
  }

  categorias[0].classList.add("active");
  exibirProdutos(categorias[0].getAttribute("data-categoria"));
});
