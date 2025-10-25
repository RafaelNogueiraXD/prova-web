import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

function CollapsibleExample() {
  return (
    <Navbar collapseOnSelect expand="lg" className="bg-dark" variant="dark">
      <Container>
        <Navbar.Brand href="/">Prog-Web</Navbar.Brand>
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="/carrinho">Carrinho</Nav.Link>
            <Nav.Link href="/produtos">Produtos</Nav.Link>
          </Nav>
          <Nav>
            <Nav.Link eventKey={2} href="/admin">
              Tela Administrador
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default CollapsibleExample;