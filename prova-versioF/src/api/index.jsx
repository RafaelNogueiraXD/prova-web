export async function getProdutos() {
    const response = await fetch(`${import.meta.env.BASE_URL}/db.json`);
    const data = await response.json();
    return data.produtosDisponiveis;
}

export async function getProdutoInCarrinho(id) {
    const response = await fetch(`${import.meta.env.BASE_URL}/db.json`);
    const data = await response.json();
    return data.produtosDisponiveis.find(produto => produto.id === id && produto.noCarrinho);
}
