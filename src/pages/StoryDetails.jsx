import { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom"; // CORREÇÃO: Importado o Link e o useNavigate
import axios from "axios"; // used for calling the API
import StoriesCard from "../components/StoriesCard";

// Loads and displays one story together with its comments and navigation actions.
export default function StoryDetails() {

    // Get the story ID from a URL such as /stories/123.
    const { storyId } = useParams();

    // Store the fetched story, its comments, and whether the request is still in progress.
    const [story, setStory] = useState(null);
    const [storyComments, setStoryComments] = useState([]); // Criado estado para guardar os comentários desta história
    const [isLoading, setIsLoading] = useState(true); 

    // Reload the story and comments if the URL changes to a different story ID.
    useEffect(() => {
        getData();
    }, [storyId]); // Executa quando o id muda

    // Fetch the requested story and the comments needed to find its matching comments.
    const getData = async () => {
        try {
            // Fazemos chamadas paralelas para poupar tempo, tal como no StoriesList
            const [storyResponse, commentsResponse] = await Promise.all([
                axios.get(`https://module-2-json-server.onrender.com/stories/${storyId}`),
                axios.get("https://module-2-json-server.onrender.com/comments")
            ]);

            // Guardamos a história única
            setStory(storyResponse.data);

            // Filtramos todos os comentários da API para encontrar apenas os que pertencem a esta história (storyId)
            const filteredComments = commentsResponse.data.filter(
                (comment) => String(comment.storyId) === String(storyId)
            );
            setStoryComments(filteredComments);

            setIsLoading(false);
        }
        catch (error) {
            console.log("Erro ao carregar os detalhes e comentários:", error);
            // Leave loading state so the page can display its not-found fallback.
            setIsLoading(false);
        }
    };

    // Render loading and missing-story states before trying to display story properties.
    if (isLoading) return <h3>Loading...</h3>;
    if (!story) return <h3>Story not found.</h3>;

    // Reuse StoriesCard for the story and its comment interaction; provide detail-page actions too.
    return (
        <div className="StoryDetails">
            {/* Passamos o objeto da história e injetamos a commentsList filtrada manualmente */}
            <StoriesCard 
                key={story.id} 
                {...story} 
                commentsList={storyComments} 
            />

             {/* Return to the home page and its complete story list. */}
             <Link to="/">
        <button>Back to projects</button>
      </Link>

        {/* Open the edit form for this story. */}
        <Link to={`/stories/edit/${story.id}`}>
        <button>Edit Project</button>
      </Link>
        </div>
    );
}
