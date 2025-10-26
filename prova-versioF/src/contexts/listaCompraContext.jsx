import { createContext, useContext, useState } from "react";
import { useCarrinho } from "./CarrinhoContext.jsx";
const ListaCompraContext = createContext();

export const useListaCompra = () => {
  return useContext(ListaCompraContext);
};

export const ListaCompraProvider = ({ children }) => {
  const [itensListaCompra, setItensListaCompra] = useState([]);
  const { itensCarrinho } = useCarrinho();
  const adicionarItemLista = (itensCarrinho) => {
    console.log("adiciona carrinho a lista de compra");
  };

  return (
    <ListaCompraContext.Provider
      value={{ itensListaCompra, adicionarItemLista }}
    >
      {children}
    </ListaCompraContext.Provider>
  );
};
