import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { decreaseQty, increaseQty, removeFromCart } from "../../redux/slices/cartSlice";


const Cart = () => {
  const { items } = useSelector(state => state.cart);
  const dispatch = useDispatch();

  const totalPrice = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">Your Cart</h1>

      {items.length === 0 && <p>Cart is empty</p>}

      {items.map(item => (
        <div key={item.id} className="flex items-center gap-4 mb-4">
          <img src={item.image} className="w-24 h-24 object-cover" />
          <div>
            <h2 className="font-semibold">{item.title}</h2>
            <p>Price: {item.price} Rs</p>
            <p>Qty: {item.quantity}</p>
          </div>
          <div className="flex flex-col gap-1">
            <button onClick={() => dispatch(increaseQty(item.id))} className="px-2 py-1 bg-gray-200 rounded">+</button>
            <button onClick={() => dispatch(decreaseQty(item.id))} className="px-2 py-1 bg-gray-200 rounded">-</button>
            <button onClick={() => dispatch(removeFromCart(item.id))} className="px-2 py-1 bg-red-500 text-white rounded">Remove</button>
          </div>
        </div>
      ))}

      {items.length > 0 && <h2 className="text-xl font-bold mt-4">Total: {totalPrice} Rs</h2>}
    </div>
  );
};

export default Cart;
