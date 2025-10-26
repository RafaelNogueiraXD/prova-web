import React from "react";
import {Row, Col, Button } from "react-bootstrap";
import { useState } from "react";


export default function ItemCarrinho({ item }) {
    const [quantidade, setQuantidade] = useState(Number(item.quantidade));

    const aumentarQuantidade = () => {
        setQuantidade(quantidade + 1);
    };

    const diminuirQuantidade = () => {
        if (quantidade > 0) {
            setQuantidade(quantidade - 1);
        }
    };

    return (
        <Row className="align-items-center">
            <Col xs="auto">
                <img src={'/images/'+item.imgSrc} alt={item.nome} style={{ maxWidth: "100px" }} />
            </Col>
            <Col>
                <h5>{item.nome}</h5>
                <p>{item.descricao}</p>
            </Col>
            <Col xs="auto" className="d-flex gap-4">
                
                <Button variant="outline-danger" onClick={diminuirQuantidade}>-</Button>
                <p className="mt-3">{quantidade}</p>
                <Button variant="outline-success" onClick={aumentarQuantidade}>+</Button>
                <b>R$ {item.preco.toFixed(2)}</b>
                <p><b>Total : R$ {(item.preco * quantidade).toFixed(2)}</b></p>
            </Col>
        </Row>
    );
}
