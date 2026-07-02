import { Button, ButtonGroup, Form } from "react-bootstrap";

export default function FormPost() {
    return(
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
    )
}