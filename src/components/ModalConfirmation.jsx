import React from 'react';
import '../styles/cart-card.css';
import { GiConfirmed } from 'react-icons/gi';
import data from '../data.json';
import { useEffect, useRef } from 'react';

function ModalConfirmation({ items, resetCart }) {
  const modalRef = useRef(null);
  const itemsInCart = items;
  const totalValue = items.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  useEffect(() => {
    const handleScroll = () => {
      if (modalRef.current) {
        modalRef.current.style.top = `${window.scrollY + 50}px`;
      }
    };

    window.addEventListener('scroll', handleScroll);

    handleScroll();
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div className="cart-card modal-confirmation" ref={modalRef}>
      <GiConfirmed className="confirmed-icon" />
      <h1 className="modal-heading">Order confirmed</h1>
      <p className="modal-subheading">We hope you enjoy your food!</p>
      {/* HERE MAP OVER CART ITEMS PASSED FROM APP COMPONENT */}
      {itemsInCart.map((item, index) => {
        return (
          <div className="item item-modal-window" key={index}>
            <img
              src={data[item.id].image.mobile}
              alt="small icon of item in cart"
              className="small-item-icon"
            />
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
          </div>
        );
      })}
      <div className="total">
        <p>Order total</p>
        <p className="total-cart-price">${totalValue}</p>
      </div>
      <button className="confirm-btn" onClick={resetCart}>
        Start new order
      </button>
    </div>
  );
}

export default ModalConfirmation;
