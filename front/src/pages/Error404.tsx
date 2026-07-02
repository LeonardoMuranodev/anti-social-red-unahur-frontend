import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Button } from 'react-bootstrap';
import { useNavigate } from 'react-router';

function Error404() {
  const navigate = useNavigate();

  return (
    <Container fluid className="landing-container bg-gradient">
      <Row className="justify-content-center align-items-center" style={{ minHeight: "100vh" }}>
        <Col sm={8} className="text-center landing-text">
          
          <h1 style={{ fontSize: "4rem" }}>404</h1>
          <h2>Acá no hay nada para ver</h2>

          <p>
            Parece que esta página se perdió en el caos de antiSocial.<br/>
            O tal vez nunca existió…
          </p>

          <Button 
            variant="primary border" 
            onClick={() => navigate('/')}
          >
            Volver al feed
          </Button>

        </Col>
      </Row>
    </Container>
  );
}

export default Error404;