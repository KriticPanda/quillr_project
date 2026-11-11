import { Link } from "react-router-dom";
import UserLogo from "../assets/UserLogo.png";
import { useEffect, useState } from "react";
import axios from "axios";

// Adicionado o 'id' (ou '_id' se o teu json-server usar ids com underscore)
// Displays one story and manages its like counter and comments interaction.
function StoriesCard({ id, title, author, genre, content, commentsList,likes }) {
    // Initialize the visible like count from the story, or use zero if it has no count.
    const [likeCount, setLikeCount] = useState(likes ?? 0);
    // Controls whether the comments section is expanded.
    const [commentsVisible, setCommentsVisible] = useState(false);
    // Local copy of comments lets this card display a newly submitted comment immediately.
    const [comments, setComments] = useState(commentsList ?? []);
    // Stores the text currently typed into the comment input.
    const [newComment, setNewComment] = useState("");
    // Prevents duplicate submits and communicates the in-progress state to the button.
    const [isSubmittingComment, setIsSubmittingComment] = useState(false);
    // Holds an error message if the comment API request fails.
    const [commentError, setCommentError] = useState("");

    // Refresh local comments when the parent supplies a changed comments list.
    useEffect(() => {
        setComments(commentsList ?? []);
    }, [commentsList]);

    // Send the new comment to the API when the comment form is submitted.
    async function handleCommentSubmit(event) {
        // Keep submission in the React handler instead of reloading the page.
        event.preventDefault();
        // Trim whitespace so a comment containing only spaces cannot be submitted.
        const text = newComment.trim();
        // Ignore empty text and repeated clicks while a request is already in progress.
        if (!text || isSubmittingComment) return;

        // Show the pending state and clear any previous failure message.
        setIsSubmittingComment(true);
        setCommentError("");

        try {
            // Associate the text with this story and send it to the comments endpoint.
            const response = await axios.post(
                "https://module-2-json-server.onrender.com/comments",
                { storyId: id, user: "Anonymous", text }
            );
            // Append the API's saved comment to the current list without mutating the old array.
            setComments((currentComments) => [...currentComments, response.data]);
            // Clear the input only after the comment has been saved successfully.
            setNewComment("");
        } catch (error) {
            // Log the underlying error for debugging and show a readable message to the user.
            console.error("Failed to post comment:", error);
            setCommentError("Could not post your comment. Please try again.");
        } finally {
            // Restore the button regardless of whether the request succeeded or failed.
            setIsSubmittingComment(false);
        }
    }

    // Render the story, controls, and (when expanded) its comments.
    return (
        <div className="StoriesCard">
            
            <h2>
                
                {/* Open this story's detail page when its title is clicked. */}
                <Link to={`/stories/${id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                    {title}
                </Link>
            </h2>
            <h3>{author}</h3>
            <h4>{genre}</h4>
            <p>{content}</p>
            <div className="LikesBox">
            {/* Update this card's like count in React state when clicked. */}
           <div className="like-buttons">
            <button id="like-button" type="button" onClick={() => setLikeCount((currentLikes) => currentLikes + 1)}>Like</button>
            <p>{likeCount}</p>
            </div>
            {/* Toggle the comments panel; aria-expanded communicates its state to assistive technology. */}
            <button id="comment-button"
                type="button"
                onClick={() => setCommentsVisible((visible) => !visible)}
                aria-expanded={commentsVisible}
            >
                {commentsVisible ? "Comments" : "Comments"}
            </button>
            </div>
            <hr/>

           
            
            {/* Render the comments area only while it is expanded. */}
            {commentsVisible && <aside>
                
                <h5>Comments</h5>

                {/* Controlled form: React state tracks the text and the handler submits it. */}
                <form onSubmit={handleCommentSubmit}>
                    {/* Update the controlled input state as the user types. */}
                    <input
                        type="text"
                        placeholder="Add a comment..."
                        aria-label="Add a comment"
                        value={newComment}
                        onChange={(event) => setNewComment(event.target.value)}
                        required
                    />
                    {/* Disable empty or duplicate submissions and show progress during the request. */}
                    <button  type="submit" disabled={isSubmittingComment || !newComment.trim()}>
                        {isSubmittingComment ? "Submitting..." : "Submit"}
                    </button>
                </form>
                {/* role=alert announces the failure message to assistive technology. */}
                {commentError && <p role="alert">{commentError}</p>}
                {/* Show each comment, or a helpful empty state if there are none yet. */}
                {comments.length > 0 ? (
                    comments.map((comment) => (
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
