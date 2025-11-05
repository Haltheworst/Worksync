import React, { useState } from 'react';
import { Avatar, Button } from '../../components';
import './CommentList.css';

const CommentList = ({ submissionId }) => {
  const [newComment, setNewComment] = useState('');
  
  // Comments from your SQL database
  const allComments = {
    801: [
      {
        id: 901,
        author: 'Preity Sharma',
        timestamp: '2025-02-16 14:30:00',
        text: 'Looks good, please refine flow diagrams.'
      }
    ],
    802: [
      {
        id: 902,
        author: 'Rajbir Biswas',
        timestamp: '2025-03-21 15:45:00',
        text: 'Great work, NLP model needs more training data.'
      }
    ],
    803: [
      {
        id: 903,
        author: 'Srijan Sen',
        timestamp: '2025-04-11 10:20:00',
        text: 'Dataset verified and approved.'
      }
    ]
  };

  const comments = allComments[submissionId] || [];

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Posting comment:', newComment);
    setNewComment('');
  };

  return (
    <div className="comment-list">
      {comments.length === 0 ? (
        <div className="empty-state">
          <p className="empty-state__message">No comments yet. Start the conversation!</p>
        </div>
      ) : (
        <ul className="comment-list__items">
          {comments.map(comment => (
            <li key={comment.id} className="comment-list__item">
              <Avatar name={comment.author} size="small" />
              <div className="comment-list__content">
                <div className="comment-list__header">
                  <span className="body">{comment.author}</span>
                  <time className="caption text-muted" dateTime={comment.timestamp}>
                    {comment.timestamp}
                  </time>
                </div>
                <p className="body">{comment.text}</p>
              </div>
            </li>
          ))}
        </ul>
      )}

      <form className="comment-list__form" onSubmit={handleSubmit}>
        <textarea
          className="comment-list__textarea"
          placeholder="Add a comment..."
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          rows="3"
        />
        <Button type="submit" variant="primary" size="medium">
          Post Comment
        </Button>
      </form>
    </div>
  );
};

export default CommentList;
