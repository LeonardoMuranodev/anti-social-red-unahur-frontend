import { Alert, Button, Spinner } from "react-bootstrap"
import { usePostDetail } from "../hooks/usePostDetails"
import PostDetailComponent from "../components/PostDetailComponent"
import { useNavigate } from "react-router-dom"

function PostDetail() {

  const { post, isLoading, error } = usePostDetail()
  const navigate = useNavigate()

  return (
  <section>
    <Button variant="link" onClick={() => navigate(-1)}> Volver</Button>

    {error && <Alert variant="danger">{error}</Alert>}

    {!isLoading && !error && post === null && (
        <p className="text-white text-center text-white p-3">No hay publicaciones para mostrar.</p>
    )}


    {isLoading && (
        <div className="profile-loading text-center py-5">
            <Spinner animation="border" variant="light" />
            <p className="mt-3 mb-0">Cargando Feed...</p>
        </div>
    )}

    {!isLoading && !error && (<PostDetailComponent post={post}></PostDetailComponent>)}
  </section>)
}

export default PostDetail