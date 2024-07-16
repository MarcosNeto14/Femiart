document.addEventListener("DOMContentLoaded", () => {
  const productContainer = document.getElementById("product-container");
  const categoriasList = document.getElementById("list-categorias");

  // Função para criar o HTML de um produto
  const criarProdutoHTML = (produto) => {
    return `
      <div class="product-card">
        <img src="${produto.foto}" alt="${produto.nome}" class="product-image" />
        <div class="product-info">
          <h3 class="product-name">${produto.nome}</h3>
          <p class="product-price">${produto.preco}</p>
          <p class="product-rating">Avaliação: ${produto.avaliacao}</p>
          <p class="product-seller">Vendedor: ${produto.vendedor}</p>
        </div>
      </div>
    `;
  };

  // Função para exibir produtos de uma categoria específica
  const exibirProdutosPorCategoria = (categoria) => {
    // Remover a classe 'active' de todos os itens da lista de categorias
    const categorias = categoriasList.querySelectorAll("li");
    categorias.forEach(item => item.classList.remove("active"));

    // Adicionar a classe 'active' à categoria selecionada
    const categoriaSelecionada = categoriasList.querySelector(`li[data-categoria="${categoria}"]`);
    categoriaSelecionada.classList.add("active");

    // Limpar o container de produtos
    productContainer.innerHTML = "";

    // Filtrar e exibir os produtos da categoria selecionada
    const produtosFiltrados = produtos.filter(produto => produto.categoria === categoria);
    produtosFiltrados.forEach(produto => {
      productContainer.innerHTML += criarProdutoHTML(produto);
    });
  };

  // Exibir todos os produtos inicialmente
  exibirProdutosPorCategoria("Banho"); // Altere para a categoria desejada

  // Adicionar event listeners para os links de categoria
  const linksCategorias = document.querySelectorAll("#list-categorias li");
  linksCategorias.forEach(link => {
    link.addEventListener("click", () => {
      const categoria = link.dataset.categoria;
      exibirProdutosPorCategoria(categoria);
    });
  });
});
