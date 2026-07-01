import { useContext, useEffect, useState } from 'react';
import { Navbar, Container as BsContainer, Nav, Button as BsButton } from 'react-bootstrap';
import { Link } from 'react-router';
import { AuthContextGlobal } from '../context/AuthContext';

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
        <Link to="/user" className="text-decoration-none">
              <BsButton
                variant="secondary"
                className="navbar-btn px-4 py-2 fw-semibold"
              >
                Mi Perfil
              </BsButton>
            </Link>
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
        className="border-bottom border-primary shadow-sm"
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
            antiSocial 
          </Navbar.Brand>

          <Navbar.Toggle />

          <Navbar.Collapse>

           <Nav className="ms-auto d-flex flex-column flex-md-row gap-2">

            {buttons()}

          </Nav>

          </Navbar.Collapse>

        </BsContainer>
      </Navbar>
    );
}