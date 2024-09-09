import React from 'react';
import '../styles/product-card.css';
import { MdAddShoppingCart } from 'react-icons/md';
import QuantityButton from './QuantityButton';

function ProductCard({
  id,
  category,
  image,
  name,
  price,
  addItem,
  quantity,
  decrement,
}) {
  const customStyle =
    quantity > 0
      ? { border: '3px solid hsl(14, 86%, 42%)' }
      : { border: 'none' };

  function handleAddItem() {
    const itemToAdd = { id, name, price };
    addItem(itemToAdd);
  }

  function handleDecrement() {
    console.log(id);
    decrement(id);
  }

  return (
    <div className="product-card">
      <img src={image} alt={name} className="product-img" style={customStyle} />
      <div className="product-card-description">
        <p className="category">{category}</p>
        <h1 className="product-name">{name}</h1>
        <p className="product-price">${price}</p>
        {quantity > 0 ? (
          <QuantityButton
            quantity={quantity}
            onAdd={handleAddItem}
            onDecrement={handleDecrement}
          />
        ) : (
          <button className="add-to-cart-btn" onClick={handleAddItem}>
            <MdAddShoppingCart className="cart-icon" />
            Add to cart
          </button>
        )}
      </div>
    </div>
  );
}

export default ProductCard;
