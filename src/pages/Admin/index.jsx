import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { approveSellerThunk, getUsersThunk } from "../../redux/slices/adminSlice";
import useAdmin from "../../redux/hooks/useAdmin";
import { getUser } from "../../redux/slices/authSlice";

const Admin = () => {
  const dispatch = useDispatch();
  const { users, loading, error } = useAdmin();

  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 10;
 const handleApproved=(id)=>{
    console.log("Clicked ID:", id);
  dispatch(approveSellerThunk(id))
  dispatch(getUsersThunk())
 }


  useEffect(() => {
    dispatch(getUsersThunk());
  }, [dispatch]);

  // Pagination Logic
  const indexOfLastUser = currentPage * usersPerPage;
  const indexOfFirstUser = indexOfLastUser - usersPerPage;
  const currentUsers = users?.slice(indexOfFirstUser, indexOfLastUser);

  const totalPages = Math.ceil(users?.length / usersPerPage);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  if (loading) return <p className="text-center mt-10">Loading...</p>;
  if (error) return <p className="text-center text-red-500 mt-10">{error}</p>;

  return (
    <section className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-6">Admin - Users</h1>

      {/* USERS TABLE */}
      <div className="bg-white shadow rounded-lg overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-200">
            <tr>
              <th className="p-3 border">Name</th>
              <th className="p-3 border">Email</th>
              <th className="p-3 border">Role</th>
              <th className="p-3 border">Approved</th>
              <th className="p-3 border">Blocked</th>
            </tr>
          </thead>
          <tbody>
            {currentUsers?.map((user) => (
              <tr key={user._id} className="text-center hover:bg-gray-50">
                <td className="p-3 border">{user.name}</td>
                <td className="p-3 border">{user.email}</td>
                <td className="p-3 border capitalize">{user.role}</td>
              <td className="p-3 border">
  {user.role === "seller" ? (
    <button
      onClick={() => handleApproved(user._id)}
      disabled={user.isApproved}
      className={`px-3 py-1 rounded ${
        user.isApproved
          ? "bg-green-500 text-white cursor-not-allowed"
          : "bg-yellow-500 text-white"
      }`}
    >
      {user.isApproved ? "Approved" : "Approve"}
    </button>
  ) : (
    "-"
  )}
</td>

                <td className="p-3 border">
                  {user.isBlocked ? "🚫" : "Active"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* PAGINATION */}
      <div className="flex justify-center mt-6 space-x-2">
        {[...Array(totalPages)].map((_, index) => (
          <button
            key={index}
            onClick={() => handlePageChange(index + 1)}
            className={`px-3 py-1 border rounded ${
              currentPage === index + 1
                ? "bg-blue-500 text-white"
                : "bg-white"
            }`}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </section>
  );
};

export default Admin;
