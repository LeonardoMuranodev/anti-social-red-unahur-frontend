import type { Post } from "../interfaces/post";

const API_URL = import.meta.env.VITE_API_URL;

export const getPublicaciones = async (): Promise<Post[]> => {
  const response = await fetch(`${API_URL}/publicaciones`);

  if (!response.ok) {
    throw new Error("Error al obtener las publicaciones");
  }

  return response.json();
};

export const getComentariosCount = async (postId: string): Promise<number> => {
  const response = await fetch(
    `${API_URL}/publicaciones/${postId}/comentarios`,
  );

  if (!response.ok) {
    return 0;
  }

  const data = await response.json();
  return Array.isArray(data) ? data.length : 0;
};
