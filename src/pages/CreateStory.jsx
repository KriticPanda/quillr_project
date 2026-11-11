import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

// Page for creating and saving a new story.
export default function CreateStory() {
  // Provides programmatic navigation after the story has been saved.
  const navigate = useNavigate();
  // Each state value holds the current text for one controlled form field.
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [genre, setGenre] = useState("");
  const [content, setContent] = useState(""); // Mapeado para 'content' para o teu JSON

  // Prevent a page reload, create the story object, and send it to the API.
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Corpo estruturado com as propriedades do teu ficheiro JSON real
    const body = {
      title: title,
      author: author,
      genre: genre,
      content: content,
      companyId: "1234", // O teu ID obrigatório
      likes: 0,
      commentIds: [],
    };

    try {
      // CORREÇÃO: URL completo e correto da tua API remota
      await axios.post(
        "https://module-2-json-server.onrender.com/stories",
        body,
      );

      // Volta para a página inicial da tua app
      navigate("/");
    } catch (error) {
      // Log the request error so a failed save can be diagnosed.
      console.log("Erro ao submeter os dados:", error);
    }
  };

  // The inputs are controlled: their values come from state and onChange updates it.
  return (
    <div className="CreateStory">
      <h3>New Story</h3>
      {/* Submitting this form calls handleSubmit above. */}
      <form onSubmit={handleSubmit}>
        <label>Title:</label>
        {/* Save each edit to the matching state variable. */}
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

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
