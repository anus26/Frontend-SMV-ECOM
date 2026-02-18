import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { approveSellerThunk, blockUserThunk, getStatsThunk, getUsersThunk } from "../../redux/slices/adminSlice";
import useAdmin from "../../redux/hooks/useAdmin";
import Stats from "../../components/Admin/Stats.jsx";
// import Stats from "../../components/Admin/Stats";
const Admin = () => {
  const dispatch = useDispatch();
  const { users, loading, error } = useAdmin();

  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 10;
 const handleApproved=(id)=>{

    console.log("Clicked ID:", id);
  dispatch(approveSellerThunk(id))
  .unwrap()
  .then(()=>{

    dispatch(getUsersThunk())
  })
      .catch((err) => {
      console.log(err);
    });
 }
const handleBlock = (id) => {
  dispatch(blockUserThunk(id))
    .unwrap()
    .then(() => {
      dispatch(getUsersThunk());
    })
    .catch((err) => {
      console.log(err);
    });
};



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
  <section className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-200 p-6">


    {/* Header */}
    <div className="flex justify-between items-center mb-6">
      <h1 className="text-3xl font-bold text-gray-800">
        Admin Dashboard
      </h1>
    {/* Stats Section */}
   
    </div>
    <div className="mb-8">
      <Stats />
    </div>

    {/* Users Table Card */}
    <div className="bg-white rounded-2xl shadow-lg overflow-x-auto">
      <table className="w-full text-sm">
        <thead className="bg-gray-100 text-gray-700 uppercase text-xs">
          <tr>
            <th className="p-4">Name</th>
            <th className="p-4">Email</th>
            <th className="p-4">Role</th>
            <th className="p-4">Approval</th>
            <th className="p-4">Block</th>
          </tr>
        </thead>

        <tbody>
          {currentUsers?.map((user) => (
            <tr
              key={user._id}
              className="text-center border-t hover:bg-gray-50 transition"
            >
              <td className="p-4 font-medium">{user.name}</td>
              <td className="p-4 text-gray-600">{user.email}</td>

              {/* Role Badge */}
              <td className="p-4">
                <span
                  className={`px-3 py-1 rounded-full text-xs font-semibold ${
                    user.role === "admin"
                      ? "bg-purple-100 text-purple-600"
                      : user.role === "seller"
                      ? "bg-blue-100 text-blue-600"
                      : "bg-gray-100 text-gray-600"
                  }`}
                >
                  {user.role}
                </span>
              </td>

              {/* Approve Button */}
              <td className="p-4">
                {user.role === "seller" ? (
                  <button
                    onClick={() => handleApproved(user._id)}
                    disabled={user.isApproved}
                    className={`px-4 py-1 rounded-lg text-sm font-medium transition ${
                      user.isApproved
                        ? "bg-green-500 text-black cursor-not-allowed"
                        : "bg-yellow-500 hover:bg-yellow-600 text-black"
                    }`}
                  >
                    {user.isApproved ? "Approved" : "Approve"}
                  </button>
                ) : (
                  "-"
                )}
              </td>

              {/* Block Button */}
              <td className="p-4">
                <button
                  onClick={() => handleBlock(user._id)}
                  className={`px-4 py-1 rounded-lg text-sm font-medium transition ${
                    user.isBlocked
                      ? "bg-green-500 hover:bg-green-600 text-black"
                      : "bg-red-500 hover:bg-red-600 text-green"
                  }`}
                >
                  {user.isBlocked ? "Unblock" : "Block"}
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>

    {/* Pagination */}
    <div className="flex justify-center mt-8 space-x-2">
      {[...Array(totalPages)].map((_, index) => (
        <button
          key={index}
          onClick={() => handlePageChange(index + 1)}
          className={`px-4 py-2 rounded-lg font-medium transition ${
            currentPage === index + 1
              ? "bg-indigo-600 text-white shadow-md"
              : "bg-white border hover:bg-gray-100"
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
