import React from 'react';
import { Table, Button, Badge } from 'react-bootstrap';
import { IoStar, IoStarHalf, IoStarOutline } from 'react-icons/io5';
import { Link } from 'react-router-dom';
function TabelaProdutos({ produtos, onEditar, onRemover }) {
    const aplicaStars = (stars) => {
        const vetorEstrela = [];
        const estrelaCheia = Math.floor(stars);
        const estrelaMetade = stars % 1 !== 0;
        for (let i = 0; i < estrelaCheia; i++) {
            vetorEstrela.push(<IoStar key={`star-${i}`} className="text-warning" />);
        }
        if (estrelaMetade) {
            vetorEstrela.push(<IoStarHalf key="half-star" className="text-warning" />);
        }
        const emptyStars = 5 - Math.ceil(stars);
        for (let i = 0; i < emptyStars; i++) {
            vetorEstrela.push(<IoStarOutline key={`empty-${i}`} className="text-warning" />);
        }

        return vetorEstrela;
    };

    if (produtos.length === 0) {
        return (
            <div className="text-center p-4">
                <h5>Nenhum produto cadastrado</h5>
                <p>Adicione o primeiro produto usando o formulário acima.</p>
            </div>
        );
    }

    return (
        <div className="table-responsive">
            <Table striped bordered hover>
                <thead className="table-dark">
                    <tr>
                        <th>ID</th>
                        <th>Nome</th>
                        <th>Descrição</th>
                        <th>Preço</th>
                        <th>Imagem</th>
                        <th>Avaliação</th>
                        <th>Estrelas</th>
                        <th>Ações</th>
                    </tr>
                </thead>
                <tbody>
                    {produtos.map((produto) => (
                        <tr key={produto.id}>
                            <td>{produto.id}</td>
                            <td className="fw-bold">{produto.nome}</td>
                            <td>
                                <div style={{ maxWidth: '200px' }}>
                                    {produto.descricao}
                                </div>
                            </td>
                            <td className="text-success fw-bold">R$ {produto.preco.toFixed(2)}</td>
                            <td>
                                {produto.imgSrc && (
                                    <img
                                        src={`${import.meta.env.BASE_URL}images/${produto.imgSrc}`}
                                        alt={produto.nome}
                                        style={{ width: '50px', height: '50px', objectFit: 'cover' }}
                                        className="rounded"
                                    />
                                )}
                            </td>
                            <td className="text-center">
                                <span className="fw-bold">{produto.avaliacao}</span>/5
                            </td>
                            <td>
                                <div className="d-flex align-items-center">
                                    {aplicaStars(produto.stars)}
                                    <span className="ms-2 small">({produto.stars})</span>
                                </div>
                            </td>
                            <td>
                                <div className="d-flex gap-1">
                                    <Link to={`/produtos/${produto.id}`}>
                                        <Button
                                            variant="outline-success"
                                            size="sm"
                                        >
                                            Detalhes
                                        </Button>
                                    </Link>
                                    <Button
                                        variant="outline-primary"
                                        size="sm"
                                        onClick={() => onEditar(produto)}
                                    >
                                        Editar
                                    </Button>
                                    <Button
                                        variant="outline-danger"
                                        size="sm"
                                        onClick={() => onRemover(produto.id)}
                                    >
                                        Remover
                                    </Button>
                                    
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </Table>
        </div>
    );
}

export default TabelaProdutos;