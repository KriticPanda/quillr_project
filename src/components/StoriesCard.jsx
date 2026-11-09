import { Link } from "react-router-dom";
import UserLogo from "../assets/UserLogo.png";

// Adicionado o 'id' (ou '_id' se o teu json-server usar ids com underscore)
function StoriesCard({ id, title, author, genre, content, commentsList }) {
    return (
        <div className="StoriesCard">
            
            <h2>
                {/* O link clica no título e vai exatamente para a rota configurada no teu App.jsx */}
                <Link to={`/stories/${id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                    {title}
                </Link>
            </h2>
            <h3>{author}</h3>
            <h4>{genre}</h4>
            <p>{content}</p>

            <hr className="AboveHr"/>
            
            <aside>
                <h5>Comments</h5>
                {commentsList && commentsList.length > 0 ? (
                    commentsList.map((comment) => (
                        <div key={comment.id} className="comment-item">
                            
                            <div className="UserPlate">
                                <img 
                                    src={UserLogo} 
                                    alt={comment.user} 
                                />
                                <strong>{comment.user}</strong>
                            </div>
                            <div>
                                <p>{comment.text}</p>
                            </div>
                            <hr />
                        </div>
                    ))
                ) : (
                    <p>No comments yet.</p>
                )}
            </aside>
        </div>
    );
}

export default StoriesCard;
