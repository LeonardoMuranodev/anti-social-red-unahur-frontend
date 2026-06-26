import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function Home() {

  return (
  <Container>
    <Row>
      <Col>nav lateral</Col>
      <Col sm={6} className=''>feed y demas cosas</Col>
      <Col>icono de usuario</Col>
    </Row>
  </Container>
  )
}

export default Home