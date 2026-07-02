import { useContext, useEffect, useState } from "react"
import { getComentariosCount, getFeedPersonalUser, getFeedUser, getPublicaciones } from "../services/postServices"
import { AuthContextGlobal } from "../context/AuthContext"
import { PostInterface } from "../interfaces/post"

export const useFeed = () => {
    const [posts, setPosts] = useState<PostInterface[]>([])
    const [currentFeed, setCurrentFeed] = useState<"mi_feed" | "global_feed" | "personal_feed">("mi_feed")
    const {user} = useContext(AuthContextGlobal)
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [error, setError] = useState<string>("")

    const postsWithCommentCount = async (post: PostInterface[]) => {
        return await Promise.all(
            post.map(async (p) => {
                const count = await getComentariosCount(p._id);
                return {
                    ...p,
                    commentCount: count
                };
            })
        );
    }

    useEffect(() => {
        const currentPosts = async () => {
            try {
                setIsLoading(true)
                if(currentFeed === "global_feed") {
                    const allPost = await getPublicaciones()
                    const allPostWithoutUser = allPost.filter(p => p.user_nickname != user?.nickname)
                    const postsGlobalWithCommentCount = await postsWithCommentCount(allPostWithoutUser)
                    setPosts(postsGlobalWithCommentCount)
                } else if (currentFeed === "mi_feed"){
                    const feedUser = await getFeedUser(user?.nickname)
                    const postsFeedWithCommentCount = await postsWithCommentCount(feedUser)
                    setPosts(postsFeedWithCommentCount)
                } else {
                    const feedPersonal = await getFeedPersonalUser(user?.nickname)
                    const postsFeedWithCommentCount = await postsWithCommentCount(feedPersonal)
                    setPosts(postsFeedWithCommentCount)
                }
                console.log(currentFeed)
            } catch (error:any) {
                setError(`Ocurrio un error a la hora de obtener ${currentFeed === "mi_feed" ? "tu feed" : "el feed global"} : ${error.message}`)
                setPosts([])
            } finally {
                setIsLoading(false)
                setError("")
            }
        }

        currentPosts()
    }, [currentFeed])
    

    return {
        posts,
        isLoading,
        error,
        currentFeed,
        setCurrentFeed
    }
}