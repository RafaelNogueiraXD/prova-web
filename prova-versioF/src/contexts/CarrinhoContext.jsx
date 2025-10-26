import { createContext, useContext, useState } from 'react';


const CarrinhoContext = createContext();


export const useCarrinho = () => {
  return useContext(CarrinhoContext);
};


export const CarrinhoProvider = ({ children }) => {
  const [itensCarrinho, setItensCarrinho] = useState([]);

  
  const adicionarItem = (produto) => {
    setItensCarrinho(prevItens => {
      
      const itemExistente = prevItens.find(item => item.id === produto.id);
      
      if (itemExistente) {
        
        return prevItens.map(item =>
          item.id === produto.id
            ? { ...item, quantidade: item.quantidade + 1 }
            : item
        );
      } else {
        
        return [...prevItens, { ...produto, quantidade: 1 }];
      }
    });
  };

  
  const removerItem = (produtoId) => {
    setItensCarrinho(prevItens => 
      prevItens.filter(item => item.id !== produtoId)
    );
  };

  
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

  
  const limparCarrinho = () => {
    setItensCarrinho([]);
  };

  
  const totalItens = itensCarrinho.reduce((total, item) => total + item.quantidade, 0);

  
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