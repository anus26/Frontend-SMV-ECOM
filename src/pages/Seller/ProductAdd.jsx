import React from 'react'

const ProductAdd = () => {
  return (
    <div className="max-w-md mx-auto p-4 border rounded">
      <h2 className="text-xl font-bold mb-4">Add Product</h2>

      <input
        type="text"
        placeholder="Product Title"
        className="w-full border p-2 mb-2"
      />

      <textarea
        placeholder="Product Description"
        className="w-full border p-2 mb-2"
      ></textarea>

      <input
        type="number"
        placeholder="Price"
        className="w-full border p-2 mb-2"
      />

      <input
        type="number"
        placeholder="Stock"
        className="w-full border p-2 mb-2"
      />

      <input
        type="file"
        className="w-full border p-2 mb-2"
      />

      <select className="w-full border p-2 mb-4">
        <option>Select Category</option>
        <option>Electronics</option>
        <option>Clothes</option>
      </select>

      <button className="bg-blue-500 text-white px-4 py-2 rounded">
        Add Product
      </button>
    </div>
  );
};


export default ProductAdd