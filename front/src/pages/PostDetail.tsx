import { Alert, Spinner, Button, Container } from "react-bootstrap";
import { useNavigate } from "react-router"; 
import { usePostDetail } from "../hooks/usePostDetails";
import PostDetailComponent from "../components/PostDetailComponent";

function PostDetail() {
  const { post, isLoading, error } = usePostDetail();
  const navigate = useNavigate();

  return (
    <Container className="py-4 post-detail-wrapper">
      {/* Botón Volver Minimalista */}
      <Button 
        onClick={() => navigate(-1)} 
        variant="link" 
        className="text-white text-decoration-none px-0 mb-3 d-flex align-items-center gap-2"
      >
        <span>&larr;</span> Volver al Feed
      </Button>

      {error && <Alert variant="danger" className="rounded-3">{error}</Alert>}

      {!isLoading && !error && post === null && (
        <div className="text-center p-5 bg-dark rounded-3 border border-secondary">
          <h4 className="text-white">Publicación no encontrada</h4>
          <p className="text-muted mb-0">Es posible que haya sido eliminada.</p>
        </div>
      )}

      {isLoading && (
        <div className="d-flex flex-column align-items-center justify-content-center py-5 my-5">
          <Spinner animation="border" variant="light" style={{ width: "3rem", height: "3rem" }} />
          <p className="text-white mt-3 fw-semibold">Cargando publicación...</p>
        </div>
      )}

      {!isLoading && !error && post && (
        <PostDetailComponent post={post} />
      )}
    </Container>
  );
}

export default PostDetail;