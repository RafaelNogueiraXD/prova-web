import { useState } from 'react'
import {
  BrowserRouter,
  Routes,
  Route,
  Link
} from "react-router-dom";
import 'bootstrap/dist/css/bootstrap.min.css';
import { CarrinhoProvider } from './contexts/CarrinhoContext.jsx';
import CollapsibleExample from './components/Nav2.jsx';
import Home from './pages/home.jsx';
import Carrinho from './pages/carrinho.jsx';
import Administrador from './pages/administrador.jsx';
import Produtos from './pages/Produtos.jsx';
import NotFound from './pages/notFound.jsx';
function App() {

  return (
    <CarrinhoProvider>
      <BrowserRouter basename='/prova-web-2.github.io/'>
        <CollapsibleExample />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/carrinho" element={<Carrinho />} />
          <Route path="/admin" element={<Administrador />} />
          <Route path="/produtos" element={<Produtos />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </CarrinhoProvider>
  )
}

export default App
