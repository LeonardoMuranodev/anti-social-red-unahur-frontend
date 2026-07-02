import { CommentInterface } from "../interfaces/comment";
import type { PostInterface } from "../interfaces/post";

const API_URL = import.meta.env.VITE_API_URL;

export const getComentariosPublicacion = async (idPost:string): Promise<CommentInterface[]> => {
  const response = await fetch(`${API_URL}/publicaciones/${idPost}/comentarios`);

  if (!response.ok) {
    throw new Error("Error al obtener las publicaciones");
  }

  return response.json();
};

export const createComentario = async (idPost: string, text: string, user_nickname:string): Promise<CommentInterface> => {
    const response = await fetch(`${API_URL}/publicaciones/${idPost}/comentarios`, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({ 
            text: text,
            is_visible: true,
            user_nickname: user_nickname 
        })
    });

    if (!response.ok) {
        throw new Error("No se pudo publicar el comentario");
    }

    return response.json();
};