import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Button, ButtonGroup, Form, InputGroup, Stack } from 'react-bootstrap';
import Post from '../components/Post';
import Footer from '../components/Footer';
import NavigationBar from '../components/Navbar';

function Home() {

  return (
    <main className='d-flex flex-column'>
      <NavigationBar/>

      <Container fluid>
        <Row className='justify-content-end'>
          <Col sm={8} md={6} className='main-content p-2 align-self-start'>
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
                <Post id={1} />
                <Post id={2} />
                <Post id={3} />
                <Post id={4} />
              </Stack>
            </Stack>
          </Col>
          <Col sm={2} md={3} className='main-content xs-order-first'>pfp</Col>
        </Row>
      </Container>
      <Footer />
    </main>
  );
}

export default Home