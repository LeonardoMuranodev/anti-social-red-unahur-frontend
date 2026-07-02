import { useContext, useEffect, useState } from "react"
import { getFeedUser, getPublicaciones } from "../services/postServices"
import { AuthContextGlobal } from "../context/AuthContext"
import { Post } from "../interfaces/post"

const wait = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export const useFeed = () => {
    const [posts, setPosts] = useState<Post[]>([])
    const [currentFeed, setCurrentFeed] = useState<"mi_feed" | "global_feed">("mi_feed")
    const {user} = useContext(AuthContextGlobal)
    const [isLoading, setIsLoading] = useState<boolean>(false)

    useEffect(() => {
        const currentPosts = async () => {
            setIsLoading(true)
            if(currentFeed === "global_feed") {
                const allPost = await getPublicaciones()
                const allPostWithoutUser = allPost.filter(p => p.user_nickname != user.nickname)
                setPosts(allPostWithoutUser)
            } else {
                const feedUser = await getFeedUser()
                setPosts(feedUser)
            }
            await wait(1500);
            console.log(currentFeed)
            setIsLoading(false)
        }

        currentPosts()
    }, [currentFeed])
    

    return {
        posts,
        isLoading,
        currentFeed,
        setCurrentFeed
    }
}