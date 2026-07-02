import { CommentInterface } from "./comment";

export interface PostInterface {
  _id: string;
  user_nickname: string;
  text: string;
  description?: string;
  imagenes: string[];
  etiquetas: string[];
  commentCount: number;
  comments?: CommentInterface[]
}
