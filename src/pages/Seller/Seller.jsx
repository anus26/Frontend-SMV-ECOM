import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import useProduct from "../../redux/hooks/useProduct";
import {
  deleteProductAPI,
  productApI,
  updataProductAPI,
} from "../../redux/slices/productSlice";
import Revenue from "../../components/Seller/Revenue.jsx";
import DailyRevenue from "../../components/Seller/DailyRevneue.jsx";
import MonthlyRevenueChart from "../../components/Seller/MonthlyRevenueChart.jsx";
import toast from "react-hot-toast";
import { MutatingDots } from "react-loader-spinner";

const Seller = () => {
  const dispatch = useDispatch();
  const { products = [], loading, error } = useProduct();

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const totalPages = Math.ceil((products?.length || 0) / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = Array.isArray(products)
    ? products.slice(indexOfFirstItem, indexOfLastItem)
    : [];

  const [showModal, setShowModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState({
    _id: "",
    title: "",
    price: "",
    stock: "",
    description: "",
    images: [],
  });

  useEffect(() => {
    dispatch(productApI());
  }, [dispatch]);

  const openUpdateModal = (product) => {
    setSelectedProduct({ ...product, image: product.image || null });
    setShowModal(true);
  };
  const closeModal = () => setShowModal(false);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "images") {
      setSelectedProduct({ ...selectedProduct, images: [...files] });
    } else {
      setSelectedProduct({ ...selectedProduct, [name]: value });
    }
  };

  const handleUpdate = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", selectedProduct.title);
    formData.append("price", selectedProduct.price);
    formData.append("stock", selectedProduct.stock);
    formData.append("description", selectedProduct.description);
    if (selectedProduct.images && selectedProduct.images.length>0) {
      selectedProduct.images.forEach((file)=>{
if (file instanceof File) {
  
  formData.append("images", file);
}
      })
    }
    dispatch(updataProductAPI({ id: selectedProduct._id, data: formData })).then(() => {
      dispatch(productApI());
      toast.success("Product updated successfully!");
      closeModal();
    });
  };

  const handleDelete = (_id) => {
    dispatch(deleteProductAPI(_id)).then(() => {
      dispatch(productApI());
      toast.success("Product deleted successfully!");
      closeModal();
    });
  };

  if (loading)
    return <p className="text-center text-xl mt-10 text-gray-500">Loading...</p>;
  if (error)
    return (
      <p className="text-center text-xl mt-10 text-red-500">{error}</p>
    );

  return (
    <section className="p-4 md:p-8 bg-gray-50 min-h-screen">
      {loading&&(
        <div className="flex justify-center">
        <MutatingDots
      visible={true}
      height="100"
      width="100"
      color="#4fa94d"
      secondaryColor="#4fa94d"
      radius="12.5"
      ariaLabel="mutating-dots-loading"
      wrapperStyle={{}}
      wrapperClass=""
      />
        </div>
      )}
      {/* Revenue Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        <MonthlyRevenueChart />
        <DailyRevenue />
      </div>
      <Revenue />

      {/* Products Section */}
      <div className="bg-white p-4 md:p-6 rounded-lg shadow">
        <h1 className="text-2xl font-bold mb-4 text-gray-800">
          Seller Products
        </h1>
        <div className="overflow-x-auto">
          <table className="w-full border-collapse text-left">
            <thead className="bg-greenSoft">
              <tr>
                <th className="border p-2 md:p-3">Image</th>
                <th className="border p-2 md:p-3">Title</th>
                <th className="border p-2 md:p-3">Price</th>
                <th className="border p-2 md:p-3">Stock</th>
                <th className="border p-2 md:p-3">Description</th>
                <th className="border p-2 md:p-3 text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {currentItems.map((item) => (
                <tr
                  key={item._id}
                  className="hover:bg-greenSoft/40 transition-colors"
                >
                <td className="border p-1 md:p-3 flex gap-2">
  {item.images &&
    item.images.map((img, index) => (
      <div key={index} className="relative">
        <img
          src={img}
          alt={`product-${index}`}

   
          className="w-12 md:w-16 h-12 md:h-16 rounded object-cover"
        />
        {/* <button
          onClick={() => window.open(img, "_blank")}
          className="absolute top-0 right-0 bg-green-500 text-black text-xs px-1 rounded"
        >
          ⬇
        </button> */}
      </div>
    ))}
</td>
                  <td className="border p-1 md:p-3 font-medium text-gray-700">
                    {item.title}
                  </td>
                  <td className="border p-1 md:p-3 text-greenDark font-semibold">
                    Rs {item.price}
                  </td>
                  <td className="border p-1 md:p-3">{item.stock}</td>
                  <td className="border p-1 md:p-3 text-sm md:text-base">
                    {item.description}
                  </td>
                  <td className="border p-1 md:p-3 text-center flex flex-col md:flex-row gap-1 justify-center">
                    <button
                      onClick={() => openUpdateModal(item)}
                      className="bg-hover  text-white flex  px-2 md:px-3 py-1 rounded hover:bg-blue transition"
                    >
                      Update
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="mt-4 flex flex-wrap justify-center gap-2">
        {[...Array(totalPages)].map((_, index) => (
  <button
    key={index}
    onClick={() => setCurrentPage(index + 1)}
    className={`px-3 py-1 rounded border ${
      currentPage === index + 1
        ? "bg-greenDark text-black"
        : "bg-white text-gray-700 hover:bg-green1/30"
    } transition`}
  >
    {index + 1}
  </button>
))}

        </div>
      </div>

      {/* Update Modal */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 z-50 p-4">
          <div className="bg-white w-full max-w-md p-6 rounded-lg shadow-lg overflow-y-auto max-h-[90vh]">
            <h2 className="text-xl font-bold mb-4">Update Product</h2>
            <form onSubmit={handleUpdate} className="space-y-3">
              <input
                className="w-full border p-2 rounded"
                name="title"
                value={selectedProduct.title}
                onChange={handleChange}
                placeholder="Title"
              />
              <input
                className="w-full border p-2 rounded"
                name="price"
                value={selectedProduct.price}
                onChange={handleChange}
                placeholder="Price"
              />
              <input
                className="w-full border p-2 rounded"
                name="stock"
                value={selectedProduct.stock}
                onChange={handleChange}
                placeholder="Stock"
              />
              <textarea
                className="w-full border p-2 rounded"
                name="description"
                value={selectedProduct.description}
                onChange={handleChange}
                placeholder="Description"
              />
    {selectedProduct.images &&
  selectedProduct.images.map((img, index) => (
    <img
      key={index}
      src={
        img instanceof File
          ? URL.createObjectURL(img)
          : img
      }
      alt={`preview-${index}`}
      className="w-24 h-24 rounded mb-2"
    />
  ))}
              <input
                type="file"
                className="w-full border p-2 rounded"
                onChange={handleChange}
                name="images"
                multiple
              />
              <div className="flex flex-col md:flex-row justify-end gap-2 mt-2">
                <button
                  type="button"
                  onClick={closeModal}
                  className="border px-4 py-1 rounded hover:bg-gray-200 transition"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={() => handleDelete(selectedProduct._id)}
                  className="bg-red-500 px-4 py-1 text-black rounded hover:bg-red-600 transition"
                >
                  Delete
                </button>
                <button
                  type="submit"
                  className="bg-greenDark px-4 py-1 text-black rounded hover:bg-green1 transition"
                >
                  Update
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
};

export default Seller;
