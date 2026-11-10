import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios"; // used for calling the API

export default function EditStory() {
  const navigate = useNavigate();
  const { storyId } = useParams();

  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [genre, setGenre] = useState("");
  const [content, setContent] = useState("");

  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const getData = async () => {
      // Impede o pedido se o storyId ainda não estiver disponível
      if (!storyId) return; 
      
      try {
        const response = await axios.get(`https://module-2-json-server.onrender.com/stories/${storyId}`);
        setTitle(response.data.title);
        setAuthor(response.data.author);
        setGenre(response.data.genre);
        setContent(response.data.content);
      } catch (error) {
        console.log("Erro ao carregar história:", error);
      } finally {
        setIsLoading(false);
      }
    };
    getData();
  }, [storyId]); // CORREÇÃO: Adicionado o storyId como dependência para disparar assim que ele existir

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const body = {
      title: title,
      author: author,
      genre: genre,
      content: content,
      companyId: "1234", 
      likes: 0,
      commentIds: [],
    };
    try {
      await axios.put(`https://module-2-json-server.onrender.com/stories/${storyId}`, body);
      navigate(`/stories/${storyId}`);
    } catch (error) {
      console.log("Erro ao atualizar:", error);
    }
  };

  const deleteStory = async () => {
    try {
      await axios.delete(`https://module-2-json-server.onrender.com/stories/${storyId}`);
      // CORREÇÃO: Redirecionar para a HomePage '/' e não para os detalhes da história apagada
      navigate('/'); 
    } catch (error) {
      console.log("Erro ao eliminar:", error);
    }
  };

  if (isLoading) return <h3>Loading...</h3>;

  return (
    <div className="EditStoryPage">
      <h3>Edit Story</h3>

      <form onSubmit={handleFormSubmit}>
        <label>Title:</label>
        <input
          type="text"
          name="title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />

        <label>Author:</label>
        <input
          type="text"
          name="author"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
        />

        <label>Genre:</label>
        <input
          type="text"
          name="genre"
          value={genre}
          onChange={(e) => setGenre(e.target.value)}
        />

        <label>Story:</label>
        <textarea
          name="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows="5"
        />
        <button type="submit">Update Story</button>
      </form>

      {/* Botão de remoção fora do formulário */}
      <button onClick={deleteStory} className="delete-btn">Delete Story</button> 
    </div>
  );
}
