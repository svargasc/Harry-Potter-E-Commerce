import { Routes, Route } from "react-router-dom";
import React, { useEffect, useState } from "react";
import "./App.css";
import { Books } from "./components/Books/Books";
import { ShoppingCar } from "./components/ShoppingCar/ShoppingCar";
import { Footer } from "./components/Footer/Footer";

function App() {
  const [books, setBooks] = useState([]);
  const [cart, setCart] = useState([]);

  const handleAddToCart = (bookId, quantity) => {
    // Busca el libro por su ID en la lista de libros.
    const selectedBook = books.find((book) => book.id === bookId);

    if (selectedBook && quantity <= selectedBook.stock) {
      // Actualiza el stock del libro.
      const updatedBooks = books.map((book) => {
        if (book.id === bookId) {
          return {
            ...book,
            stock: book.stock - quantity,
          };
        }
        return book;
      });

      setBooks(updatedBooks);

      // Actualiza el carrito.
      const existingItem = cart.find((item) => item.id === bookId);

      if (existingItem) {
        setCart(
          cart.map((item) =>
            item.id === bookId
              ? { ...item, quantity: item.quantity + quantity }
              : item
          )
        );
      } else {
        setCart([...cart, { ...selectedBook, quantity }]);
      }
    }
  };

  const handleIncreaseQuantity = (bookId) => {
    const existingItem = cart.find((item) => item.id === bookId);

    if (existingItem && existingItem.quantity < existingItem.stock) {
      setCart(
        cart.map((item) =>
          item.id === bookId
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );

      setBooks(
        books.map((book) =>
          book.id === bookId
            ? { ...book, stock: book.stock - 1 }
            : book
        )
      );
    }
  };

  const handleDecreaseQuantity = (bookId) => {
    const existingItem = cart.find((item) => item.id === bookId);

    if (existingItem && existingItem.quantity > 1) {
      setCart(
        cart.map((item) =>
          item.id === bookId
            ? { ...item, quantity: item.quantity - 1 }
            : item
        )
      );

      setBooks(
        books.map((book) =>
          book.id === bookId
            ? { ...book, stock: book.stock + 1 }
            : book
        )
      );
    }
  };

  const clearCart = () => {
    // Vaciar el carrito
    setCart([]);
    // Restablecer el stock de los libros
    const updatedBooks = books.map(book => {
      return { ...book, stock: book.stock + (cart.find(item => item.id === book.id)?.quantity || 0) };
    });
    setBooks(updatedBooks);
  };

  useEffect(() => {
    fetch('https://fathomless-falls-16151-f2ccead2eed5.herokuapp.com/api/books')
      .then(response => response.json())
      .then(data => setBooks(data));
  }, []);

  return (
    <>
      <Routes>
        <Route path='/' element={<Books books={books} onAddToCart={handleAddToCart}></Books>}></Route>
        <Route path='/car' element={<ShoppingCar cart={cart} onIncreaseQuantity={handleIncreaseQuantity} onDecreaseQuantity={handleDecreaseQuantity} clearCart={clearCart}></ShoppingCar>}></Route>
      </Routes>
    </>
  )
}

export default App
