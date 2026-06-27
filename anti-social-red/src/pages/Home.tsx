import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

function Home() {

  return (<>
  <Container fluid>
    <Row>
      <Col className='main-content d-none d-sm-block'>nav lateral</Col>
      <Col className='main-content xs-order-first'>pfp</Col>
      <Col sm={8} className='main-content'>feed y demas cosas</Col>
    </Row>
  </Container>
  <div className='nav-mobile d-sm-none'>nav mobile</div>
  </>
  )
}

export default Home