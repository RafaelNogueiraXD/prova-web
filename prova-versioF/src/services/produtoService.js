// services/produtoService.js
// Arquivo centralizado com todas as operações CRUD para produtos

const API_BASE_URL = 'http://localhost:3000';
const PRODUTOS_ENDPOINT = `${API_BASE_URL}/produtosDisponiveis`;

// Função auxiliar para tratar erros das requisições
const handleResponse = async (response) => {
  if (!response.ok) {
    throw new Error(`Erro na requisição: ${response.status} - ${response.statusText}`);
  }
  return response.json();
};

// Função auxiliar para fazer requisições
const makeRequest = async (url, options = {}) => {
  try {
    const response = await fetch(url, {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    });
    return handleResponse(response);
  } catch (error) {
    console.error('Erro na requisição:', error);
    throw error;
  }
};

// ========== OPERAÇÕES CRUD ==========

// CREATE - Criar novo produto
export const criarProduto = async (dadosProduto) => {
  const novoProduto = {
    ...dadosProduto,
    // O JSON Server gerará automaticamente o ID
  };

  return makeRequest(PRODUTOS_ENDPOINT, {
    method: 'POST',
    body: JSON.stringify(novoProduto),
  });
};

// READ - Buscar todos os produtos
export const buscarTodosProdutos = async () => {
  return makeRequest(PRODUTOS_ENDPOINT);
};

// READ - Buscar produto por ID
export const buscarProdutoPorId = async (id) => {
  return makeRequest(`${PRODUTOS_ENDPOINT}/${id}`);
};

// UPDATE - Atualizar produto existente
export const atualizarProduto = async (id, dadosAtualizados) => {
  return makeRequest(`${PRODUTOS_ENDPOINT}/${id}`, {
    method: 'PUT',
    body: JSON.stringify(dadosAtualizados),
  });
};

// DELETE - Deletar produto
export const deletarProduto = async (id) => {
  return makeRequest(`${PRODUTOS_ENDPOINT}/${id}`, {
    method: 'DELETE',
  });
};

// ========== OPERAÇÕES ADICIONAIS ==========

// Buscar produtos com filtros (exemplo: por categoria, preço, etc.)
export const buscarProdutosFiltrados = async (filtros = {}) => {
  const searchParams = new URLSearchParams();
  
  Object.entries(filtros).forEach(([key, value]) => {
    if (value !== undefined && value !== null && value !== '') {
      searchParams.append(key, value);
    }
  });

  const url = searchParams.toString() 
    ? `${PRODUTOS_ENDPOINT}?${searchParams.toString()}`
    : PRODUTOS_ENDPOINT;

  return makeRequest(url);
};

// Buscar produtos por nome (pesquisa)
export const buscarProdutosPorNome = async (nome) => {
  return makeRequest(`${PRODUTOS_ENDPOINT}?nome_like=${encodeURIComponent(nome)}`);
};

// Atualizar apenas campos específicos de um produto (PATCH)
export const atualizarCamposProduto = async (id, campos) => {
  return makeRequest(`${PRODUTOS_ENDPOINT}/${id}`, {
    method: 'PATCH',
    body: JSON.stringify(campos),
  });
};

// Marcar/desmarcar produto no carrinho
export const alterarStatusCarrinho = async (id, noCarrinho) => {
  return atualizarCamposProduto(id, { noCarrinho });
};

// Atualizar quantidade em estoque
export const atualizarEstoque = async (id, novaQuantidade) => {
  return atualizarCamposProduto(id, { quantidade: novaQuantidade });
};

// ========== OPERAÇÕES DE BACKUP/RESTORE ==========

// Fazer backup de todos os produtos
export const fazerBackupProdutos = async () => {
  const produtos = await buscarTodosProdutos();
  const backup = {
    timestamp: new Date().toISOString(),
    produtos,
  };
  
  // Salvar no localStorage como backup local
  localStorage.setItem('backup_produtos', JSON.stringify(backup));
  
  return backup;
};

// Restaurar produtos do backup
export const restaurarBackupProdutos = async (backupData) => {
  if (!backupData || !backupData.produtos) {
    throw new Error('Dados de backup inválidos');
  }

  // Limpar produtos existentes e recriar
  const produtosAtuais = await buscarTodosProdutos();
  
  // Deletar todos os produtos atuais
  await Promise.all(
    produtosAtuais.map(produto => deletarProduto(produto.id))
  );

  // Criar produtos do backup
  const produtosRestaurados = await Promise.all(
    backupData.produtos.map(produto => {
      const { id, ...dadosSemId } = produto; // Remover ID para deixar o JSON Server gerar novo
      return criarProduto(dadosSemId);
    })
  );

  return produtosRestaurados;
};

// ========== UTILITÁRIOS ==========

// Verificar se o JSON Server está rodando
export const verificarConexaoServidor = async () => {
  try {
    const response = await fetch(API_BASE_URL);
    return response.ok;
  } catch (error) {
    return false;
  }
};

// Obter estatísticas dos produtos
export const obterEstatisticasProdutos = async () => {
  const produtos = await buscarTodosProdutos();
  
  return {
    total: produtos.length,
    emEstoque: produtos.filter(p => p.quantidade > 0).length,
    semEstoque: produtos.filter(p => p.quantidade === 0).length,
    noCarrinho: produtos.filter(p => p.noCarrinho).length,
    valorTotalEstoque: produtos.reduce((total, p) => total + (p.preco * p.quantidade), 0),
    precoMedio: produtos.length > 0 ? produtos.reduce((total, p) => total + p.preco, 0) / produtos.length : 0,
  };
};

// Exportações padrão para compatibilidade
export default {
  criarProduto,
  buscarTodosProdutos,
  buscarProdutoPorId,
  atualizarProduto,
  deletarProduto,
  buscarProdutosFiltrados,
  buscarProdutosPorNome,
  atualizarCamposProduto,
  alterarStatusCarrinho,
  atualizarEstoque,
  fazerBackupProdutos,
  restaurarBackupProdutos,
  verificarConexaoServidor,
  obterEstatisticasProdutos,
};