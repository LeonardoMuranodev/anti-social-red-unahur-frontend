import { useContext } from "react";
import { AuthContextGlobal } from "../context/AuthContext";
import { Button, Col, Container, Row, Stack } from "react-bootstrap";

function Profile() {

  const {user, logout} =  useContext(AuthContextGlobal);

  return (
    <Container fluid>
      <Row className="justify-content-center">
        <Col sm={8} className="bg-primary">
          <Stack>
            <h3>{user['nickname']}</h3>
            <p>Seguidores: {user['seguidores'].length}</p>
            <p>Seguidos: {user['seguidos'].length}</p>
            <Button onClick={logout} variant='danger border'>Cerrar sesión</Button>
          </Stack>
        </Col>
      </Row>
    </Container>
  )
}

export default Profile