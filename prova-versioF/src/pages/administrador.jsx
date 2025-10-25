import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button, Table, Modal, Form, Alert, Card, Spinner } from 'react-bootstrap';
import { getProdutos, criarProduto, atualizarProduto, deletarProduto } from '../api/index.jsx';

function Administrador() {
    const [produtos, setProdutos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showModal, setShowModal] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);
    const [produtoEditando, setProdutoEditando] = useState(null);
    const [produtoParaDeletar, setProdutoParaDeletar] = useState(null);
    const [alert, setAlert] = useState({ show: false, message: '', variant: '' });
    const [formData, setFormData] = useState({
        nome: '',
        descricao: '',
        preco: '',
        estoque: ''
    });

    // Carregar produtos na inicialização
    useEffect(() => {
        carregarProdutos();
    }, []);

    const carregarProdutos = async () => {
        try {
            setLoading(true);
            const data = await getProdutos();
            setProdutos(data);
        } catch (error) {
            mostrarAlert('Erro ao carregar produtos', 'danger');
        } finally {
            setLoading(false);
        }
    };

    const mostrarAlert = (message, variant) => {
        setAlert({ show: true, message, variant });
        setTimeout(() => setAlert({ show: false, message: '', variant: '' }), 3000);
    };

    const abrirModalNovo = () => {
        setProdutoEditando(null);
        setFormData({ nome: '', descricao: '', preco: '', estoque: '' });
        setShowModal(true);
    };

    const abrirModalEdicao = (produto) => {
        setProdutoEditando(produto);
        setFormData({
            nome: produto.nome,
            descricao: produto.descricao,
            preco: produto.preco.toString(),
            estoque: produto.estoque.toString()
        });
        setShowModal(true);
    };

    const abrirModalDeletar = (produto) => {
        setProdutoParaDeletar(produto);
        setShowDeleteModal(true);
    };

    const fecharModais = () => {
        setShowModal(false);
        setShowDeleteModal(false);
        setProdutoEditando(null);
        setProdutoParaDeletar(null);
        setFormData({ nome: '', descricao: '', preco: '', estoque: '' });
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const salvarProduto = async (e) => {
        e.preventDefault();
        
        // Validação básica
        if (!formData.nome || !formData.descricao || !formData.preco || !formData.estoque) {
            mostrarAlert('Todos os campos são obrigatórios', 'warning');
            return;
        }

        if (parseFloat(formData.preco) <= 0 || parseInt(formData.estoque) < 0) {
            mostrarAlert('Preço deve ser maior que 0 e estoque não pode ser negativo', 'warning');
            return;
        }

        try {
            const dadosProduto = {
                nome: formData.nome,
                descricao: formData.descricao,
                preco: parseFloat(formData.preco),
                estoque: parseInt(formData.estoque)
            };

            if (produtoEditando) {
                await atualizarProduto(produtoEditando.id, dadosProduto);
                mostrarAlert('Produto atualizado com sucesso!', 'success');
            } else {
                await criarProduto(dadosProduto);
                mostrarAlert('Produto criado com sucesso!', 'success');
            }

            await carregarProdutos();
            fecharModais();
        } catch (error) {
            mostrarAlert('Erro ao salvar produto', 'danger');
        }
    };

    const confirmarDeletar = async () => {
        try {
            await deletarProduto(produtoParaDeletar.id);
            mostrarAlert('Produto deletado com sucesso!', 'success');
            await carregarProdutos();
            fecharModais();
        } catch (error) {
            mostrarAlert('Erro ao deletar produto', 'danger');
        }
    };

    return (
        <Container fluid className="py-4">
            <Row className="mb-4">
                <Col>
                    <Card className="shadow-sm">
                        <Card.Header className="bg-primary text-white">
                            <h2 className="mb-0">Painel do Administrador</h2>
                        </Card.Header>
                        <Card.Body>
                            <div className="d-flex justify-content-between align-items-center mb-3">
                                <h4 className="mb-0">Gerenciar Produtos</h4>
                                <Button variant="success" onClick={abrirModalNovo}>
                                    + Novo Produto
                                </Button>
                            </div>

                            {alert.show && (
                                <Alert variant={alert.variant} dismissible onClose={() => setAlert({show: false})}>
                                    {alert.message}
                                </Alert>
                            )}

                            {loading ? (
                                <div className="text-center py-4">
                                    <Spinner animation="border" role="status">
                                        <span className="visually-hidden">Carregando...</span>
                                    </Spinner>
                                </div>
                            ) : (
                                <Table striped bordered hover responsive>
                                    <thead className="table-dark">
                                        <tr>
                                            <th>ID</th>
                                            <th>Nome</th>
                                            <th>Descrição</th>
                                            <th>Preço</th>
                                            <th>Estoque</th>
                                            <th>Ações</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {produtos.length === 0 ? (
                                            <tr>
                                                <td colSpan="6" className="text-center">
                                                    Nenhum produto cadastrado
                                                </td>
                                            </tr>
                                        ) : (
                                            produtos.map((produto) => (
                                                <tr key={produto.id}>
                                                    <td>{produto.id}</td>
                                                    <td>{produto.nome}</td>
                                                    <td>{produto.descricao}</td>
                                                    <td>R$ {produto.preco.toFixed(2)}</td>
                                                    <td>{produto.estoque}</td>
                                                    <td>
                                                        <Button 
                                                            variant="outline-primary" 
                                                            size="sm" 
                                                            className="me-2"
                                                            onClick={() => abrirModalEdicao(produto)}
                                                        >
                                                            Editar
                                                        </Button>
                                                        <Button 
                                                            variant="outline-danger" 
                                                            size="sm"
                                                            onClick={() => abrirModalDeletar(produto)}
                                                        >
                                                            Deletar
                                                        </Button>
                                                    </td>
                                                </tr>
                                            ))
                                        )}
                                    </tbody>
                                </Table>
                            )}
                        </Card.Body>
                    </Card>
                </Col>
            </Row>

            {/* Modal para Criar/Editar Produto */}
            <Modal show={showModal} onHide={fecharModais} size="lg">
                <Modal.Header closeButton>
                    <Modal.Title>
                        {produtoEditando ? 'Editar Produto' : 'Novo Produto'}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form onSubmit={salvarProduto}>
                        <Row>
                            <Col md={6}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Nome do Produto</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name="nome"
                                        value={formData.nome}
                                        onChange={handleInputChange}
                                        placeholder="Digite o nome do produto"
                                        required
                                    />
                                </Form.Group>
                            </Col>
                            <Col md={6}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Preço (R$)</Form.Label>
                                    <Form.Control
                                        type="number"
                                        step="0.01"
                                        name="preco"
                                        value={formData.preco}
                                        onChange={handleInputChange}
                                        placeholder="0.00"
                                        required
                                    />
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Col md={12}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Descrição</Form.Label>
                                    <Form.Control
                                        as="textarea"
                                        rows={3}
                                        name="descricao"
                                        value={formData.descricao}
                                        onChange={handleInputChange}
                                        placeholder="Digite a descrição do produto"
                                        required
                                    />
                                </Form.Group>
                            </Col>
                        </Row>
                        <Row>
                            <Col md={6}>
                                <Form.Group className="mb-3">
                                    <Form.Label>Estoque</Form.Label>
                                    <Form.Control
                                        type="number"
                                        name="estoque"
                                        value={formData.estoque}
                                        onChange={handleInputChange}
                                        placeholder="0"
                                        required
                                    />
                                </Form.Group>
                            </Col>
                        </Row>
                        <div className="d-flex justify-content-end gap-2">
                            <Button variant="secondary" onClick={fecharModais}>
                                Cancelar
                            </Button>
                            <Button variant="primary" type="submit">
                                {produtoEditando ? 'Atualizar' : 'Criar'} Produto
                            </Button>
                        </div>
                    </Form>
                </Modal.Body>
            </Modal>

            {/* Modal de Confirmação para Deletar */}
            <Modal show={showDeleteModal} onHide={fecharModais}>
                <Modal.Header closeButton>
                    <Modal.Title>Confirmar Exclusão</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    Tem certeza que deseja deletar o produto <strong>{produtoParaDeletar?.nome}</strong>?
                    <br />
                    Esta ação não pode ser desfeita.
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={fecharModais}>
                        Cancelar
                    </Button>
                    <Button variant="danger" onClick={confirmarDeletar}>
                        Deletar
                    </Button>
                </Modal.Footer>
            </Modal>
        </Container>
    );
}

export default Administrador;
