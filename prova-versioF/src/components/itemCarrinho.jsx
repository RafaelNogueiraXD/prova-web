import React from "react";
import {Row, Col, Button } from "react-bootstrap";
import { useCarrinho } from "../contexts/CarrinhoContext.jsx";


export default function ItemCarrinho({ item }) {
    const { alterarQuantidade, removerItem } = useCarrinho();

    const aumentarQuantidade = () => {
        alterarQuantidade(item.id, item.quantidade + 1);
    };

    const diminuirQuantidade = () => {
        if (item.quantidade > 1) {
            alterarQuantidade(item.id, item.quantidade - 1);
        } else {
            removerItem(item.id);
        }
    };

    return (
        <Row className="align-items-center">
            <Col xs="auto">
                <img src={'/images/'+item.imgSrc} alt={item.titulo} style={{ maxWidth: "100px" }} />
            </Col>
            <Col>
                <h5>{item.titulo}</h5>
                <p>{item.desc}</p>
            </Col>
            <Col xs="auto" className="d-flex align-items-center gap-3">
                <Button variant="outline-danger" size="sm" onClick={diminuirQuantidade}>-</Button>
                <span className="fw-bold">{item.quantidade}</span>
                <Button variant="outline-success" size="sm" onClick={aumentarQuantidade}>+</Button>
                <div className="text-center">
                    <div>R$ {parseFloat(item.valor).toFixed(2)}</div>
                    <div><b>Total: R$ {(parseFloat(item.valor) * item.quantidade).toFixed(2)}</b></div>
                </div>
                <Button variant="outline-danger" size="sm" onClick={() => removerItem(item.id)}>
                    Remover
                </Button>
            </Col>
        </Row>
    );
}
