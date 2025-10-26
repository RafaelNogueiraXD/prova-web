import React from "react";
import {
  buscarTodosProdutos,
  criarProduto,
  atualizarProduto,
  deletarProduto,
  obterEstatisticasProdutos,
} from "../services/produtoService.js";
import { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import { Card, Button, Modal, Row, Col, Alert, Spinner } from "react-bootstrap";
import FormAdicionaProduto from "../components/formAdicionaProduto.jsx";
import TabelaProdutos from "../components/tabelaProdutos.jsx";
export default function Administrador() {
  const [produtos, setProdutos] = useState([]);
  const [produtoParaEditar, setProdutoParaEditar] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState(null);
  const [operacaoLoading, setOperacaoLoading] = useState(false);
  const [estatisticas, setEstatisticas] = useState(null);
  const [abaAtiva, setAbaAtiva] = useState("produtos");

  const carregarProdutos = async () => {
    try {
      setLoading(true);
      setErro(null);
      const [produtosData, stats] = await Promise.all([
        buscarTodosProdutos(),
        obterEstatisticasProdutos(),
      ]);
      setProdutos(produtosData);
      setEstatisticas(stats);
    } catch (error) {
      console.error("erro ", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    carregarProdutos();
  }, []);

  const cadastrarProduto = async (dadosProduto) => {
    try {
      setOperacaoLoading(true);

      if (produtoParaEditar) {
        await atualizarProduto(produtoParaEditar.id, dadosProduto);
      } else {
        await criarProduto(dadosProduto);
      }
      await carregarProdutos();
      setShowModal(false);
      setProdutoParaEditar(null);
    } catch (error) {
      console.error("  salvar produto:", error);
    } finally {
      setOperacaoLoading(false);
    }
  };

  const editandoProduto = (produto) => {
    setProdutoParaEditar(produto);
    setShowModal(true);
  };

  const removendoProduto = async (produtoId) => {
    const confirmar = window.confirm(
      "Tem certeza que deseja remover este produto?"
    );

    if (!confirmar) return;

    try {
      setOperacaoLoading(true);
      await deletarProduto(produtoId);
      mostrarAlert("Produto removido com sucesso!", "warning");
      await carregarProdutos();
    } catch (error) {
      console.error("Erro ao remover produto:", error);
    } finally {
      setOperacaoLoading(false);
    }
  };

  const handleNovoProduto = () => {
    setProdutoParaEditar(null);
    setShowModal(true);
  };

  const fecharModal = () => {
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
            </div>
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

            {!loading && !erro && estatisticas && (
              <Row className="mb-4">
                <Col md={12}>
                  <Card className="text-center">
                    <Card.Body>
                      <Card.Title className="h4 text-primary">
                        {estatisticas.total}
                      </Card.Title>
                      <Card.Text>Total de Produtos</Card.Text>
                    </Card.Body>
                  </Card>
                </Col>
              </Row>
            )}

            {abaAtiva === "produtos" && !loading && !erro && (
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
                  onEditar={editandoProduto}
                  onRemover={removendoProduto}
                />
              </div>
            )}
          </div>
        </Container>

        <Modal show={showModal} onHide={fecharModal} size="lg">
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
              onSubmit={cadastrarProduto}
              onCancelar={fecharModal}
              disabled={operacaoLoading}
            />
          </Modal.Body>
        </Modal>
      </section>
    </div>
  );
}
