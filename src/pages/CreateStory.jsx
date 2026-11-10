import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function CreateStory() {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [author, setAuthor] = useState("");
  const [genre, setGenre] = useState("");
  const [content, setContent] = useState(""); // Mapeado para 'content' para o teu JSON

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
      console.log("Erro ao submeter os dados:", error);
    }
  };

  return (
    <div className="CreateStory">
      <h3>New Story</h3>
      <form onSubmit={handleSubmit}>
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

        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
