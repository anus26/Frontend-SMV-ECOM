import React, { useEffect } from "react";
import useAdmin from "../../redux/hooks/useAdmin";
import { useDispatch } from "react-redux";
import { getStatsThunk } from "../../redux/slices/adminSlice";
import useAuth from "../../redux/hooks/useAuth";

const Stats = () => {
    const dispatch=useDispatch()
  const { stats } = useAdmin();
  const {users}=useAuth()
useEffect(()=>{
    dispatch(getStatsThunk())
},[dispatch])
const totalSellers=users?.filter((user)=>user.role==="seller")
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">


      <div className="bg-white shadow-lg rounded-2xl p-6 hover:shadow-xl transition">
        <h2 className="text-gray-500 text-sm">Total Users</h2>
        <p className="text-3xl font-bold text-indigo-600 mt-2">
          {stats?.totalUsers || 0}
        </p>
      </div>


      <div className="bg-white shadow-lg rounded-2xl p-6 hover:shadow-xl transition">
        <h2 className="text-gray-500 text-sm">Total Orders</h2>
        <p className="text-3xl font-bold text-green-600 mt-2">
          {stats?.totalOrders || 0}
        </p>
      </div>
      <div className="bg-white shadow-lg rounded-2xl p-6 hover:shadow-xl transition">
        <h2 className="text-gray-500 text-sm">Total Sellers</h2>
        <p className="text-3xl font-bold text-blue-600 mt-2">
          {stats.totalSellers||0 }
        </p>
      </div>

   
      <div className="bg-white shadow-lg rounded-2xl p-6 hover:shadow-xl transition">
        <h2 className="text-gray-500 text-sm">Total Products</h2>
        <p className="text-3xl font-bold text-purple-600 mt-2">
          {stats?.totalProducts || 0}
        </p>
      </div>
   <div className="bg-white shadow-lg rounded-2xl p-6 hover:shadow-xl transition">
        <h2 className="text-gray-500 text-sm">Total Customer</h2>
        <p className="text-3xl font-bold text-purple-600 mt-2">
          {stats?.totalCustomer || 0}
        </p>
      </div>
    </div>
  );
};

export default Stats;
