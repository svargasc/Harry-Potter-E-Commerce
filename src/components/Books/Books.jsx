import React, { useEffect, useState } from "react";
import { Header } from "../Header/Header";
import { ShoppingCar } from "../ShoppingCar/ShoppingCar";
import axios from "axios";

export const Books = () => {
  const info = {
    name: [
      "Harry Potter and the Sorcerer's Stone",
      "Harry Potter and the Chamber of Secrets",
      "Harry Potter and the Prisoner of Azkaban",
      "Harry Potter and the Goblet of Fire",
      "Harry Potter and the Order of the Phoenix",
      "Harry Potter and the Half-Blood Prince",
      "Harry Potter and the Deathly Hallows",
      "Harry Potter and the Cursed Child",
    ],
    imgs: [
      "https://m.media-amazon.com/images/I/81iqZ2HHD-L._AC_UF1000,1000_QL80_.jpg",
      "https://res.cloudinary.com/bloomsbury-atlas/image/upload/w_568,c_scale/jackets/9781408855669.jpg",
      "https://prodimage.images-bn.com/pimages/9780439064873_p0_v1_s1200x630.jpg",
      "https://m.media-amazon.com/images/I/81f7bXC-tTL._AC_UF1000,1000_QL80_.jpg",
      "https://static.wikia.nocookie.net/harrypotter/images/a/a3/Goblet_of_Fire_New_Cover.jpg",
      "https://prodimage.images-bn.com/pimages/9780439358071_p0_v4_s1200x630.jpg",
      "https://m.media-amazon.com/images/I/61sXBXmAWML._AC_UF1000,1000_QL80_.jpg",
      "https://m.media-amazon.com/images/I/51V6zvaRjkL.jpg",
    ],
    price: [50000, 66000, 65000, 70000, 90000, 45000, 87000, 71000],
    stock: [30, 20, 15, 10, 5, 25, 12, 18],
  };

  const [books, setBooks] = useState([]);
  const [selectedBooks, setSelectedBooks] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);

  // Función para agregar un libro al carrito
  const addToCart = (book, i) => {
    const bookData = {
      name: info.name[i],
      price: info.price[i],
      quantity: 1,
    };
    setSelectedBooks([...selectedBooks, bookData]);

    // Calcular el precio total actualizado
    const newTotalPrice = totalPrice + info.price[i];
    setTotalPrice(newTotalPrice);
  };

  // Función para aumentar la cantidad de un libro en el carrito
  const increaseQuantity = (book) => {
    const updatedBooks = selectedBooks.map((item) =>
      item === book ? { ...item, quantity: item.quantity + 1 } : item
    );
    setSelectedBooks(updatedBooks);

    // Calcular el precio total actualizado
    const newTotalPrice = updatedBooks.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
    setTotalPrice(newTotalPrice);
  };

  // Función para disminuir la cantidad de un libro en el carrito
  const decreaseQuantity = (book) => {
    const updatedBooks = selectedBooks.map((item) =>
      item === book && item.quantity > 1
        ? { ...item, quantity: item.quantity - 1 }
        : item
    );
    setSelectedBooks(updatedBooks);

    // Calcular el precio total actualizado
    const newTotalPrice = updatedBooks.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
    setTotalPrice(newTotalPrice);
  };

  useEffect(() => {
    const getBooks = async () => {
      const url = "https://harry-potter-api.onrender.com/libros";
      const results = await axios.get(url);
      setBooks(results.data);
    };
    getBooks();
  }, []);

  return (
    <div>
      <Header info={info} />
      <ShoppingCar
        selectedBooks={selectedBooks}
        totalPrice={totalPrice}
        increaseQuantity={increaseQuantity}
        decreaseQuantity={decreaseQuantity}
      />
      {info.name.map((name, i) => (
        <div className="w-[100%] bg-[#625e5e]" key={i}>
          <div className="p-2">
            <div className="flex bg-[#2e2a2e] rounded-md">
              <img
                className="w-[180px] h-[200px]"
                src={info.imgs[i]}
                alt=""
              />
              <div className="flex flex-col items-start p-2">
                <h2>{name}</h2>
                <h2>Stock: {info.stock[i]}</h2>
                <h3>Price: {info.price[i]}</h3>
                <div className="flex">
                  <button
                    className="h-[30px] flex items-center"
                    onClick={() => addToCart(info, i)}
                  >
                    Add
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      ))}
      
    </div>
  );
};
