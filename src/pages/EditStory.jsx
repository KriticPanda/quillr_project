import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios"; // used for calling the API

// Page for loading an existing story, editing its fields, or deleting it.
export default function EditStory() {
  // Navigate after a successful update or deletion.
  const navigate = useNavigate();
  // Read the story ID from the current URL, such as /stories/edit/123.
  const { storyId } = useParams();

  // These state values hold the editable story fields shown in the form.
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [genre, setGenre] = useState("");
  const [content, setContent] = useState("");

  // Keep the form hidden until the existing story has been fetched.
  const [isLoading, setIsLoading] = useState(true);

  // Fetch the selected story when the page loads or the URL's story ID changes.
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
    // Start the asynchronous fetch defined above.
    getData();
  }, [storyId]); // CORREÇÃO: Adicionado o storyId como dependência para disparar assim que ele existir

  // Save the edited fields when the form is submitted.
  const handleFormSubmit = async (e) => {
    e.preventDefault();
    // Send only editable fields so existing likes and other story data are preserved.
    const body = {
      title: title,
      author: author,
      genre: genre,
      content: content,
    };
    try {
      // PATCH updates editable fields without replacing the rest of the story.
      await axios.patch(`https://module-2-json-server.onrender.com/stories/${storyId}`, body);
      // Return to the updated story's detail page.
      navigate(`/stories/${storyId}`);
    } catch (error) {
      console.log("Erro ao atualizar:", error);
    }
  };

  // Delete this story and return to the home page.
  const deleteStory = async () => {
    try {
      await axios.delete(`https://module-2-json-server.onrender.com/stories/${storyId}`);
      // CORREÇÃO: Redirecionar para a HomePage '/' e não para os detalhes da história apagada
      navigate('/'); 
    } catch (error) {
      console.log("Erro ao eliminar:", error);
    }
  };

  // Show a loading message instead of an empty form while the API request is pending.
  if (isLoading) return <h3>Loading...</h3>;

  // Display the fetched values in controlled inputs so each edit updates React state.
  return (
    <div className="EditStoryPage">
      <h3>Edit Story</h3>

      {/* Submitting this form saves the edited story. */}
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
        <button className="update-btn" type="submit">Update Story</button>
      </form>

      {/* Botão de remoção fora do formulário */}
      {/* This button is outside the form, so clicking it calls the delete handler directly. */}
      <button  onClick={deleteStory} className="delete-btn">Delete Story</button> 
    </div>
  );
}
