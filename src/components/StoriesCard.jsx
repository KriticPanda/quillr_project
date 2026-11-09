function StoriesCard({ title, author, genre, content, commentsList }) {
    return (
        <div className="StoriesCard">
            <h2>{title}</h2>
            <h3>{author}</h3>
            <h4>{genre}</h4>
            <p>{content}</p>
            
            <aside>
                <h5>Comments</h5>
                {commentsList && commentsList.length > 0 ? (
                    commentsList.map((comment) => (
                        <div key={comment.id} className="comment-item">
                            <img 
                                src={comment.userProfilePicture} 
                                alt={comment.user} 
                            />
                            <div>
                                <strong>{comment.user}</strong>
                                <p>{comment.text}</p>
                            </div>
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
