import React from "react";

export const ShoppingCar = ({ selectedBooks, totalPrice, increaseQuantity, decreaseQuantity }) => {
  return (
    <div>
      <h2>Shopping Cart</h2>
      <ul>
        {selectedBooks.map((book, i) => (
          <li key={i}>
            <h4>{book.name}</h4>
            <p>Price: {book.price}</p>
            <div>
              <span>Quantity: {book.quantity}</span>
            </div>
              <button onClick={() => increaseQuantity(book)}>+</button>
              <button onClick={() => decreaseQuantity(book)}>-</button>
          </li>
        ))}
      </ul>
      <br />
        <h2>Total Price: {parseInt(totalPrice)}</h2>
    </div>
  );
};
