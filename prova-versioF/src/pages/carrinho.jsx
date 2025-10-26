import React from "react";
import { Container } from "react-bootstrap";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Button } from 'react-bootstrap';
import ItemCarrinho from "../components/itemCarrinho.jsx";
import { useCarrinho } from "../contexts/CarrinhoContext.jsx";

function Carrinho() {
    const { itensCarrinho, limparCarrinho, valorTotal, totalItens } = useCarrinho();

    return (
        <div
            className="bg-dark text-white min-vh-100"
            style={{
                backgroundImage: 'url("/images/bg-carrinho.jpg")',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                backgroundAttachment: 'fixed'
            }}
        >
            <section className="text-white d-flex flex-column align-items-center justify-content-center p-5">
                <Container className="bg-dark text-light mt-4 p-4 rounded shadow-lg bg-opacity-75 w-100" >
                    <div className="d-flex flex-column align-items-center justify-content-center">
                        <h1 className="display-4 mb-4">Carrinho de Compras</h1>
                    </div>
                    <div className="bg-light text-dark p-4 rounded shadow-lg bg-opacity-60 mt-4 ">
                    {itensCarrinho.length === 0 ? (
                        <div className="text-center p-4">
                            <h4>Seu carrinho está vazio</h4>
                        </div>
                    ) : (
                        <>
                            {itensCarrinho.map((item, index) => (
                                <div key={item.id} className="mb-4">
                                    <ItemCarrinho item={item} />
                                    {index < itensCarrinho.length - 1 && <hr />}
                                </div>
                            ))}
                            <hr className="my-4" />
                            <div className="d-flex justify-content-between align-items-center">
                                <div>
                                    <h5>Total de itens: <span className="text-info">{totalItens}</span></h5>
                                    <h4>Total: <span className="text-success">R$ {valorTotal}</span></h4>
                                </div>
                            </div>
                        </>
                    )}
                    </div>
                    <div>
                    <div className="d-flex justify-content-end mt-4">
                        <Button 
                            variant="danger" 
                            className="me-2"
                            onClick={limparCarrinho}
                            disabled={itensCarrinho.length === 0}
                        >
                            Remover Todos
                        </Button>
                        <Button 
                            variant="success"
                            disabled={itensCarrinho.length === 0}
                        >
                            Finalizar Compra
                        </Button>
                    </div>
                    </div>
                </Container>
            </section>
        </div>
    );
}

export default Carrinho;