import './App.css';
import ProductCard from './components/ProductCard';
import data from './data.json';
import CartCard from './components/CartCard';
import { useState } from 'react';
import ModalConfirmation from './components/ModalConfirmation';
function App() {
  const [itemsInCart, setItemsInCart] = useState([]);
  const [showConfirmationWindow, setShowConfirmationWindow] = useState(false);

  const productData = data;

  const customStyle = {
    filter: 'blur(4px)',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    pointerEvents: 'none',
  };

  function addItem(item) {
    setItemsInCart((prevState) => {
      const existingItemIndex = prevState.findIndex(
        (cartItem) => cartItem.id === item.id
      );

      if (existingItemIndex >= 0) {
        const updatedCart = [...prevState];
        updatedCart[existingItemIndex] = {
          ...updatedCart[existingItemIndex],
          quantity: updatedCart[existingItemIndex].quantity + 1,
        };
        return updatedCart;
      } else {
        return [...prevState, { ...item, quantity: 1 }];
      }
    });
  }

  function deleteItems(id) {
    setItemsInCart((prevState) => {
      return prevState.filter((item) => item.id !== id);
    });
  }

  function confirmOrder() {
    setShowConfirmationWindow(!showConfirmationWindow);
  }

  function resetCart() {
    setItemsInCart([]);
    setShowConfirmationWindow(false);
  }

  function handleDecrement(id) {
    setItemsInCart((prevState) => {
      const existingItemIndex = prevState.findIndex(
        (cartItem) => cartItem.id === id
      );

      const updatedCart = [...prevState];
      updatedCart[existingItemIndex] = {
        ...updatedCart[existingItemIndex],
        quantity: updatedCart[existingItemIndex].quantity - 1,
      };

      if (updatedCart[existingItemIndex].quantity === 0) {
        return updatedCart.filter((el) => el.id !== id);
      } else {
        return updatedCart;
      }
    });
  }

  return (
    <>
      <div
        className="container-main"
        style={showConfirmationWindow ? customStyle : null}
      >
        <h1 className="title">Desserts</h1>
        <div className="app-container">
          {productData.map((product, index) => {
            return (
              <ProductCard
                id={index}
                category={product.category}
                image={product.image.mobile}
                name={product.name}
                price={product.price}
                key={index}
                addItem={addItem}
                quantity={itemsInCart.find((el) => el.id === index)?.quantity}
                decrement={handleDecrement}
              />
            );
          })}
        </div>
        <CartCard
          className="cartCard"
          items={itemsInCart}
          deleteItems={deleteItems}
          confirmOrder={confirmOrder}
        />
      </div>
      {showConfirmationWindow ? (
        <div className="modal-container">
          <ModalConfirmation items={itemsInCart} resetCart={resetCart} />
        </div>
      ) : null}
    </>
  );
}

export default App;
