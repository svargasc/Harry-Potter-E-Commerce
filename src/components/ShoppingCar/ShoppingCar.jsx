import React, { useState } from "react";
import { NavLink } from "react-router-dom";

export const ShoppingCar = ({
  cart,
  onIncreaseQuantity,
  onDecreaseQuantity,
  clearCart,
}) => {
  const calculateTotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const [confirmPurchase, setConfirmPurchase] = useState(false);

  const handlePayment = () => {
    if (cart.length > 0) {
      const confirm = window.confirm("Confirm the purchase?");
      if (confirm) {
        setConfirmPurchase(true);
        clearCart([]); // Vaciar el carrito después de confirmar la compra
      }
    }
  };

  return (
    <>
      <div className="flex justify-center items-center min-h-[86.6vh]">
        <div className="bg-[#9c939d] flex justify-center items-center flex-col rounded-md">
          <div className="flex justify-evenly p-2 items-center">
            <div className="flex items-center p-2  bg-[#6d6d6d] w-[100%] justify-center rounded-md">
              <NavLink to="/" className="text-[#121212] font-bold">
                <h1 className=" text-[36px]">Go store</h1>
              </NavLink>
              <img
                className="w-[64px]"
                src="https://cdn-icons-png.flaticon.com/512/5900/5900198.png"
                alt=""
              />
            </div>
          </div>
          <br />
          <ul>
            {cart.map((item) => (
              <div className="bg-[#2e2a2e] w-[800px] flex justify-center p-2 rounded-md m-4">
                <div
                  className="flex bg-[#4a424a] w-[600px] items-center"
                  key={item.id}
                >
                  <img className="w-[80px]" src={item.image} alt="" />
                  <div className="w-[60%] flex flex-col items-start">
                    <h2>Name: {item.name}</h2>
                    <h2>Quantity: {item.quantity}</h2>
                    <h2>Price: {item.price * item.quantity}</h2>
                  </div>
                  <div className="flex w-[20%]">
                    <button
                      className="w-[40px] m-2 h-[40px] flex justify-center items-center"
                      onClick={() => onIncreaseQuantity(item.id)}
                    >
                      +
                    </button>
                    <button
                      className="w-[40px] m-2 h-[40px] bg-[#4e0101] flex justify-center items-center"
                      onClick={() => {
                        onDecreaseQuantity(item.id);
                      }}
                    >
                      -
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </ul>
          <div className="flex flex-col justify-center p-4">
            <h2 className="text-2xl p-2">Total Price: {calculateTotal()}</h2>
            <div className="flex flex-col justify-center items-center">
              <div>
                <button
                  className="w-[140px] m-2 bg-[#d20303]"
                  onClick={clearCart}
                >
                  Empty Cart
                </button>
                <button
                  className="w-[140px] m-2 bg-[#6a5f6a]"
                  onClick={handlePayment}
                >
                  Pay
                </button>
              </div>
              {confirmPurchase && (
                <h2 className="text-2xl text-[#d9ffdc] font-bold">
                  Successful purchase
                </h2>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
