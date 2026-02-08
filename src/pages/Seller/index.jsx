import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import useProduct from "../../redux/hooks/useProduct";
import { deleteProductAPI, productApI, updataProductAPI } from "../../redux/slices/productSlice";

const Seller = () => {
  const dispatch = useDispatch();
  const { products, loading, error } = useProduct();

  const [showModal, setShowModal] = useState(false);
  // const [updateImage, setUpdateImage] = useState(null);

  const [selectedProduct, setSelectedProduct] = useState({
  _id:"",
    title: "",
    price: "",
    stock: "",
    description: "",
    image:null,
  });

  useEffect(() => {
    dispatch(productApI());
  }, [dispatch]);

  const openUpdateModal = (product) => {
    setSelectedProduct({...product, image:product.image||null});
    // setUpdateImage(null);
    setShowModal(true);
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const handleChange = (e) => {
    const { name, value,files } = e.target;
    if (name === "image") {
      
      setSelectedProduct({ ...selectedProduct, [name]: files[0] });
    }
    else {
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
   if (selectedProduct.image instanceof File) {
  formData.append("image", selectedProduct.image); // only new file
}  

   dispatch(updataProductAPI({ id: selectedProduct._id, data: formData }))
  .then(() => dispatch(productApI()));
  };
  const handleDelete=(_id)=>{
   
  dispatch(deleteProductAPI(_id))
   
  }

  if (loading) return <p className="text-center">Loading...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <>
      {/* TABLE */}
      <section className="p-6">
        <h1 className="text-2xl font-bold mb-4">Seller Products</h1>

        <table className="w-full border">
          <thead className="bg-gray-100">
            <tr>
              <th className="border p-2">Image</th>
              <th className="border p-2">Title</th>
              <th className="border p-2">Price</th>
              <th className="border p-2">Stock</th>
              <th className="border p-2">Action</th>
            </tr>
          </thead>

          <tbody>
            {products?.map((item) => (
              <tr key={item._id} className="text-center">
                <td className="border p-2">
                  <img src={item.image} className="w-16 h-16 mx-auto" />
                </td>
                <td className="border p-2">{item.title}</td>
                <td className="border p-2">Rs {item.price}</td>
                <td>{item.description}</td>
                <td className="border p-2">{item.stock}</td>
                <td className="border p-2">
                  <button
                    onClick={() => openUpdateModal(item)}
                    className="bg-blue-500 px-3 py-1 rounded"
                  >
                    Update
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>

      {/* UPDATE MODAL */}
      {showModal && (
        <div className="fixed inset-0 bg-black/40 flex justify-center items-center">
          <div className="bg-white p-5 w-[400px] rounded">
            <h2 className="text-xl font-bold mb-3">Update Product</h2>

            <form onSubmit={handleUpdate}>
              <input
                className="w-full border p-2 mb-2"
                name="title"
                value={selectedProduct.title}
                onChange={handleChange}
                placeholder="Title"
              />

              <input
                className="w-full border p-2 mb-2"
                name="price"
                value={selectedProduct.price}
                onChange={handleChange}
                placeholder="Price"
              />

              <input
                className="w-full border p-2 mb-2"
                name="stock"
                value={selectedProduct.stock}
                onChange={handleChange}
                placeholder="Stock"
              />

              <textarea
                className="w-full border p-2 mb-2"
                name="description"
                value={selectedProduct.description}
                onChange={handleChange}
                placeholder="Description"
              />

              {/* OLD IMAGE */}
              {!selectedProduct && (
                <img
                  src={selectedProduct.image}
                  className="w-24 h-24 mb-2"
                />
              )}

              {/* NEW IMAGE */}
              <input
                type="file"
                className="w-full border p-2 mb-3"
                onChange={handleChange}
                name="image"
             
              />
           {selectedProduct.image && (
  <img 
    src={
      selectedProduct.image instanceof File
        ? URL.createObjectURL(selectedProduct.image) // new selected file
        : selectedProduct.image.replace(/\\/g, "/")  // old path fix
    }
    alt="preview"
    className="w-24 h-24 mb-2"
  />
)}


              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={closeModal}
                  className="border px-4 py-1"
                >
                  Cancel
                </button>
            <button type="button" onClick={()=>handleDelete(selectedProduct._id)} className="bg-red-500 px-4 py-1 text-black"  >
             delete
            </button>
                <button
                  type="submit"
                  className="bg-green-500 px-4 py-1"
                >
                  Update
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default Seller;

