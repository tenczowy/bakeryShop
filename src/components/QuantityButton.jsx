import React from 'react';
import '../styles/product-card.css';

function QuantityButton({ quantity, onAdd, onDecrement }) {
  const incrementIcon = '/assets/images/icon-increment-quantity.svg';
  const decrementIcon = '/assets/images/icon-decrement-quantity.svg';

  return (
    <button className="add-to-cart-btn quantity-btn">
      <img
        src={decrementIcon}
        alt="decrement icon"
        className="quantity-btn-icon quantity-btn-icon-decrement"
        onClick={() => {
          onDecrement();
        }}
      />
      <p style={{ color: 'white' }}>{quantity}</p>
      <img
        src={incrementIcon}
        alt="increment icon"
        className="quantity-btn-icon"
        onClick={() => {
          onAdd();
        }}
      />
    </button>
  );
}

export default QuantityButton;
