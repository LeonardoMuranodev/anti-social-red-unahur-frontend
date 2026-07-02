import { Button, ButtonGroup, Form } from "react-bootstrap";

export default function FormPost() {
    return(
        <Form>
                <Form.Group className="mb-3" controlId="">
                  <Form.Control
                    type="text"
                    size="lg"
                    placeholder="Título"
                    aria-label="Titulo"
                  />
                  <Form.Control as="textarea" placeholder="Redactar publicación" rows={3} />
                  <Form.Label>Tags</Form.Label>
                  <Form.Control size="sm" type="text" placeholder="tags (separadas por comas)" />
                  <ButtonGroup>
                    <Button variant='secondary border'>Agregar Imagen</Button>
                    <Button variant='primary border'>Publicar</Button>
                  </ButtonGroup>
                </Form.Group>
              </Form>
    )
}