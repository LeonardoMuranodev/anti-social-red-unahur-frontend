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