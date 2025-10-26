import React from "react";
import { Container } from "react-bootstrap";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Button } from 'react-bootstrap';
import ItemCarrinho from "../components/itemCarrinho.jsx";
import { useState } from "react";
import { getProdutoInCarrinho } from "../api/index.jsx";

function Carrinho() {
    const [itens, setItens] = useState([]);
    
    React.useEffect(() => {
        async function fetchItensCarrinho() {
            const produtosNoCarrinho = [];
            for (let id = 1; id <= 5; id++) {
                const produto = await getProdutoInCarrinho(id);
                if (produto) {
                    produtosNoCarrinho.push(produto);
                }
            }
            setItens(produtosNoCarrinho);
        }
        fetchItensCarrinho();
    }, []);

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
                    {itens.length === 0 ? (
                        <p>Seu carrinho está vazio.</p>
                    ) : (
                        itens.map((item, index) => (
                            <div key={index} className="mb-4">
                                <ItemCarrinho item={item} />
                                {index < itens.length - 1 && <hr />}
                            </div>
                        ))
                    )}
                    </div>
                    <div>
                    <div className="d-flex justify-content-end mt-4">
                        <Button variant="danger" className="me-2">Remover Todos</Button>
                        <Button variant="success">Finalizar Compra</Button>
                    </div>
                    </div>
                </Container>
            </section>
        </div>
    );
}

export default Carrinho;