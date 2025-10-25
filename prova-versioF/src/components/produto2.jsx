import Card from 'react-bootstrap/Card';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import { Button } from 'react-bootstrap';

function CardExemplo({ title, description, imgSrc }) {
  return (
    <Row xs={1}>
      <Col>
        <Card  className='bg-light text-dark mb-4' border='info'>
          <Card.Img variant="top" src={imgSrc} />
          <Card.Body className='text-center'>
            <Card.Title>{title}</Card.Title>
              <Card.Text>
                {description}
              </Card.Text>
            </Card.Body>
            <Card.Footer className='d-flex justify-content-center'>
                <Button variant="info">Adicionar ao Carrinho</Button>
            </Card.Footer>
          </Card>
        </Col>
    </Row>
  );
}

export default CardExemplo;