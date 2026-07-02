import { useContext, useEffect, useState } from "react"
import { getComentariosCount, getFeedPersonalUser, getFeedUser, getPublicacion, getPublicaciones } from "../services/postServices"
import { AuthContextGlobal } from "../context/AuthContext"
import { PostInterface } from "../interfaces/post"
import { useParams } from "react-router"
import { getComentariosPublicacion } from "../services/commentServices"

export const usePostDetail = () => {
    const params = useParams(); // No desestructures todavía
    console.log("Lo que recibo de useParams es:", params)
    const [post, setPost] = useState<PostInterface | null>(null)
    const {idPost} = useParams()
    const [isLoading, setIsLoading] = useState<boolean>(true)
    const [error, setError] = useState<string>("")

    const postWithCommentAndCommentCount = async (post: PostInterface) => {
        const count = await getComentariosCount(post._id);
        const comments = await getComentariosPublicacion(post._id);
        return {
            ...post,
            commentCount: count,
            comments: comments
        };
    }

    useEffect(() => {
        if (!idPost) return

        const currentPost = async () => {
            try {
                setIsLoading(true)
                const post = await getPublicacion(idPost)
                const postFeedWithCommentCount = await postWithCommentAndCommentCount(post)
                setPost(postFeedWithCommentCount)
                console.log(post)
            }
            catch (error:any) {
                setError(`Ocurrio un error a la hora de obtener el post ${idPost}`)
                setPost(null)
            } finally {
                setIsLoading(false)
            }
        }

        currentPost()
    }, [idPost])
    

    return {
        post,
        isLoading,
        error,
    }
}