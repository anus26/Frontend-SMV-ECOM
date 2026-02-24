import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { orderdeleteThunk, ordergetThunk, orderupdataThunk } from "../../redux/slices/orderSlice";
import useorder from "../../redux/hooks/useorder";
import toast from "react-hot-toast";

const Order = () => {
  const dispatch = useDispatch();
 const [showModal,setShowModal]=useState(false)
 const [selected,setSelected]=useState({status:""})

  console.log("Update clicked");

  const {orders,loading,error}=useorder()


  
  const openUpdateModal=(order)=>{
      setSelected(order)
      setShowModal(true)
    }
    const closeModal=()=>{
        setShowModal(false)
    }
    const handleChange = (e) => {
        const { name, value } = e.target;
        setSelected({ ...selected, [name]: value });
    };
    
    const handleUpdate = async(e) => {
        e.preventDefault();
        
         dispatch(orderupdataThunk({
            id: selected._id,
            status: selected.status
        }))
        dispatch(ordergetThunk())
        closeModal();
        toast.success("successfully updata")   // ✅ THIS IS IMPORTANT
    };
const handleDelete = async (_id) => {
  try {
    // 1️⃣ Delete the order
    await dispatch(orderdeleteThunk(_id)).unwrap();

    // 2️⃣ Refresh orders after deletion
    await dispatch(ordergetThunk()).unwrap();

    // 3️⃣ Close modal if open
    closeModal();
     toast.success("successfully Delete")  
  } catch (error) {
    console.error("Delete failed:", error);
  }
};


    useEffect(() => {
      dispatch(ordergetThunk());
    }, [dispatch]);

  if (loading) return <h2 className="p-6">Loading...</h2>;
  if (error) return <h2 className="p-6 text-red-500">{error}</h2>;

  return (
  <section className="p-8">
    <h1 className="text-2xl font-bold mb-6">My Orders</h1>

    {orders?.length === 0 && <p>No orders found</p>}

    {orders?.map((order) => (
      <div
        key={order._id}
        className="border p-4 mb-6 rounded shadow"
      >
        <div className="flex justify-between mb-2">
          <p>
            <strong>Order ID:</strong> {order._id}
          </p>
          <p className="text-blue-600 font-semibold">
            {order.status}
          </p>
        </div>

        <p>
          <strong>Total:</strong> {order.totalAmount} Rs
        </p>

        <p className="text-sm text-gray-500 mb-3">
          {new Date(order.createdAt).toLocaleString()}
        </p>

        <button
          onClick={() => openUpdateModal(order)}
          className="bg-blue-500 text-black px-3 py-1 rounded"
        >
          Update
        </button>
      </div>
    ))}

    {/* ✅ Modal OUTSIDE map */}
    {showModal && (
      <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40">
        <form
          onSubmit={handleUpdate}
          className="bg-white p-6 rounded shadow w-80"
        >
          <h2 className="mb-4 font-bold">Update Status</h2>

          <select
            name="status"
            value={selected.status}
            onChange={handleChange}
            className="border p-2 w-full mb-4"
          >
            <option value="pending">Pending</option>
            <option value="paid">paid</option>
            <option value="cancaled">cancaled</option>
          
          </select>

          <div className="flex justify-between">
            <button
              type="button"
              onClick={closeModal}
              className="bg-gray-400 px-3 py-1 rounded"
            >
              Cancel
            </button>

            <button
              type="submit"
              className="bg-green-500 text-black px-3 py-1 rounded"
            >
              Update
            </button>
            <button type="button" onClick={()=>handleDelete(selected._id)} >
Delete
            </button>
          </div>
        </form>
      </div>
    )}
  </section>
);

};

export default Order;
