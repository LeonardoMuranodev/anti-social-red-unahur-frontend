import { Button, ButtonGroup, Spinner, Stack } from "react-bootstrap"
import Post from "./Post"
import { useFeed } from "../hooks/useFeed";


export default function FeedSection() {

    const {posts, isLoading, currentFeed, setCurrentFeed} = useFeed()

    const buttonMiFeedStyles = currentFeed === "mi_feed" ? "primary" : "outline-secondary"
    
    const buttonGlobalFeedStyles = currentFeed === "global_feed" ? "primary" : "outline-secondary"


    return (
        <Stack gap={1}>
            <ButtonGroup>
                <Button variant={buttonMiFeedStyles}  onClick={()=> setCurrentFeed("mi_feed")}>Mi Feed</Button>
                <Button variant={buttonGlobalFeedStyles} onClick={()=> setCurrentFeed("global_feed")}>Feed Global</Button>
            </ButtonGroup>
            {isLoading && (
                <div className="profile-loading text-center py-5">
                    <Spinner animation="border" variant="light" />
                    <p className="mt-3 mb-0">Cargando Feed...</p>
                </div>
            )}
            {!isLoading && posts.map((publicacion) => (
                <Post key={publicacion._id} post={publicacion} />
            ))}
        </Stack>
    );
}
