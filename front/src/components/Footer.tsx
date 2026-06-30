import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function Footer() {
  return (
    <footer className="bg-dark text-light border-top border-danger mt-5 py-4">
      <Container fluid>
        <Row className="text-center text-md-start">

          <Col md={4} className="mb-3">
            <h5 className="text-danger">antiSocial 💀</h5>
            <p className="small text-secondary">
              worse is better.<br />
              sin algoritmos. sin filtros. sin esperanza.
            </p>
          </Col>

          <Col md={4} className="mb-3">
            <h6>La red</h6>
            <p className="small text-secondary mb-1">Posts caóticos</p>
            <p className="small text-secondary mb-1">Usuarios reales (supuestamente)</p>
            <p className="small text-secondary">Cero moderación</p>
          </Col>

          <Col md={4} className="mb-3">
            <h6>Legal (mentira)</h6>
            <p className="small text-secondary mb-1">Términos inexistentes</p>
            <p className="small text-secondary mb-1">Privacidad absoluta (o no)</p>
            <p className="small text-secondary">softWorse Co.</p>
          </Col>

        </Row>

        <hr className="border-danger" />

        <Row>
          <Col className="text-center small text-secondary">
            © {new Date().getFullYear()} antiSocial — nadie se hace responsable de nada
          </Col>
        </Row>
      </Container>
    </footer>
  );
}

export default Footer;