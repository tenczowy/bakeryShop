import React from 'react';
import '../styles/cart-card.css';
import { TiDeleteOutline } from 'react-icons/ti';
import { MdDeliveryDining } from 'react-icons/md';
function CartCard({ items, deleteItems, confirmOrder }) {
  const itemsInCart = items;
  const totalValue = items.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  function handleDelete(itemId) {
    deleteItems(itemId);
  }

  if (itemsInCart.length === 0) {
    return (
      <div className="cart-card">
        <h1 style={{ fontSize: '2em' }}>Your cart (0)</h1>
        <img
          style={{ scale: '0.75' }}
          src="./assets/images/illustration-empty-cart.svg"
          alt="empty cart placeholder"
        />
        <p style={{ fontSize: '0.9rem', textAlign: 'center', color: 'grey' }}>
          Your added items will appear here
        </p>
      </div>
    );
  }

  return (
    <div className="cart-card">
      <h1>Your cart ({items.length})</h1>
      {/* HERE MAP OVER CART ITEMS PASSED FROM APP COMPONENT */}
      {itemsInCart.map((item, index) => {
        return (
          <div className="item" key={index}>
            <div className="description">
              <h2 className="name">{item.name}</h2>
              <div className="price">
                <p>
                  <span className="quantity">{item.quantity}</span>{' '}
                  <span className="price-per-item">@ ${item.price}</span>{' '}
                  <span className="total-price">
                    ${item.quantity * item.price}
                  </span>
                </p>
              </div>
            </div>
            <TiDeleteOutline
              className="delete-icon"
              onClick={() => {
                handleDelete(item.id);
              }}
            />
          </div>
        );
      })}

      <div className="total">
        <p>Order total</p>
        <p className="total-cart-price">${totalValue}</p>
      </div>
      <div className="delivery-info">
        <MdDeliveryDining className="delivery-icon" />
        <p>
          This is a <b>carbon-neutral</b> delivery
        </p>
      </div>
      <button className="confirm-btn" onClick={confirmOrder}>
        Confirm Order
      </button>
    </div>
  );
}

export default CartCard;
