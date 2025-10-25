import React from "react";
import { Container } from "react-bootstrap";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Button } from 'react-bootstrap';
import CardProduto from "../components/produto.jsx";
import CardExemplo from "../components/produto2.jsx";


export default function Produtos() {
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
                            <Button variant="info">Adicionar Produto</Button>
                        </Col>
                    </Row>
                    <Row className="mt-5 d-flex justify-content-center">
                        <Col md={4}>
                            <CardExemplo
                                title="Produto 1"
                                description="Descrição do Produto 1"
                                imgSrc="/images/produto-1.jpg"
                            />
                        </Col>
                        <Col md={4}>
                            <CardExemplo
                                title="Produto 2"
                                description="Descrição do Produto 2"
                                imgSrc="/images/produto-2.jpg"
                            />
                        </Col>
                        <Col md={4}>
                            <CardExemplo
                                title="Produto 3"
                                description="Descrição do Produto 3"
                                imgSrc="/images/produto-3.jpg"
                            />
                        </Col>
                        <Col md={4}>
                            <CardExemplo
                                title="Produto 4"
                                description="Descrição do Produto 4"
                                imgSrc="/images/produto-3.jpg"
                            />
                        </Col>
                    </Row>
                </Container>
        </div>
    );
}