export interface Post {
  _id: string;
  user_nickname: string;
  text: string;
  description?: string;
  imagenes: string[];
  etiquetas: string[];
}
