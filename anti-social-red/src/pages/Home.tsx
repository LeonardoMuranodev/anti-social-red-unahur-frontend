import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Button, ButtonGroup, Form, InputGroup, Stack } from 'react-bootstrap';
import Post from '../components/Post';

function Home() {

  return (<>
  <Container fluid>
    <Row>
      <Col className='main-content d-none d-sm-block bg-primary'><p>nav lateral</p></Col>
      <Col sm={8} className='main-content p-2'>
        <Stack gap={2}>
          <InputGroup>
            <Form.Control
              placeholder="Buscar"
              aria-label="Buscar"
              aria-describedby="basic-addon2"
            />
            <Button variant="secondary" id="button-addon2">
              B
            </Button>
          </InputGroup>
          <Form>
            <Form.Group className="mb-3" controlId="">
              <Form.Control
                placeholder="Título"
                aria-label="Titulo"
              />            
              <Form.Control as="textarea" placeholder="Redactar publicación" rows={3} />
              <ButtonGroup>
                <Button variant='secondary border'>Agregar Imagen</Button>
                <Button variant='secondary border'>Archivar</Button>
                <Button variant='primary border'>Publicar</Button>
              </ButtonGroup>
            </Form.Group>
          </Form>
          <Stack gap={1}>
            <ButtonGroup>
              <Button variant='primary border'>Mi Feed</Button>
              <Button variant='secondary border'>Feed Global</Button>
            </ButtonGroup>
            <Post id={1}/>
            <Post id={2}/>
            <Post id={3}/>
            <Post id={4}/>
          </Stack>
        </Stack>
      </Col>
      <Col className='main-content xs-order-first'>pfp</Col>
    </Row>
  </Container>
  <div className='nav-mobile d-sm-none'>nav mobile</div>
  </>
  )
}

export default Home