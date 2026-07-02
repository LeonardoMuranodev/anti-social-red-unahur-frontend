import { Button, ButtonGroup, Container, Form } from "react-bootstrap";

export default function FormPost() {
    return(
        <Form>
                <Form.Group className="mb-3" controlId="">
                  <Form.Label>Título</Form.Label>
                  <Form.Control
                    type="text"
                    size="lg"
                    placeholder="Título"
                    aria-label="Titulo"
                  />
                  <Form.Label>Contenido</Form.Label>
                  <Form.Control as="textarea" placeholder="Redactar publicación" rows={3} />
                  <Form.Label>Tags</Form.Label>
                  <Form.Control size="sm" type="text" placeholder="tags (separadas por comas)" />
                  <div className="d-flex justify-content-between mt-2" style={{width:"100%"}}>
                    <Button variant='secondary border' className="">Agregar Imagen</Button>
                    <Button variant='primary border'>Publicar</Button>
                  </div>
                </Form.Group>
              </Form>
    )
}