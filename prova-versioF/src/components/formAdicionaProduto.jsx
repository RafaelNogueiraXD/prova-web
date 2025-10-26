import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import { useState, useEffect } from "react";

function FormAdicionaProduto({ produtoParaEditar, onSubmit, onCancelar }) {
  const [formData, setFormData] = useState({
    nome: "",
    descricao: "",
    preco: "",
    imgSrc: "",
    quantidade: "",
    avaliacao: "",
    stars: "",
    noCarrinho: false,
  });

  useEffect(() => {
    if (produtoParaEditar) {
      setFormData({
        nome: produtoParaEditar.nome || "",
        descricao: produtoParaEditar.descricao || "",
        preco: produtoParaEditar.preco || "",
        imgSrc: produtoParaEditar.imgSrc || "",
        quantidade: produtoParaEditar.quantidade || "",
        avaliacao: produtoParaEditar.avaliacao || "",
        stars: produtoParaEditar.stars || "",
        noCarrinho: produtoParaEditar.noCarrinho || false,
      });
    } else {
      setFormData({
        nome: "",
        descricao: "",
        preco: "",
        imgSrc: "",
        quantidade: "",
        avaliacao: "",
        stars: "",
        noCarrinho: false,
      });
    }
  }, [produtoParaEditar]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const enviaForm = (e) => {
    e.preventDefault();
    const dadosParaEnviar = {
      ...formData,
      preco: parseFloat(formData.preco),
      quantidade: parseInt(formData.quantidade) || 0,
      avaliacao: parseFloat(formData.avaliacao) || 0,
      stars: parseFloat(formData.stars) || 0,
    };

    onSubmit(dadosParaEnviar);
  };

  const isEdicao = !!produtoParaEditar;

  return (
    <Form onSubmit={enviaForm}>
      <Row className="mb-3">
        <Form.Group as={Col} controlId="formGridNome">
          <Form.Label>Nome do Produto *</Form.Label>
          <Form.Control
            type="text"
            placeholder="Digite o nome do produto"
            name="nome"
            value={formData.nome}
            onChange={handleChange}
            required
          />
        </Form.Group>

        <Form.Group as={Col} controlId="formGridPreco">
          <Form.Label>Preço (R$) *</Form.Label>
          <Form.Control
            type="number"
            step="0.01"
            placeholder="0.00"
            name="preco"
            value={formData.preco}
            onChange={handleChange}
            required
          />
        </Form.Group>
      </Row>

      <Form.Group className="mb-3" controlId="formGridDescricao">
        <Form.Label>Descrição *</Form.Label>
        <Form.Control
          as="textarea"
          rows={3}
          placeholder="Descreva o produto"
          name="descricao"
          value={formData.descricao}
          onChange={handleChange}
          required
        />
      </Form.Group>

      <Row className="mb-3">
        <Form.Group as={Col} controlId="formGridImagem">
          <Form.Label>Imagem (nome do arquivo)</Form.Label>
          <Form.Control
            type="text"
            placeholder="ex: produto-1.jpg"
            name="imgSrc"
            value={formData.imgSrc}
            onChange={handleChange}
          />
        </Form.Group>
      </Row>

      <Row className="mb-3">
        <Form.Group as={Col} controlId="formGridAvaliacao">
          <Form.Label>Avaliação (1-5)</Form.Label>
          <Form.Control
            type="number"
            step="0.1"
            min="1"
            max="5"
            placeholder="5.0"
            name="avaliacao"
            value={formData.avaliacao}
            onChange={handleChange}
          />
        </Form.Group>

        <Form.Group as={Col} controlId="formGridStars">
          <Form.Label>Estrelas (1-5)</Form.Label>
          <Form.Control
            type="number"
            step="0.5"
            min="1"
            max="5"
            placeholder="5.0"
            name="stars"
            value={formData.stars}
            onChange={handleChange}
          />
        </Form.Group>
      </Row>

      <div className="d-flex gap-2">
        <Button variant="primary" type="submit">
          {isEdicao ? "Atualizar Produto" : "Cadastrar Produto"}
        </Button>

        {onCancelar && (
          <Button variant="secondary" type="button" onClick={onCancelar}>
            Cancelar
          </Button>
        )}
      </div>
    </Form>
  );
}

export default FormAdicionaProduto;
