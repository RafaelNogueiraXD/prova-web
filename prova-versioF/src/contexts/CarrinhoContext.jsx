import { createContext, useContext, useState } from 'react';

// Criar o contexto
const CarrinhoContext = createContext();

// Hook customizado para usar o contexto
export const useCarrinho = () => {
  const context = useContext(CarrinhoContext);
  if (!context) {
    throw new Error('useCarrinho deve ser usado dentro de um CarrinhoProvider');
  }
  return context;
};

// Provider do contexto
export const CarrinhoProvider = ({ children }) => {
  const [itensCarrinho, setItensCarrinho] = useState([]);

  // Função para adicionar item ao carrinho
  const adicionarItem = (produto) => {
    setItensCarrinho(prevItens => {
      // Verificar se o item já existe no carrinho
      const itemExistente = prevItens.find(item => item.id === produto.id);
      
      if (itemExistente) {
        // Se existe, aumentar a quantidade
        return prevItens.map(item =>
          item.id === produto.id
            ? { ...item, quantidade: item.quantidade + 1 }
            : item
        );
      } else {
        // Se não existe, adicionar novo item
        return [...prevItens, { ...produto, quantidade: 1 }];
      }
    });
  };

  // Função para remover item do carrinho
  const removerItem = (produtoId) => {
    setItensCarrinho(prevItens => 
      prevItens.filter(item => item.id !== produtoId)
    );
  };

  // Função para alterar quantidade de um item
  const alterarQuantidade = (produtoId, novaQuantidade) => {
    if (novaQuantidade <= 0) {
      removerItem(produtoId);
      return;
    }

    setItensCarrinho(prevItens =>
      prevItens.map(item =>
        item.id === produtoId
          ? { ...item, quantidade: novaQuantidade }
          : item
      )
    );
  };

  // Função para limpar carrinho
  const limparCarrinho = () => {
    setItensCarrinho([]);
  };

  // Calcular total de itens
  const totalItens = itensCarrinho.reduce((total, item) => total + item.quantidade, 0);

  // Calcular valor total
  const valorTotal = itensCarrinho.reduce((total, item) => {
    return total + (parseFloat(item.valor) * item.quantidade);
  }, 0);

  const value = {
    itensCarrinho,
    adicionarItem,
    removerItem,
    alterarQuantidade,
    limparCarrinho,
    totalItens,
    valorTotal: valorTotal.toFixed(2)
  };

  return (
    <CarrinhoContext.Provider value={value}>
      {children}
    </CarrinhoContext.Provider>
  );
};