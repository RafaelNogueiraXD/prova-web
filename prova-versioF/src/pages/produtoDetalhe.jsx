import React from "react";

import { getProdutos } from "../api";
import { useState, useEffect} from "react";
import Container from "react-bootstrap/Container";
import { Card, Button, Row, Col } from "react-bootstrap";
import { useCarrinho } from '../contexts/CarrinhoContext.jsx';
import { useNavigate } from "react-router-dom";

export default function ProdutoDetalhe() {
    const [produto, setProduto] = useState(null);
    const { adicionarItem } = useCarrinho();
    const redirect = useNavigate();
    useEffect(() => {
        async function fetchProdutos() {
            const produtosData = await getProdutos();
            setProduto(
                produtosData.find(p => p.id === parseInt(window.location.pathname.split('/').pop()))
            );
        }
        fetchProdutos();
    }, []);
    const botaNoCarrinho = (prod) => {
        const p = prod || produto;
        if (!p) return;
        const produtoAux = {
            id: p.id,
            titulo: p.nome,
            desc: p.descricao,
            valor: p.preco,
            avaliacao: p.avaliacao,
            stars: p.stars,
            imgSrc: p.imgSrc
        };
        adicionarItem(produtoAux);
        redirect('/produtos');
    };
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
            <Container className="bg-dark bg-opacity-75 text-white p-5 rounded shadow-lg d-flex flex-column  justify-content-center ">
                {produto ? (
                    <Row className="justify-content-center ">
                        <Col md={6} className="d-flex justify-content-center mb-4">
                            <img src={'/images/' + produto.imgSrc} className="img-fluid rounded border border-info"/>
                        </Col>
                        <Col md={6}>
                            <h2>{produto.nome}</h2>
                            <p>{produto.descricao}</p>
                            <h4>R$ {produto.preco.toFixed(2)}</h4>
                            <div className="d-flex align-items-center mb-3">
                                <span className="me-2">Avaliação: {produto.avaliacao}</span>
                            </div>
                            <Button variant="success" onClick={() => botaNoCarrinho(produto)}>Adicionar ao Carrinho</Button>
                        </Col>
                    </Row>
                ) : (
                    <div className="text-center p-4">
                        <h4>Carregando detalhes do produto...</h4>
                    </div>
                )}
            </Container>
        </div>
    );
}