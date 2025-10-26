import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Badge } from 'react-bootstrap';
import { Link } from 'react-router-dom';
function CollapsibleExample() {

  return (
    <Navbar collapseOnSelect expand="lg" className="bg-dark" variant="dark">
      <Container>
        <Navbar.Brand as={Link} to="/">Prog-Web</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link as={Link} to="/carrinho" className="position-relative">
              Carrinho 
 
            </Nav.Link>
            <Nav.Link as={Link} to="/produtos">Produtos</Nav.Link>
          </Nav>
          <Nav>
            <Nav.Link as={Link} to="/admin">
              Tela Administrador
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default CollapsibleExample;