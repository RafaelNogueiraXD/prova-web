import React from "react";
import { Container } from "react-bootstrap";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Button } from 'react-bootstrap';

function Carrinho() {
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
                <Container className="bg-light text-dark mt-4 p-4 rounded shadow-lg bg-opacity-75 w-100" >
                    <div className="d-flex flex-column align-items-center justify-content-center ">
                        <h1 className="display-4 mb-4">Carrinho de Compras</h1>
                    </div>
                    <div className="bg-light text-dark p-4 rounded shadow-lg bg-opacity-50 mt-4 ">
                        <Row>
                            <Col xs="auto" className="d-flex flex-column gap-3 justify-content-center">
                                <h2>Nome Produto</h2>
                            </Col>
                            <Col  className="d-flex flex-column gap-3 justify-content-center align-items-center">
                                <p>Descrição do produto </p>
                                
                            </Col>
                            <Col xs="auto" className="d-flex gap-4 justify-content-center align-items-center">
                                <Button variant="outline-danger">-</Button>
                                <p className="mt-3">0</p>
                                <Button variant="outline-success">+</Button>
                                <b>R$ XX,XX</b>
                            </Col>
                        </Row>
                    </div>
                </Container>
            </section>
        </div>
    );
}

export default Carrinho;