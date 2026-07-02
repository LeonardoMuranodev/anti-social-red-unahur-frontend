import { Badge } from "react-bootstrap";
import { Link } from "react-router";
import type { PostInterface as PostData } from "../interfaces/post";

interface PostProps {
  post?: PostData;
  commentCount?: number;
  id?: number;
}

export default function Post({ post, commentCount, id }: PostProps) {
  if (!post) {
    return (
      <div className="post-card border bg-secondary p-3">
        <h2 className="h5 mb-1">placeholder post {id}</h2>
        <p className="mb-1 text-light opacity-75">@autor</p>
        <p className="mb-0">placeholder de post</p>
      </div>
    );
  }

  const preview = post.description || post.text;

  return (
    <article className="post-card border rounded p-3">
      <header className="d-flex justify-content-between align-items-start mb-2">
        <div>
          <p className="mb-0 fw-semibold">@{post.user_nickname}</p>
          {post.text && post.description && (
            <h2 className="h6 mb-0 mt-1">{post.text}</h2>
          )}
        </div>
        {commentCount !== undefined && (
          <Badge bg="secondary" className="ms-2">
            {commentCount} {commentCount === 1 ? "comentario" : "comentarios"}
          </Badge>
        )}
      </header>

      <p className="post-card__body mb-2">{preview}</p>

      {post.imagenes.length > 0 && (
        <div className="post-card__images d-flex gap-2 flex-wrap mb-2">
          {post.imagenes.slice(0, 3).map((url, index) => (
            <img
              key={`${post._id}-img-${index}`}
              src={url}
              alt=""
              className="post-card__thumbnail rounded"
            />
          ))}
        </div>
      )}

      {post.etiquetas.length > 0 && (
        <div className="d-flex flex-wrap gap-1 mb-3">
          {post.etiquetas.map((tag) => (
            <Badge key={`${post._id}-${tag}`} bg="primary">
              #{tag}
            </Badge>
          ))}
        </div>
      )}

      <Link to={`/post/${post._id}`} className="btn btn-outline-light btn-sm">
        Ver más
      </Link>
    </article>
  );
}
