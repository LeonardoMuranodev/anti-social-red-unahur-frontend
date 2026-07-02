import { useContext, useState } from "react";
import { Form, Button, Alert, Spinner } from "react-bootstrap";
import { createPublicacion } from "../services/postServices"; // Ajustá la ruta
import { AuthContextGlobal } from "../context/AuthContext";

export default function FormPost() {
  const [text, setText] = useState("");
  const [description, setDescription] = useState("");
  
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const {user} = useContext(AuthContextGlobal)

  const handleSubmit = async (e: React.SubmitEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    setSuccess(false);
    
    const user_nickname = user.nickname

    try {
      await createPublicacion({ text, description, user_nickname});
      
      setSuccess(true);
      setText("");
      setDescription("");
      
    } catch (err: any) {
      setError(err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Form onSubmit={handleSubmit} className="border p-3 rounded  text-white">
      {error && <Alert variant="danger">{error}</Alert>}
      {success && <Alert variant="success">¡Publicación creada con éxito!</Alert>}

      <Form.Group className="mb-3">
        <Form.Label>Título</Form.Label>
        <Form.Control
          type="text"
          size="lg"
          placeholder="Título"
          required
          value={text}
          onChange={(e) => setText(e.target.value)}
        />

        <Form.Label className="mt-3">Contenido</Form.Label>
        <Form.Control
          as="textarea"
          placeholder="Redactar publicación"
          rows={3}
          required
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        <Form.Label className="mt-3">Tags</Form.Label>
        <Form.Control
          size="sm"
          type="text"
          placeholder="tags (separadas por comas)"
          disabled
        />

        <div className="d-flex justify-content-between mt-4" style={{ width: "100%" }}>
          <Button variant="secondary" className="border" disabled>
            Agregar Imagen
          </Button>
          <Button variant="primary" type="submit" disabled={isLoading}>
            {isLoading ? <Spinner size="sm" animation="border" /> : "Publicar"}
          </Button>
        </div>
      </Form.Group>
    </Form>
  );
}