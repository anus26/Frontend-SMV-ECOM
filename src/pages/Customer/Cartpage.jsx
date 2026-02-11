import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { clearCart, decreaseQty, increaseQty, removeFromCart } from '../../redux/slices/cartSlice'
import { RiDeleteBinLine } from "react-icons/ri";
import { orderThunk } from '../../redux/slices/orderSlice';
import useAuth from '../../redux/hooks/useauth';

const Cartpage = () => {
    const dispatch=useDispatch()
    const cartItems=useSelector((state)=>state.cart.items)
const {user}=useAuth()
    const totalAmount=cartItems.reduce(
        (total,item)=>total+item.price*item.quantity,
        0
    )
    if (cartItems.length===0) {
        return <h1 className='p-8'>Your Cart is Empty</h1>
        
    }
    const handCheckout=()=>{
        const orderData={
            items:cartItems.map(item=>({
            
                productId:item._id,
                stock:item.quantity,
  price: Number(item.price) 
       
                
            })),
            totalAmount
    }
 dispatch(orderThunk(orderData))
  .unwrap()
  .then(() => {
    dispatch(clearCart());
  });

    }

  return (
    <>
    <section>
        {/* <div>
           ({cartItems.length}) 
        </div> */}
        {cartItems.map((item)=>(
            <div key={item._id} className='flex justify-between items-center border p-4 mb-4 rounded'>
  <div className="flex items-center gap-4">
            <img src={item.image} className="w-20 h-20 object-cover" />
            <div>
              <h3 className="font-semibold">{item.title}</h3>
              <p>{item.price} Rs</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button onClick={()=>dispatch(decreaseQty(item))}          
             className="px-3 py-1 bg-gray-300">
 -
            </button>
            <span>{item.quantity}</span>
            
            <button onClick={()=>dispatch(increaseQty(item))}
                          className="px-3 py-1 bg-gray-300">
                +

            </button>
            {/* <span>{item.quantity}</span> */}
          </div>
               <div>
            <p className="font-bold">
              {item.price * item.quantity} Rs
            </p>
          </div>
          <div>
          </div>
           <button onClick={()=>dispatch(removeFromCart(item))}>
   <RiDeleteBinLine />
           </button>
            </div>
        ))}
    
                    <div className="text-right mt-6 text-xl font-bold">
        Total: {totalAmount} Rs
      </div>
      <button onClick={handCheckout}>
        CheckOut
      </button>
    </section>
    </>
  )
}

export default Cartpage