import { useEffect, useState } from "react";
import axios from "axios"; 
import StoriesCard from "../components/StoriesCard";
import { useSearchParams } from "react-router-dom";
import LoadingSkeleton from "../components/LoadingSkeleton";

// Loads stories and comments, applies the URL search filter, and renders story cards.
function StoriesList() {
    // null indicates stories have not loaded yet; the loading flag controls the initial view.
    const [allStories, setAllstories] = useState(null);
    const [allComments, setAllComments] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    // Read the search query added by the navbar's search form.
    const [searchParams] = useSearchParams();
    // Normalize the query so matching ignores leading/trailing whitespace and capitalization.
    const searchTerm = (searchParams.get("search") ?? "").trim().toLowerCase();

    // Fetch data once when this page component first appears.
    useEffect(() => {
        getData(); 
    }, []);

    // Request both resources concurrently, then save them in component state.
    const getData = async () => {
        try {
            // Chamada paralela aos endpoints exatos do teu JSON Server
            const [storiesResponse, commentsResponse] = await Promise.all([
                axios.get("https://module-2-json-server.onrender.com/stories"),
               axios.get("https://module-2-json-server.onrender.com/comments"),
            ]);

            setAllstories(storiesResponse.data);
            setAllComments(commentsResponse.data);
            // Stop showing the loading message after the responses are stored.
            setIsLoading(false);
        }
        catch (error) {
            console.log("Erro ao carregar dados:", error);
            // Stop loading even if a request fails so the page does not wait forever.
            setIsLoading(false);
        }
    };

    // Return early while the API requests are still pending.
    if (isLoading) return <LoadingSkeleton />;

    // Keep stories whose title or genre contains the search text; an empty query matches all.
    const matchingStories = allStories?.filter((story) => {
        const title = String(story.title ?? "").toLowerCase();
        const genre = String(story.genre ?? "").toLowerCase();
        return title.includes(searchTerm) || genre.includes(searchTerm);
    }) ?? [];

    // Render a card per match, with only that story's comments, or an empty-search result message.
    return (
        <div className="StoriesList">
            {matchingStories.length > 0 ? matchingStories.map((story) => {
                // Filtra os comentários cujo storyId seja igual ao id da história atual
                const storyComments = allComments 
                    ? allComments.filter(comment => String(comment.storyId) === String(story.id))
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
