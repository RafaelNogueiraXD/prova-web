const API_BASE_URL = "http://localhost:3000";
const PRODUTOS_ENDPOINT = `${API_BASE_URL}/produtosDisponiveis`;

const cuidaResposta = async (response) => {
  return response.json();
};

const fazRequizicao = async (url, options = {}) => {
  try {
    const response = await fetch(url, {
      headers: {
        "Content-Type": "application/json",
        ...options.headers,
      },
      ...options,
    });
    return cuidaResposta(response);
  } catch (error) {
    console.error("Erro na requisição:", error);
    throw error;
  }
};
export const criarProduto = async (dadosProduto) => {
  const novoProduto = {
    ...dadosProduto,
  };

  return fazRequizicao(PRODUTOS_ENDPOINT, {
    method: "POST",
    body: JSON.stringify(novoProduto),
  });
};

export const buscarTodosProdutos = async () => {
  return fazRequizicao(PRODUTOS_ENDPOINT);
};

export const buscarProdutoPorId = async (id) => {
  return fazRequizicao(`${PRODUTOS_ENDPOINT}/${id}`);
};

export const atualizarProduto = async (id, dadosAtualizados) => {
  return fazRequizicao(`${PRODUTOS_ENDPOINT}/${id}`, {
    method: "PUT",
    body: JSON.stringify(dadosAtualizados),
  });
};

export const deletarProduto = async (id) => {
  return fazRequizicao(`${PRODUTOS_ENDPOINT}/${id}`, {
    method: "DELETE",
  });
};

export const atualizarCamposProduto = async (id, campos) => {
  return fazRequizicao(`${PRODUTOS_ENDPOINT}/${id}`, {
    method: "PATCH",
    body: JSON.stringify(campos),
  });
};

export const fazerBackupProdutos = async () => {
  const produtos = await buscarTodosProdutos();
  const backup = {
    timestamp: new Date().toISOString(),
    produtos,
  };

  localStorage.setItem("backup_produtos", JSON.stringify(backup));

  return backup;
};

export const verificarConexaoServidor = async () => {
  try {
    const response = await fetch(API_BASE_URL);
    return response.ok;
  } catch (error) {
    return false;
  }
};

export const obterEstatisticasProdutos = async () => {
  const produtos = await buscarTodosProdutos();

  return {
    total: produtos.length,
    emEstoque: produtos.filter((p) => p.quantidade > 0).length,
    semEstoque: produtos.filter((p) => p.quantidade === 0).length,
    noCarrinho: produtos.filter((p) => p.noCarrinho).length,
    valorTotalEstoque: produtos.reduce(
      (total, p) => total + p.preco * p.quantidade,
      0
    ),
    precoMedio:
      produtos.length > 0
        ? produtos.reduce((total, p) => total + p.preco, 0) / produtos.length
        : 0,
  };
};

export default {
  criarProduto,
  buscarTodosProdutos,
  buscarProdutoPorId,
  atualizarProduto,
  deletarProduto,
  atualizarCamposProduto,
  fazerBackupProdutos,
  verificarConexaoServidor,
  obterEstatisticasProdutos,
};
