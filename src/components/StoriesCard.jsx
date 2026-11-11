import { Link } from "react-router-dom";
import UserLogo from "../assets/UserLogo.png";
import { useState } from "react";

// Adicionado o 'id' (ou '_id' se o teu json-server usar ids com underscore)
function StoriesCard({ id, title, author, genre, content, commentsList,likes }) {
    const [likeCount, setLikeCount] = useState(likes ?? 0);
    const [commentsVisible, setCommentsVisible] = useState(false);

    return (
        <div className="StoriesCard">
            
            <h2>
                
                <Link to={`/stories/${id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                    {title}
                </Link>
            </h2>
            <h3>{author}</h3>
            <h4>{genre}</h4>
            <p>{content}</p>
            <div className="LikesBox">
            <button type="button" onClick={() => setLikeCount((currentLikes) => currentLikes + 1)}>Like</button>
            <p>{likeCount}</p>
            <button
                type="button"
                onClick={() => setCommentsVisible((visible) => !visible)}
                aria-expanded={commentsVisible}
            >
                {commentsVisible ? "Comments" : "Comments"}
            </button>
            </div>

            <hr className="AboveHr"/>
            
            {commentsVisible && <aside>
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
            </aside>}
        </div>
    );
}

export default StoriesCard;
