import React, { useState } from "react";

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
    <div className="bg-[#5f595f] rounded-md">
      <h1>Shopping Cart</h1>
      <br />
      <ul>
        {cart.map((item) => (
          <div className="bg-[#2e2a2e] w-[800px] flex justify-center p-2 rounded-md m-4">
            <div
              className="flex bg-[#625e5e] w-[600px] items-center"
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
                  className="w-[40px] m-2 h-[40px] flex justify-center items-center"
                  onClick={() => {onDecreaseQuantity(item.id)}}
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
        <div className="flex flex-col items-center">
          <button className="w-[140px] m-2" onClick={clearCart}>
            Empty Cart
          </button>
          <button className="w-[140px] m-2" onClick={handlePayment}>
            Pay
          </button>
          {confirmPurchase && (
            <h2 className="text-2xl text-[#382657] font-bold">
              Successful purchase
            </h2>
          )}
        </div>
      </div>
    </div>
  );
};
