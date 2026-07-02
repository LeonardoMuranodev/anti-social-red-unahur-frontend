import { Badge } from "react-bootstrap";
import type { PostInterface } from "../interfaces/post";

interface Props {
    post: PostInterface;
}

export default function PostDetailComponent({ post }: Props) {
    const { user_nickname, text, description, imagenes, etiquetas, commentCount, comments } = post;

    return (
        <article className="post-detail-card p-4 text-white">
        <header className="d-flex align-items-center mb-3">
            <div className="comment-avatar me-3 fs-5">
            {user_nickname.charAt(0).toUpperCase()}
            </div>
            <div>
            <h2 className="h5 mb-0 fw-bold">@{user_nickname}</h2>
            <span className="text-white-50 small">Publicación original</span>
            </div>
        </header>

        <div className="mb-4">
            {text && <p className="post-detail-text fw-medium mb-2">{text}</p>}
            {description && <p className="post-detail-description mb-0">{description}</p>}
        </div>

        {imagenes && imagenes.length > 0 && (
            <div className="d-flex flex-column gap-3 mb-4">
            {imagenes.map((url, index) => (
                <img
                key={`img-${index}`}
                src={url}
                alt="Contenido de la publicación"
                className="post-detail-image shadow-sm"
                />
            ))}
            </div>
        )}

        {etiquetas && etiquetas.length > 0 && (
            <div className="d-flex flex-wrap gap-2 mb-4 pb-3 border-bottom border-secondary">
            {etiquetas.map((tag) => (
                <Badge key={tag} bg="primary" className="px-3 py-2 rounded-pill">
                #{tag}
                </Badge>
            ))}
            </div>
        )}

        <section className="mt-4">
            <h3 className="h6 text-white-50 mb-3 text-uppercase tracking-wide">
            Comentarios ({commentCount || 0})
            </h3>

            <div className="d-flex flex-column gap-3">
            {!comments || comments.length === 0 ? (
                <p className="text-white-50 fst-italic">No hay comentarios todavía. ¡Sé el primero!</p>
            ) : (
                comments.map((comment) => (
                <div key={comment.id} className="comment-box p-3 shadow-sm">
                    <div className="d-flex align-items-center mb-2">
                    <div className="comment-avatar me-2" style={{ width: '28px', height: '28px', fontSize: '12px' }}>
                        {comment.nickname.charAt(0).toUpperCase()}
                    </div>
                    <span className="fw-bold fs-6 text-light">@{comment.nickname}</span>
                    </div>
                    <p className="mb-0 text-white-50 ms-4 ps-1">{comment.text}</p>
                </div>
                ))
            )}
            </div>
        </section>
        </article>
    );
}