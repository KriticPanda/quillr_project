import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios"; // used for calling the API
import StoriesCard from "../components/StoriesCard";

export default function StoryDetails() {

    const { storyId } = useParams();

    const [story, setStory] = useState(null);
    const [storyComments, setStoryComments] = useState([]); // Criado estado para guardar os comentários desta história
    const [isLoading, setIsLoading] = useState(true); 

    useEffect(() => {
        getData();
    }, [storyId]); // Executa quando o id muda

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
                (comment) => comment.storyId === storyId
            );
            setStoryComments(filteredComments);

            setIsLoading(false);
        }
        catch (error) {
            console.log("Erro ao carregar os detalhes e comentários:", error);
            setIsLoading(false);
        }
    };

    if (isLoading) return <h3>Loading...</h3>;
    if (!story) return <h3>Story not found.</h3>;

    return (
        <div className="StoryDetails">
            {/* Passamos o objeto da história e injetamos a commentsList filtrada manualmente */}
            <StoriesCard 
                key={story.id} 
                {...story} 
                commentsList={storyComments} 
            />
        </div>
    );
}
