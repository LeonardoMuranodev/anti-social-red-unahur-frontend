import { useContext, useState } from "react";
import { Form, Button, Spinner } from "react-bootstrap";
import { CommentInterface } from "../interfaces/comment";
import { createComentario } from "../services/commentServices";
import { AuthContextGlobal } from "../context/AuthContext";

interface Props {
    postId: string;
    onCommentAdded: (nuevoComentario: CommentInterface) => void; 
}

export default function CommentForm({ postId, onCommentAdded }: Props) {
    const [text, setText] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const {user} = useContext(AuthContextGlobal)

  const handleSubmit = async (e: React.SubmitEvent) => {
    e.preventDefault();
    if (!text.trim()) return;

    setIsLoading(true);
    setError("");

    try {
        const nuevoComentario = await createComentario(postId, text, user.nickname);

        onCommentAdded(nuevoComentario);

        setText("");
    } catch (err: any) {
        setError(err.message);
    } finally {
        setIsLoading(false);
    }
    };

    return (
        <Form onSubmit={handleSubmit} className="mt-3 border-top border-secondary pt-3">
        {error && <p className="text-danger small mb-2">{error}</p>}
        <Form.Group className="d-flex gap-2">
            <Form.Control
            type="text"
            placeholder="Escribí un comentario..."
            value={text}
            onChange={(e) => setText(e.target.value)}
            disabled={isLoading}
            className="bg-dark text-white border-secondary"
            />
            <Button variant="primary" type="submit" disabled={isLoading || !text.trim()}>
            {isLoading ? <Spinner size="sm" animation="border" /> : "Enviar"}
            </Button>
        </Form.Group>
        </Form>
    );
}