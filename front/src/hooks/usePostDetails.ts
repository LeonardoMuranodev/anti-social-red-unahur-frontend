import { useContext, useEffect, useState } from "react"
import { getComentariosCount, getFeedPersonalUser, getFeedUser, getPublicacion, getPublicaciones } from "../services/postServices"
import { AuthContextGlobal } from "../context/AuthContext"
import { PostInterface } from "../interfaces/post"
import { useParams } from "react-router-dom"

export const usePostDetail = () => {
    const [post, setPost] = useState<PostInterface | null>(null)
    const {idPost} = useParams()
    const [isLoading, setIsLoading] = useState<boolean>(true)
    const [error, setError] = useState<string>("")

    const postWithCommentCount = async (post: PostInterface) => {
        const count = await getComentariosCount(post._id);
        return {
            ...post,
            commentCount: count
        };
    }

    useEffect(() => {
        if (!idPost) return

        const currentPost = async () => {
            try {
                setIsLoading(true)
                const post = await getPublicacion(idPost)
                const postFeedWithCommentCount = await postWithCommentCount(post)
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