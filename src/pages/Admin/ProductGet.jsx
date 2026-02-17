import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import useProduct from "../../redux/hooks/useProduct";
import { getAllProductsAPI, deleteProductAPI } from "../../redux/slices/productSlice";

const ProductGet = () => {
  const dispatch = useDispatch();
  const { products = [], loading, error } = useProduct();

  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 10;

  useEffect(() => {
    dispatch(getAllProductsAPI());
  }, [dispatch]);

  // Pagination
  const indexOfLast = currentPage * productsPerPage;
  const indexOfFirst = indexOfLast - productsPerPage;
  const currentProducts = products.slice(indexOfFirst, indexOfLast);
  const totalPages = Math.ceil(products.length / productsPerPage);

  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this product?")) {
      dispatch(deleteProductAPI(id))
        .unwrap()
        .then(() => dispatch(getAllProductsAPI()));
    }
  };

  if (loading) return <p className="text-center mt-10">Loading...</p>;
  if (error) return <p className="text-center text-red-500 mt-10">{error}</p>;

  return (
    <section className="p-8 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold mb-6">Admin - All Products</h1>

      <div className="bg-white shadow rounded-lg overflow-hidden">
        <table className="w-full">
          <thead className="bg-gray-200">
            <tr>
              <th className="p-3 border">Image</th>
              <th className="p-3 border">Title</th>
              <th className="p-3 border">Price</th>
              <th className="p-3 border">Stock</th>
              <th className="p-3 border">Seller</th>
              <th className="p-3 border">Action</th>
            </tr>
          </thead>
          <tbody>
            {currentProducts.map((product) => (
              <tr key={product._id} className="text-center hover:bg-gray-50">
                <td className="p-3 border">
                  <img
                    src={product.image}
                    alt={product.title}
                    className="w-14 h-14 mx-auto object-cover rounded"
                  />
                </td>
                <td className="p-3 border">{product.title}</td>
                <td className="p-3 border">Rs {product.price}</td>
                <td className="p-3 border">{product.stock}</td>
                <td className="p-3 border">
                  {product.seller?.name || "N/A"}
                </td>
                <td className="p-3 border">
                  <button
                    onClick={() => handleDelete(product._id)}
                    className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex justify-center mt-6 gap-2">
        {[...Array(totalPages)].map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentPage(index + 1)}
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

export default ProductGet;
