import React, { useState, useEffect } from 'react';
import './ReviewSystem.css';

const REVIEWS_STORAGE_KEY = 'fundiConnectReviews';

const parseStorage = (key, fallback) => {
  try {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : fallback;
  } catch (error) {
    console.warn(`Failed to parse storage for ${key}:`, error);
    return fallback;
  }
};

const initialReviews = [
  {
    id: 1,
    fundiName: 'Jane Fundi',
    reviewerName: 'Client User',
    rating: 5,
    title: 'Excellent Work!',
    comment: 'Jane did an outstanding job with my electrical installation. Very professional and completed on time.',
    date: '2026-04-10',
    helpful: 12,
    verified: true,
  },
  {
    id: 2,
    fundiName: 'Jane Fundi',
    reviewerName: 'Alice Johnson',
    rating: 4,
    title: 'Good Service',
    comment: 'Good work overall. Minor issues with communication but the final result was great.',
    date: '2026-04-05',
    helpful: 8,
    verified: true,
  },
  {
    id: 3,
    fundiName: 'David Fundi',
    reviewerName: 'Client User',
    rating: 5,
    title: 'Fast and Reliable',
    comment: 'David was very quick to respond and completed the work efficiently. Highly recommended!',
    date: '2026-04-02',
    helpful: 15,
    verified: true,
  },
  {
    id: 4,
    fundiName: 'David Fundi',
    reviewerName: 'Bob Smith',
    rating: 3,
    title: 'Average Experience',
    comment: 'Work was done correctly but took longer than expected.',
    date: '2026-03-28',
    helpful: 4,
    verified: true,
  },
  {
    id: 5,
    fundiName: 'John Doe',
    reviewerName: 'Client User',
    rating: 5,
    title: 'Perfect Carpentry Work',
    comment: 'John crafted beautiful custom woodwork. Attention to detail is impressive.',
    date: '2026-03-20',
    helpful: 20,
    verified: true,
  },
];

