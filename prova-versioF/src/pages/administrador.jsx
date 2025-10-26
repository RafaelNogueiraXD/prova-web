import React from "react";
import { 
  buscarTodosProdutos, 
  criarProduto, 
  atualizarProduto, 
  deletarProduto,
  obterEstatisticasProdutos 
} from "../services/produtoService.js";
import { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import { Card, Button, Modal, Row, Col, Alert, Spinner } from "react-bootstrap";
import FormAdicionaProduto from "../components/formAdicionaProduto.jsx";
import TabelaProdutos from "../components/tabelaProdutos.jsx";
import TesteCRUD from "../components/TesteCRUD.jsx";

export default function Administrador() {
  const [produtos, setProdutos] = useState([]);
  const [produtoParaEditar, setProdutoParaEditar] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState(null);
  const [operacaoLoading, setOperacaoLoading] = useState(false);
  const [showAlert, setShowAlert] = useState({ show: false, message: '', type: 'success' });
  const [estatisticas, setEstatisticas] = useState(null);
  const [abaAtiva, setAbaAtiva] = useState('produtos'); // 'produtos' ou 'testes'

  // Função para mostrar alerts
  const mostrarAlert = (message, type = 'success') => {
    setShowAlert({ show: true, message, type });
    setTimeout(() => {
      setShowAlert({ show: false, message: '', type: 'success' });
    }, 4000);
  };

  // Função para carregar produtos
  const carregarProdutos = async () => {
    try {
      setLoading(true);
      setErro(null);
      const [produtosData, stats] = await Promise.all([
        buscarTodosProdutos(),
        obterEstatisticasProdutos()
      ]);
      setProdutos(produtosData);
      setEstatisticas(stats);
    } catch (error) {
      console.error('Erro ao buscar produtos:', error);
      setErro('Erro ao carregar dados. Verifique se o JSON Server está rodando na porta 3000.');
      mostrarAlert('Erro ao carregar produtos. Verifique a conexão com o servidor.', 'danger');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    carregarProdutos();
  }, []);

  // Função para submeter produto (criar ou editar)
  const handleSubmitProduto = async (dadosProduto) => {
    try {
      setOperacaoLoading(true);
      
      if (produtoParaEditar) {
        // Editar produto existente
        await atualizarProduto(produtoParaEditar.id, dadosProduto);
        mostrarAlert('Produto atualizado com sucesso!');
      } else {
        // Criar novo produto
        await criarProduto(dadosProduto);
        mostrarAlert('Produto cadastrado com sucesso!');
      }
      
      // Recarregar dados
      await carregarProdutos();
      setShowModal(false);
      setProdutoParaEditar(null);
      
    } catch (error) {
      console.error('Erro ao salvar produto:', error);
      mostrarAlert('Erro ao salvar produto. Tente novamente.', 'danger');
    } finally {
      setOperacaoLoading(false);
    }
  };

  // Função para editar produto
  const handleEditarProduto = (produto) => {
    setProdutoParaEditar(produto);
    setShowModal(true);
  };

  // Função para remover produto
  const handleRemoverProduto = async (produtoId) => {
    const confirmar = window.confirm('Tem certeza que deseja remover este produto?');
    
    if (!confirmar) return;

    try {
      setOperacaoLoading(true);
      await deletarProduto(produtoId);
      mostrarAlert('Produto removido com sucesso!', 'warning');
      
      // Recarregar dados
      await carregarProdutos();
      
    } catch (error) {
      console.error('Erro ao remover produto:', error);
      mostrarAlert('Erro ao remover produto. Tente novamente.', 'danger');
    } finally {
      setOperacaoLoading(false);
    }
  };

  // Função para novo produto
  const handleNovoProduto = () => {
    setProdutoParaEditar(null);
    setShowModal(true);
  };

  // Função para cancelar
  const handleCancelar = () => {
    setProdutoParaEditar(null);
    setShowModal(false);
  };
  return (
    <div
      className="bg-dark text-white min-vh-100"
      style={{
        backgroundImage: `url("${
          import.meta.env.BASE_URL
        }images/bg-admin.jpg")`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed",
      }}
    >
      <section className="text-white d-flex flex-column align-items-center justify-content-center p-5">
        <Container>
          <div className="bg-light text-dark mt-4 p-4 rounded shadow-lg bg-opacity-90 w-100">
            <div className="d-flex flex-column align-items-center justify-content-center">
              <h1 className="display-4 mb-4">Área do Administrador</h1>
              
              {/* Navegação por abas */}
              <div className="btn-group mb-4" role="group">
                <Button 
                  variant={abaAtiva === 'produtos' ? 'primary' : 'outline-primary'}
                  onClick={() => setAbaAtiva('produtos')}
                >
                  📦 Gerenciar Produtos
                </Button>
                <Button 
                  variant={abaAtiva === 'testes' ? 'primary' : 'outline-primary'}
                  onClick={() => setAbaAtiva('testes')}
                >
                  🧪 Testar CRUD
                </Button>
              </div>
            </div>

            {/* Alert de feedback */}
            {showAlert.show && (
              <Alert variant={showAlert.type} className="mb-4">
                {showAlert.message}
              </Alert>
            )}

            {/* Loading principal */}
            {loading && (
              <div className="text-center py-5">
                <Spinner animation="border" variant="primary" size="lg" />
                <p className="mt-3">Carregando dados do servidor...</p>
              </div>
            )}

            {/* Erro de conexão */}
            {erro && !loading && (
              <Alert variant="danger" className="mb-4">
                <Alert.Heading>Erro de Conexão</Alert.Heading>
                <p>{erro}</p>
                <Button variant="outline-danger" onClick={carregarProdutos}>
                  Tentar Reconectar
                </Button>
              </Alert>
            )}

            {/* Dashboard - apenas se não houver erro */}
            {!loading && !erro && estatisticas && (
              <Row className="mb-4">
                <Col md={3}>
                  <Card className="text-center">
                    <Card.Body>
                      <Card.Title className="h4 text-primary">{estatisticas.total}</Card.Title>
                      <Card.Text>Total de Produtos</Card.Text>
                    </Card.Body>
                  </Card>
                </Col>
                <Col md={3}>
                  <Card className="text-center">
                    <Card.Body>
                      <Card.Title className="h4 text-success">{estatisticas.emEstoque}</Card.Title>
                      <Card.Text>Em Estoque</Card.Text>
                    </Card.Body>
                  </Card>
                </Col>
                <Col md={3}>
                  <Card className="text-center">
                    <Card.Body>
                      <Card.Title className="h4 text-warning">{estatisticas.noCarrinho}</Card.Title>
                      <Card.Text>No Carrinho</Card.Text>
                    </Card.Body>
                  </Card>
                </Col>
                <Col md={3}>
                  <Card className="text-center">
                    <Card.Body>
                      <Card.Title className="h4 text-info">R$ {estatisticas.precoMedio.toFixed(2)}</Card.Title>
                      <Card.Text>Preço Médio</Card.Text>
                    </Card.Body>
                  </Card>
                </Col>
              </Row>
            )}

            {/* Conteúdo da aba Produtos */}
            {abaAtiva === 'produtos' && !loading && !erro && (
              <div className="bg-white p-4 rounded shadow-lg mt-4">
                <div className="d-flex justify-content-between align-items-center mb-4">
                  <h2>Gerenciamento de Produtos</h2>
                  <Button
                    variant="success"
                    onClick={handleNovoProduto}
                    className="d-flex align-items-center gap-2"
                    disabled={operacaoLoading}
                  >
                    {operacaoLoading ? (
                      <Spinner animation="border" size="sm" />
                    ) : (
                      <span>+</span>
                    )}
                    Novo Produto
                  </Button>
                </div>

                <TabelaProdutos
                  produtos={produtos}
                  onEditar={handleEditarProduto}
                  onRemover={handleRemoverProduto}
                />
              </div>
            )}

            {/* Conteúdo da aba Testes */}
            {abaAtiva === 'testes' && (
              <div className="mt-4">
                <TesteCRUD />
              </div>
            )}
          </div>
        </Container>

        {/* Modal do formulário */}
        <Modal show={showModal} onHide={handleCancelar} size="lg">
          <Modal.Header closeButton>
            <Modal.Title>
              {produtoParaEditar ? "Editar Produto" : "Cadastrar Novo Produto"}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {operacaoLoading && (
              <div className="text-center py-3">
                <Spinner animation="border" variant="primary" />
                <p className="mt-2">Salvando produto...</p>
              </div>
            )}
            <FormAdicionaProduto
              produtoParaEditar={produtoParaEditar}
              onSubmit={handleSubmitProduto}
              onCancelar={handleCancelar}
              disabled={operacaoLoading}
            />
          </Modal.Body>
        </Modal>
      </section>
    </div>
  );
}
