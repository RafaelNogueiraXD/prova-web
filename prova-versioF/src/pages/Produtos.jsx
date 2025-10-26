import React from "react";
import { Container } from "react-bootstrap";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Button } from 'react-bootstrap';
import CardProduto from "../components/produto.jsx";
import CardExemplo from "../components/produto2.jsx";
import { FiShoppingCart } from 'react-icons/fi';
import { IoMdAddCircle } from "react-icons/io";
import Modal from 'react-bootstrap/Modal';
import ModalCarrinho from "../components/modalCarrinho.jsx";
import { getProdutos } from "../api/index.jsx";
import { useState, useEffect } from "react";

export default function Produtos() {
      const [modalShow, setModalShow] = React.useState(false);
      const [produtos, setProdutos] = useState([]);
      
      useEffect(() => {
        async function fetchProdutos() {
            const produtosData = await getProdutos();
            setProdutos(produtosData);
            }
        fetchProdutos();
      }, []);
      function adicionarAoCarrinho(id) {
        // Lógica para adicionar o produto ao carrinho
      }
    return (
        <div 
                    className="min-vh-100 d-flex align-items-center justify-content-center"
            style={{
                backgroundImage: 'url("/images/bg-produtos.jpg")',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                backgroundAttachment: 'fixed'
            }}>
                <Container className="bg-dark bg-opacity-75 text-white p-5 rounded shadow-lg d-flex flex-column  justify-content-center">
                    <Row>
                        <Col>
                            <h1>Produtos</h1>
                        </Col>
                        <Col className="d-flex justify-content-end align-items-center">
                            <Button variant="outline-info"  className="me-3" onClick={() => setModalShow(true)}> <FiShoppingCart className="fs-4" /> </Button>
                            
                        </Col>
                    </Row>
                    <Row className="mt-5 d-flex justify-content-start">
                        {produtos.map((produto) => (
                            <Col key={produto.id} xs={12} sm={6} md={4} lg={3} className="d-flex justify-content-center">
                                <CardExemplo
                                    id={produto.id}
                                    titulo={produto.nome}
                                    desc={produto.descricao}
                                    valor={produto.preco.toFixed(2)}
                                    avaliacao={produto.avaliacao}
                                    stars={produto.stars}
                                    imgSrc={produto.imgSrc}
                                />
                            </Col>
                        ))}
                    </Row>
                </Container>
                <ModalCarrinho
                    show={modalShow}
                    onHide={() => setModalShow(false)}
                />
        </div>
    );
}