function ReviewSystem({ userType = 'client', userName = 'Client User' }) {
  const [view, setView] = useState('browse'); // 'browse', 'my-reviews', 'write-review'
  const [reviews, setReviews] = useState([]);
  const [selectedFundi, setSelectedFundi] = useState('');
  const [rating, setRating] = useState(5);
  const [title, setTitle] = useState('');
  const [comment, setComment] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [ratingFilter, setRatingFilter] = useState('');
  const [sortBy, setSortBy] = useState('recent');
  const [fundis] = useState(['Jane Fundi', 'David Fundi', 'John Doe', 'Peter Jones', 'Mary Wanjiku']);

  // Load reviews from localStorage
  useEffect(() => {
    setReviews(parseStorage(REVIEWS_STORAGE_KEY, initialReviews));
  }, []);

  // Save reviews to localStorage
  useEffect(() => {
    localStorage.setItem(REVIEWS_STORAGE_KEY, JSON.stringify(reviews));
  }, [reviews]);

  const handleSubmitReview = (e) => {
    e.preventDefault();

    if (!selectedFundi || !rating || !title.trim() || !comment.trim()) {
      alert('Please fill in all required fields');
      return;
    }

    // Check if user already reviewed this fundi
    const alreadyReviewed = reviews.some(
      r => r.fundiName === selectedFundi && r.reviewerName === userName
    );

    if (alreadyReviewed) {
      alert('You have already reviewed this fundi');
      return;
    }

    const newReview = {
      id: reviews.length ? Math.max(...reviews.map(r => r.id)) + 1 : 1,
      fundiName: selectedFundi,
      reviewerName: userName,
      rating: parseInt(rating),
      title: title.trim(),
      comment: comment.trim(),
      date: new Date().toISOString().split('T')[0],
      helpful: 0,
      verified: true,
    };

    setReviews([...reviews, newReview]);
    setSelectedFundi('');
    setRating(5);
    setTitle('');
    setComment('');
    setSuccessMessage('Review posted successfully!');
    setTimeout(() => setSuccessMessage(''), 3000);
    setView('browse');
  };

  const handleMarkHelpful = (reviewId) => {
    setReviews(reviews.map(r =>
      r.id === reviewId ? { ...r, helpful: r.helpful + 1 } : r
    ));
  };

  const handleDeleteReview = (reviewId) => {
    if (window.confirm('Are you sure you want to delete this review?')) {
      setReviews(reviews.filter(r => r.id !== reviewId));
      setSuccessMessage('Review deleted');
      setTimeout(() => setSuccessMessage(''), 3000);
    }
  };

  const getFundiRating = (fundiName) => {
    const fundiReviews = reviews.filter(r => r.fundiName === fundiName);
    if (fundiReviews.length === 0) return 0;
    const average = fundiReviews.reduce((sum, r) => sum + r.rating, 0) / fundiReviews.length;
    return average.toFixed(1);
  };

  const getFundiReviewCount = (fundiName) => {
    return reviews.filter(r => r.fundiName === fundiName).length;
  };

  const getUserReviews = () => {
    return reviews.filter(r => r.reviewerName === userName);
  };

  const getDisplayedReviews = () => {
    let displayed = selectedFundi
      ? reviews.filter(r => r.fundiName === selectedFundi)
      : reviews;

    if (ratingFilter) {
      displayed = displayed.filter(r => r.rating === parseInt(ratingFilter));
    }

    if (sortBy === 'recent') {
      displayed.sort((a, b) => new Date(b.date) - new Date(a.date));
    } else if (sortBy === 'highest') {
      displayed.sort((a, b) => b.rating - a.rating);
    } else if (sortBy === 'lowest') {
      displayed.sort((a, b) => a.rating - b.rating);
    } else if (sortBy === 'helpful') {
      displayed.sort((a, b) => b.helpful - a.helpful);
    }

    return displayed;
  };

  const renderStars = (rating, size = 'medium') => {
    return (
      <div className={`stars ${size}`}>
        {[1, 2, 3, 4, 5].map(i => (
          <span
            key={i}
            className={`star ${i <= rating ? 'filled' : 'empty'}`}
          >
            ★
          </span>
        ))}
      </div>
    );
  };

  const renderBrowseView = () => (
    <div className="browse-view">
      <h2>Browse Reviews</h2>

      <div className="filters-section">
        <div className="filter-group">
          <label>Filter by Fundi:</label>
          <select value={selectedFundi} onChange={(e) => setSelectedFundi(e.target.value)}>
            <option value="">All Fundis</option>
            {fundis.map(f => (
              <option key={f} value={f}>{f}</option>
            ))}
          </select>
        </div>

        <div className="filter-group">
          <label>Filter by Rating:</label>
          <select value={ratingFilter} onChange={(e) => setRatingFilter(e.target.value)}>
            <option value="">All Ratings</option>
            <option value="5">5 Stars</option>
            <option value="4">4 Stars</option>
            <option value="3">3 Stars</option>
            <option value="2">2 Stars</option>
            <option value="1">1 Star</option>
          </select>
        </div>

        <div className="filter-group">
          <label>Sort by:</label>
          <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
            <option value="recent">Most Recent</option>
            <option value="highest">Highest Rated</option>
            <option value="lowest">Lowest Rated</option>
            <option value="helpful">Most Helpful</option>
          </select>
        </div>
      </div>

      {selectedFundi && (
        <div className="fundi-rating-card">
          <div className="rating-content">
            <h3>{selectedFundi}</h3>
            <div className="rating-display">
              {renderStars(Math.round(getFundiRating(selectedFundi)))}
              <span className="rating-number">{getFundiRating(selectedFundi)}</span>
              <span className="review-count">({getFundiReviewCount(selectedFundi)} reviews)</span>
            </div>
          </div>
        </div>
      )}

      <div className="reviews-list">
        {getDisplayedReviews().length === 0 ? (
          <div className="empty-state">
            <p>No reviews found. {userType === 'client' ? 'Be the first to review!' : ''}</p>
          </div>
        ) : (
          getDisplayedReviews().map(review => (
            <div key={review.id} className="review-card">
              <div className="review-header">
                <div className="reviewer-info">
                  <h4>{review.title}</h4>
                  {renderStars(review.rating, 'small')}
                </div>
                {review.verified && <span className="verified-badge">✓ Verified</span>}
              </div>

              <div className="reviewer-details">
                <span className="reviewer-name">{review.reviewerName}</span>
                <span className="review-date">{new Date(review.date).toLocaleDateString()}</span>
              </div>

              <p className="review-comment">{review.comment}</p>

              <div className="review-footer">
                <button
                  className="helpful-button"
                  onClick={() => handleMarkHelpful(review.id)}
                >
                  👍 Helpful ({review.helpful})
                </button>

                {userType === 'client' && review.reviewerName === userName && (
                  <button
                    className="delete-button"
                    onClick={() => handleDeleteReview(review.id)}
                  >
                    🗑️ Delete
                  </button>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );

  const renderMyReviewsView = () => {
    const userReviews = getUserReviews();

    return (
      <div className="my-reviews-view">
        <h2>My Reviews</h2>

        <div className="reviews-summary">
          <div className="summary-card">
            <h4>Total Reviews</h4>
            <span className="summary-number">{userReviews.length}</span>
          </div>
          <div className="summary-card">
            <h4>Average Rating</h4>
            <span className="summary-number">
              {userReviews.length > 0
                ? (userReviews.reduce((sum, r) => sum + r.rating, 0) / userReviews.length).toFixed(1)
                : 'N/A'}
            </span>
          </div>
          <div className="summary-card">
            <h4>Total Helpful Votes</h4>
            <span className="summary-number">
              {userReviews.reduce((sum, r) => sum + r.helpful, 0)}
            </span>
          </div>
        </div>

        <div className="reviews-list">
          {userReviews.length === 0 ? (
            <div className="empty-state">
              <p>You haven't written any reviews yet.</p>
              <button className="primary-button" onClick={() => setView('write-review')}>
                Write Your First Review
              </button>
            </div>
          ) : (
            userReviews
              .sort((a, b) => new Date(b.date) - new Date(a.date))
              .map(review => (
                <div key={review.id} className="review-card">
                  <div className="review-header">
                    <div className="reviewer-info">
                      <h4>{review.title}</h4>
                      {renderStars(review.rating, 'small')}
                    </div>
                    <span className="fundi-name">→ {review.fundiName}</span>
                  </div>

                  <div className="reviewer-details">
                    <span className="review-date">{new Date(review.date).toLocaleDateString()}</span>
                    <span className="helpful-count">👍 {review.helpful} found helpful</span>
                  </div>

                  <p className="review-comment">{review.comment}</p>

                  <div className="review-footer">
                    <button
                      className="delete-button"
                      onClick={() => handleDeleteReview(review.id)}
                    >
                      🗑️ Delete
                    </button>
                  </div>
                </div>
              ))
          )}
        </div>
      </div>
    );
  };

  const renderWriteReviewView = () => (
    <div className="write-review-view">
      <h2>Write a Review</h2>

      {successMessage && <div className="success-message">{successMessage}</div>}

      <form className="review-form" onSubmit={handleSubmitReview}>
        <div className="form-group">
          <label>
            Select Fundi <span className="required">*</span>
          </label>
          <select value={selectedFundi} onChange={(e) => setSelectedFundi(e.target.value)}>
            <option value="">-- Choose a Fundi --</option>
            {fundis.map(f => (
              <option key={f} value={f}>{f}</option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label>
            Rating <span className="required">*</span>
          </label>
          <div className="rating-input">
            <div className="star-selector">
              {[1, 2, 3, 4, 5].map(i => (
                <label key={i} className="star-label">
                  <input
                    type="radio"
                    name="rating"
                    value={i}
                    checked={rating === i}
                    onChange={(e) => setRating(e.target.value)}
                  />
                  <span className={`star ${i <= rating ? 'filled' : 'empty'}`}>★</span>
                </label>
              ))}
            </div>
            <span className="rating-text">
              {rating === 1 && 'Poor'}
              {rating === 2 && 'Fair'}
              {rating === 3 && 'Good'}
              {rating === 4 && 'Very Good'}
              {rating === 5 && 'Excellent'}
            </span>
          </div>
        </div>

        <div className="form-group">
          <label>
            Review Title <span className="required">*</span>
          </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Summarize your experience in a few words"
            maxLength="100"
          />
          <small>{title.length}/100</small>
        </div>

        <div className="form-group">
          <label>
            Your Review <span className="required">*</span>
          </label>
          <textarea
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            placeholder="Share your experience with this fundi. What went well? What could be improved?"
            maxLength="1000"
            rows="6"
          />
          <small>{comment.length}/1000</small>
        </div>

        <div className="form-actions">
          <button type="submit" className="submit-button">Submit Review</button>
          <button
            type="button"
            className="cancel-button"
            onClick={() => setView('browse')}
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );

  return (
    <div className="review-system-container">
      <div className="review-header">
        <h1>Ratings & Reviews</h1>
        <p>Help others make informed decisions by sharing your experience</p>
      </div>

      <div className="view-tabs">
        <button
          className={`tab-button ${view === 'browse' ? 'active' : ''}`}
          onClick={() => setView('browse')}
        >
          ⭐ Browse Reviews
        </button>
        <button
          className={`tab-button ${view === 'my-reviews' ? 'active' : ''}`}
          onClick={() => setView('my-reviews')}
        >
          📝 My Reviews
        </button>
        {userType === 'client' && (
          <button
            className={`tab-button ${view === 'write-review' ? 'active' : ''}`}
            onClick={() => setView('write-review')}
          >
            ✍️ Write Review
          </button>
        )}
      </div>

      <div className="view-content">
        {view === 'browse' && renderBrowseView()}
        {view === 'my-reviews' && renderMyReviewsView()}
        {view === 'write-review' && renderWriteReviewView()}
      </div>
    </div>
  );
}

export default ReviewSystem;