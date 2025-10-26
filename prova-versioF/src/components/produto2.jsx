import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { Button } from 'react-bootstrap';
import { IoStar } from "react-icons/io5";
import { IoStarHalf } from "react-icons/io5";
import { IoStarOutline } from "react-icons/io5";
import { useCarrinho } from '../contexts/CarrinhoContext.jsx';
function CardExemplo({id, titulo, desc,  valor, avaliacao, stars, imgSrc }) {
    const { adicionarItem  } = useCarrinho();
    var calStars = []
    console.log(stars);
    var numStarts = 0;
    function isFloat(n) {
        return Number(n) === n && n % 1 !== 0;
    }
    if(isFloat(stars)){
        var newstars = Math.floor(stars)
    }else{
        var newstars = stars
    }
    for (let i = 0; i < newstars; i++) {
        calStars.push(<IoStar key={`star-${i}`} />)
        numStarts++;
    }
    if(isFloat(stars)){
        console.log("entrou");
        calStars.push(<IoStarHalf key="half-star" />)
        numStarts++;
    }
    for (let i = 0; i <5 - numStarts; i++) {
        calStars.push(<IoStarOutline key={`outline-${i}`} />)
    }

    const handleAdicionarCarrinho = () => {
        const produto = {
            id,
            titulo,
            desc,
            valor,
            avaliacao,
            stars,
            imgSrc
        };
        adicionarItem(produto);
    };

  return (
    <Row >
      <Col>
        <Card  className='bg-light text-dark mb-4' border='info'>
          <Card.Img variant="top" src={`${import.meta.env.BASE_URL}images/${imgSrc}`} />
          <Card.Body className='text-center'>
            <Card.Title>{titulo}</Card.Title>
              <Card.Text>
                {desc}
              </Card.Text>
              <div className='fs-5 mt-3 text-warning'>
                {calStars}
                <span className='text-dark ms-2'>
                  {avaliacao}
                </span>
              </div>
              <p><b>R$ {valor}</b></p>
            </Card.Body>
            <Card.Footer className='d-flex justify-content-center'>
                <Button variant="info" onClick={handleAdicionarCarrinho}>
                    Adicionar ao Carrinho
                </Button>
            </Card.Footer>
          </Card>
        </Col>
    </Row>
  );
}

export default CardExemplo;