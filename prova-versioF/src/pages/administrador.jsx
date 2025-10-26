import React from "react";
import { getProdutos } from "../api";
import { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import { Card, Button, Modal, Row, Col } from "react-bootstrap";
import FormAdicionaProduto from "../components/formAdicionaProduto.jsx";
import TabelaProdutos from "../components/tabelaProdutos.jsx";

export default function Administrador() {
    const [produtos, setProdutos] = useState([]);
    const [produtoParaEditar, setProdutoParaEditar] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [proximoId, setProximoId] = useState(1);

    useEffect(() => {
        async function fetchProdutos() {
            const produtosData = await getProdutos();
            setProdutos(produtosData);
            if (produtosData.length > 0) {
                const maxId = Math.max(...produtosData.map(p => p.id));
                setProximoId(maxId + 1);
            }
        }
        fetchProdutos();
    }, []);

    const cadastraProduto = (dadosProduto) => {
        if (produtoParaEditar) {
            setProdutos(prev => 
                prev.map(p => 
                    p.id === produtoParaEditar.id ? { ...dadosProduto, id: produtoParaEditar.id } : p
                )
            );
            setProdutoParaEditar(null);
        } else {
            const novoProduto = {...dadosProduto,id: proximoId};
            setProdutos(prev => [...prev, novoProduto]);
            setProximoId(prev => prev + 1);
        }
        setShowModal(false);
    };

    const editarProduto = (produto) => {
        setProdutoParaEditar(produto);
        setShowModal(true);
    };

    const removerProduto = (produtoId) => {
        setProdutos(prev => prev.filter(p => p.id !== produtoId));
    };

    const novoProduto = () => {
        setProdutoParaEditar(null);
        setShowModal(true);
    };

    const cancelar = () => {
        setProdutoParaEditar(null);
        setShowModal(false);
    };
    return (
        <div
            className="bg-dark text-white min-vh-100"
            style={{
                backgroundImage: 'url("/images/bg-admin.jpg")',
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
                backgroundAttachment: 'fixed'
            }}
        >
            <section className="text-white d-flex flex-column align-items-center justify-content-center p-5">
                <Container>
                    <div className="bg-light text-dark mt-4 p-4 rounded shadow-lg bg-opacity-90 w-100">
                        <div className="d-flex flex-column align-items-center justify-content-center">
                            <h1 className="display-4 mb-4">Área do Administrador</h1>
                        </div>

                        <Row className="mb-4">
                            <Col md={12}>
                                <Card className="text-center">
                                    <Card.Body>
                                        <Card.Title className="h4 text-primary">{produtos.length}</Card.Title>
                                        <Card.Text>Total de Produtos</Card.Text>
                                    </Card.Body>
                                </Card>
                            </Col>
                        </Row>

                        <div className="bg-white p-4 rounded shadow-lg mt-4">
                            <div className="d-flex justify-content-between align-items-center mb-4">
                                <h2>Gerenciamento de Produtos</h2>
                                <Button 
                                    variant="success" 
                                    onClick={novoProduto}
                                    className="d-flex align-items-center gap-2"
                                >
                                    <span>+</span> Novo Produto
                                </Button>
                            </div>
                            

                            <TabelaProdutos 
                                produtos={produtos}
                                onEditar={editarProduto}
                                onRemover={removerProduto}
                            />
                        </div>
                    </div>
                </Container>

    
                <Modal show={showModal} onHide={cancelar} size="lg">
                    <Modal.Header closeButton>
                        <Modal.Title>
                            {produtoParaEditar ? 'Editar Produto' : 'Cadastrar Novo Produto'}
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <FormAdicionaProduto 
                            produtoParaEditar={produtoParaEditar}
                            onSubmit={cadastraProduto}
                            onCancelar={cancelar}
                        />
                    </Modal.Body>
                </Modal>
            </section>
        </div>
    );
}