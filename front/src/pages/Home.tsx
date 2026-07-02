import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Button, ButtonGroup, Form, InputGroup, Stack } from 'react-bootstrap';
import Footer from '../components/Footer';
import NavigationBar from '../components/Navbar';
import FeedSection from '../components/FeedSection';

function Home() {

  return (
    <main className='d-flex flex-column'>
      <NavigationBar/>

      <Container fluid>
        <Row className='justify-content-end'>
          <Col sm={8} md={6} className='main-content p-2 align-self-start'>
            <Stack gap={2}>
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
              <FeedSection></FeedSection>
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