import { Header } from "../Header/Header";

export const Books = ({ books, onAddToCart, removeFromCart }) => {
  return (
    <>
      <Header></Header>
      <div>
        <ul className="flex justify-evenly flex-wrap w-full">
          {books.map((book) => (
            <div className="bg-[#403a40] w-[44%]" key={book.id}>
              <div className="p-2">
                <div className="flex bg-[#564e56] rounded-md">
                  <img
                    className="w-[180px] h-[200px]"
                    src={book.image}
                    alt=""
                  />
                  <div className="flex flex-col items-start p-2">
                    <h2>{book.name}</h2>
                    <h2>Stock: {book.stock}</h2>
                    <h3>Price: {book.price}</h3>
                    {book.stock === 0 ? (
                      <p>Exhausted</p>
                    ) : (
                      <div className="flex items-center justify-center">
                        <button
                          className="h-[30px] bg-[#dddadd] text-[#2e2a2e] flex items-center"
                          onClick={() => onAddToCart(book.id, 1)}
                        >
                          Add
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </ul>
      </div>
    </>
  );
};
