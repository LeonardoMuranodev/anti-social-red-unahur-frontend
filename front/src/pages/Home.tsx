import { useContext, useEffect, useState } from 'react';
import { Navbar, Container as BsContainer, Nav, Button as BsButton } from 'react-bootstrap';
import { Link } from 'react-router';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { Button, ButtonGroup, Form, InputGroup, Stack } from 'react-bootstrap';
import Post from '../components/Post';
import { AuthContextGlobal } from '../context/AuthContext';
import Footer from '../components/Footer';

import Logo from '../assets/logo.svg?react';

function Home() {

  const { logout } = useContext(AuthContextGlobal);

  const [show, setShow] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > lastScrollY && currentScrollY > 80) {
        setShow(false);
      } else {
        setShow(true);
      }

      setLastScrollY(currentScrollY);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastScrollY]);

  return (
    <>
      <Navbar
        expand="md"
        bg="dark"
        variant="dark"
        className="border-bottom border-danger shadow-sm"
        style={{
          position: 'fixed',
          top: 0,
          width: '100%',
          zIndex: 999,
          transform: show ? 'translateY(0)' : 'translateY(-100%)',
          transition: 'transform 0.3s ease-in-out'
        }}
      >
        <BsContainer fluid>
          <Navbar.Brand
            as="a"
            href="/"
            className="fw-bold text-danger"
          >
            <Logo/>
            antiSocial
          </Navbar.Brand>

          <Navbar.Toggle />

          <Navbar.Collapse>
            <Nav className="ms-auto d-flex flex-column flex-md-row gap-1">
              <Link to="/user">
                <BsButton
                  size="sm"
                  variant="outline-light"
                  className="px-2 py-1"
                >
                  Mi Perfil
                </BsButton>
              </Link>
            </Nav>
          </Navbar.Collapse>
        </BsContainer>
      </Navbar>

      <Container fluid>
        <Row>
          <Col className='main-content d-none d-sm-block bg-primary'>
            <p>nav lateral</p>
            <Button onClick={logout} variant='danger'>Cerrar sesión</Button>
          </Col>
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
                <Post id={1} />
                <Post id={2} />
                <Post id={3} />
                <Post id={4} />
              </Stack>
            </Stack>
          </Col>
          <Col className='main-content xs-order-first'>pfp</Col>
        </Row>
      </Container>

      <div className='nav-mobile d-sm-none'>nav mobile</div>

      <Footer />
    </>
  );
}

export default Home