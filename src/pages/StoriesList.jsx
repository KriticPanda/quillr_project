import { useEffect, useState } from "react";
import axios from "axios"; 
import StoriesCard from "../components/StoriesCard";
import { useSearchParams } from "react-router-dom";

function StoriesList() {
    const [allStories, setAllstories] = useState(null);
    const [allComments, setAllComments] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [searchParams] = useSearchParams();
    const searchTerm = (searchParams.get("search") ?? "").trim().toLowerCase();

    useEffect(() => {
        getData(); 
    }, []);

    const getData = async () => {
        try {
            // Chamada paralela aos endpoints exatos do teu JSON Server
            const [storiesResponse, commentsResponse] = await Promise.all([
                axios.get("https://module-2-json-server.onrender.com/stories"),
               axios.get("https://module-2-json-server.onrender.com/comments"),
            ]);

            setAllstories(storiesResponse.data);
            setAllComments(commentsResponse.data);
            setIsLoading(false);
        }
        catch (error) {
            console.log("Erro ao carregar dados:", error);
            setIsLoading(false);
        }
    };

    if (isLoading) return <h3>Loading...</h3>;

    const matchingStories = allStories?.filter((story) => {
        const title = String(story.title ?? "").toLowerCase();
        const genre = String(story.genre ?? "").toLowerCase();
        return title.includes(searchTerm) || genre.includes(searchTerm);
    }) ?? [];

    return (
        <div className="StoriesList">
            {matchingStories.length > 0 ? matchingStories.map((story) => {
                // Filtra os comentários cujo storyId seja igual ao id da história atual
                const storyComments = allComments 
                    ? allComments.filter(comment => comment.storyId === story.id)
                    : [];

                return (
                    <StoriesCard 
                        key={story.id} 
                        {...story} 
                        commentsList={storyComments} 
                    />
                );
            }) : <p>No stories found.</p>}
        </div>
    );
}

export default StoriesList;
