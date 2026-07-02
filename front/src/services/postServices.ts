import type { PostInterface } from "../interfaces/post";

const API_URL = import.meta.env.VITE_API_URL;

export const getPublicaciones = async (): Promise<PostInterface[]> => {
  const response = await fetch(`${API_URL}/publicaciones`);

  if (!response.ok) {
    throw new Error("Error al obtener las publicaciones");
  }

  return response.json();
};

export const getFeedUser = async (user_nickname:string): Promise<PostInterface[]> => {
  const response = await fetch(`${API_URL}/publicaciones/feed/user_nickname`);

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
