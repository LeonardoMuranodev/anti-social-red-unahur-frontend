import { useContext, useEffect, useState } from 'react';
import { Navbar, Container as BsContainer, Nav, Button as BsButton } from 'react-bootstrap';
import { Link } from 'react-router';
import { AuthContextGlobal } from '../context/AuthContext';
import Logo from '../assets/logo.svg?react'

export default function NavigationBar() {
  const { isAuthenticated,logout } = useContext(AuthContextGlobal);
  const [show, setShow] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  var buttons;
  
  if (!isAuthenticated){
    buttons = () => {return(<><Link to="/login" className="text-decoration-none">
              <BsButton
                variant="outline-light"
                className="navbar-btn px-4 py-2 fw-semibold"
              >
                Iniciar sesión
              </BsButton>
            </Link>

            <Link to="/signup" className="text-decoration-none">
              <BsButton
                variant="primary"
                className="navbar-btn px-4 py-2 fw-semibold"
              >
                Registrarse
              </BsButton>
            </Link></>)}
    }
    else {
        buttons = () => {return(<>
              <BsButton as={Link} to="/user"
                variant="secondary"
              >
                Mi Perfil
              </BsButton>
        <BsButton onClick={logout} variant='danger'>Cerrar sesión</BsButton>
        </>
        )
    }
    }

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

    return(
        <Navbar
        expand="md"
        bg="dark"
        variant="dark"
        className="border-bottom border-primary shadow-sm mb-6"
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
            href="/welcome"
            className="fw-bold text-primary fs-2"
          >
            <p>
              <Logo width='48px' height='48px'/>antiSocial
            </p> 
          </Navbar.Brand>

          <Navbar.Toggle />

          <Navbar.Collapse>

           <Nav className="ms-auto d-flex flex-column flex-md-row gap-3">

            {buttons()}

          </Nav>

          </Navbar.Collapse>

        </BsContainer>
      </Navbar>
    );
}