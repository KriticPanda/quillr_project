import UserLogo from "../assets/UserLogo.png";

function StoriesCard({ title, author, genre, content, commentsList }) {
    return (
        <div className="StoriesCard">
            <h2>{title}</h2>
            <h3>{author}</h3>
            <h4>{genre}</h4>
            <p>{content}</p>

            <hr />
            
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
