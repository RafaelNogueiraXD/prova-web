import React from "react";
import { Container } from "react-bootstrap";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { Button } from "react-bootstrap";
import CardProduto from "../components/produto.jsx";
import CardExemplo from "../components/produto2.jsx";
import { FiShoppingCart } from "react-icons/fi";
import { IoMdAddCircle } from "react-icons/io";
import Modal from "react-bootstrap/Modal";
import ModalCarrinho from "../components/modalCarrinho.jsx";
import { buscarTodosProdutos } from "../services/produtoService.js";
import { useState, useEffect } from "react";
import { useCarrinho } from "../contexts/CarrinhoContext.jsx";
import { Badge, Alert, Spinner } from "react-bootstrap";
export default function Produtos() {
  const [modalShow, setModalShow] = React.useState(false);
  const [produtos, setProdutos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [erro, setErro] = useState(null);
  const { totalItens } = useCarrinho();

  useEffect(() => {
    async function fetchProdutos() {
      try {
        setLoading(true);
        setErro(null);
        const produtosData = await buscarTodosProdutos();
        setProdutos(produtosData);
      } catch (error) {
        console.error('Erro ao buscar produtos:', error);
        setErro('Erro ao carregar produtos. Verifique se o JSON Server está rodando.');
      } finally {
        setLoading(false);
      }
    }
    fetchProdutos();
  }, []);
  return (
    <div
      className="min-vh-100 d-flex align-items-center justify-content-center"
      style={{
        backgroundImage: 'url("./images/bg-produtos.jpg")',
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        backgroundAttachment: "fixed",
      }}
    >
      <Container className="bg-dark bg-opacity-75 text-white p-5 rounded shadow-lg d-flex flex-column  justify-content-center">
        <Row>
          <Col>
            <h1>Produtos</h1>
          </Col>
          <Col className="d-flex justify-content-end align-items-center">
            <Button
              variant="outline-info"
              className="me-3"
              onClick={() => setModalShow(true)}
            >
              <FiShoppingCart className="fs-4" />
              {totalItens > 0 && (
                <Badge bg="danger" className="ms-2">
                  {totalItens}
                </Badge>
              )}
            </Button>
          </Col>
        </Row>
        
        {/* Tratamento de erro */}
        {erro && (
          <Alert variant="danger" className="mt-4">
            <Alert.Heading>Erro ao carregar produtos</Alert.Heading>
            <p>{erro}</p>
            <Button 
              variant="outline-danger" 
              onClick={() => window.location.reload()}
            >
              Tentar novamente
            </Button>
          </Alert>
        )}

        {/* Loading */}
        {loading && (
          <div className="text-center mt-5">
            <Spinner animation="border" variant="info" />
            <p className="mt-2">Carregando produtos...</p>
          </div>
        )}

        {/* Lista de produtos */}
        {!loading && !erro && (
          <Row className="mt-5 d-flex justify-content-start">
            {produtos.length === 0 ? (
              <Col className="text-center">
                <Alert variant="info">
                  <h4>Nenhum produto encontrado</h4>
                  <p>Não há produtos disponíveis no momento.</p>
                </Alert>
              </Col>
            ) : (
              produtos.map((produto) => (
                <Col
                  key={produto.id}
                  xs={12}
                  sm={6}
                  md={4}
                  lg={3}
                  className="d-flex justify-content-center"
                >
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
              ))
            )}
          </Row>
        )}
      </Container>
      <ModalCarrinho show={modalShow} onHide={() => setModalShow(false)} />
    </div>
  );
}
