import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function Home() {

  return (<>
  <Container>
    <Row>
      <Col xs={{order:5}} classname='mainContent'>nav lateral</Col>
      <Col sm={10} md={8} classname='mainContent'>feed y demas cosas</Col>
      <Col classname='mainContent'>icono de usuario</Col>
    </Row>
  </Container>
  <div className='nav-mobile'>nav mobile</div>
  </>
  )
}

export default Home