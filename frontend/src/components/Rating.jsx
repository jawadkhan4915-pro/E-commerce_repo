import React from 'react';

const Rating = ({ value, numReviews, showReviews = true }) => {
    return (
        <div className="rating">
            <div className="stars">
                {[1, 2, 3, 4, 5].map((star) => (
                    <span key={star} className="star">
                        {value >= star ? (
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                                width="18"
                                height="18"
                                style={{ color: '#fbbf24' }}
                            >
                                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                            </svg>
                        ) : value >= star - 0.5 ? (
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                                width="18"
                                height="18"
                                style={{ color: '#fbbf24' }}
                            >
                                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77V2z" />
                            </svg>
                        ) : (
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                width="18"
                                height="18"
                                style={{ color: '#d1d5db' }}
                            >
                                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                            </svg>
                        )}
                    </span>
                ))}
            </div>
            {showReviews && numReviews !== undefined && (
                <span className="reviews-count">({numReviews} reviews)</span>
            )}

            <style>{`
        .rating {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }
        
        .stars {
          display: flex;
          gap: 2px;
        }
        
        .star {
          display: inline-flex;
        }
        
        .reviews-count {
          font-size: 0.875rem;
          color: var(--text-tertiary);
        }
      `}</style>
        </div>
    );
};

export default Rating;
