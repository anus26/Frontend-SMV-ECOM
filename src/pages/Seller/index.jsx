import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import useProduct from "../../redux/hooks/useProduct";
import { productApI } from "../../redux/slices/productSlice";

const Seller = () => {
  const dispatch = useDispatch();
  const { products, loading, error } = useProduct();
  const [updateImage, setUpdateImage] = useState(null);


  const [showModal, setShowModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    dispatch(productApI());
  }, [dispatch]);

  const openUpdateModal = (product) => {
    setSelectedProduct(product);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
    setSelectedProduct(null);
  };

  if (loading) return <p className="text-center">Loading...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <>
      <section className="p-6">
        <h1 className="text-2xl font-bold mb-4">Seller Products</h1>

        <div className="overflow-x-auto">
          <table className="w-full border border-gray-300">
            <thead className="bg-gray-100">
              <tr>
                <th className="border p-2">Image</th>
                <th className="border p-2">Title</th>
                <th className="border p-2">Price</th>
                <th className="border p-2">Stock</th>
                <th className="border p-2">Actions</th>
              </tr>
            </thead>

            <tbody>
              {products?.map((item) => (
                <tr key={item._id} className="text-center">
                  <td className="border p-2">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="w-16 h-16 object-cover mx-auto"
                    />
                  </td>

                  <td className="border p-2">{item.title}</td>
                  <td className="border p-2">Rs {item.price}</td>
                  <td className="border p-2">{item.stock}</td>

                  <td className="border p-2">
                    <button
                      onClick={() => openUpdateModal(item)}
                      className="bg-blue-500 text-black px-3 py-1 rounded hover:bg-blue-600"
                    >
                      Update
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* UPDATE MODAL */}
      {showModal && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center">
          <div className="bg-white w-[90%] md:w-[400px] p-6 rounded">
            <h2 className="text-xl font-bold mb-4">Update Product</h2>

            <input
              type="text"
              value={selectedProduct.title}
              className="w-full border p-2 mb-2"
              placeholder="Title"
            />

            <input
              type="number"
              value={selectedProduct.price}
              className="w-full border p-2 mb-2"
              placeholder="Price"
            />

            <input
              type="number"
              value={selectedProduct.stock}
              className="w-full border p-2 mb-4"
              placeholder="Stock"
            />
            {
              !updateImage&&(
                <img src={selectedProduct.image} alt="" />

              )
            }
   <input
  type="file"
  className="w-full border p-2 mb-2"
  accept="image/*"
  onChange={(e) => setUpdateImage(e.target.files[0])}
/>


            <div className="flex justify-end gap-2">
              <button
                onClick={closeModal}
                className="border px-4 py-2 rounded"
              >
                Cancel
              </button>
              <button className="bg-green-500 text-black px-4 py-2 rounded">
                Update
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Seller;
