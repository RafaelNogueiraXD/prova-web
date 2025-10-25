

export async function getProdutos() {
    const response = await fetch('/db.json');
    const data = await response.json();
    return data.produtosDisponiveis;
}

export async function getProdutoById(id) {
    const response = await fetch('/db.json');
    const data = await response.json();
    return data.produtosDisponiveis.find(produto => produto.id === id);
}

export async function criarProduto(produto) {
    const response = await fetch('/db.json');
    const data = await response.json();
    data.produtosDisponiveis.push(produto);
    await fetch('/db.json', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });
    return produto;
}

export async function deletarProduto(id) {
    const response = await fetch('/db.json');
    const data = await response.json();
    data.produtosDisponiveis = data.produtosDisponiveis.filter(produto => produto.id !== id);
    await fetch('/db.json', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });
}
export async function atualizarProduto(id, produtoAtualizado) {
    const response = await fetch('/db.json');
    const data = await response.json();
    const index = data.produtosDisponiveis.findIndex(produto => produto.id === id);
    if (index !== -1) {
        data.produtosDisponiveis[index] = { ...data.produtosDisponiveis[index], ...produtoAtualizado };
        await fetch('/db.json', {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
        return data.produtosDisponiveis[index];
    }   
    return null;
}