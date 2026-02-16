import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import useCategory from "../../redux/hooks/useCategory";

import { getthunkcategory } from "../../redux/slices/categorySlice";
import useProduct from "../../redux/hooks/useProduct";
import { addProductAPI } from "../../redux/slices/productSlice";

const ProductAdd = () => {
  const dispatch = useDispatch();
  const { categories } = useCategory();
  const { products } = useProduct();

  const [form, setForm] = useState({
    title: "",
    description: "",
    price: 0,
    stock: 0,
    image: null,
    parentCategory: "",
    category: "",
  });

  const [childCategory, setChildCategory] = useState([]);

  // Fetch categories on mount
  useEffect(() => {
    dispatch(getthunkcategory());
  }, [dispatch]);

  // Update childCategory whenever parentCategory changes
  useEffect(() => {
    if (form.parentCategory) {
      setChildCategory(
        categories.filter(
          (cat) =>
            cat.parentCategory &&
            cat.parentCategory.toString() === form.parentCategory.toString()
        )
      );
    } else {
      setChildCategory([]);
    }
  }, [form.parentCategory, categories]);

  // Handle input change
  const handlechange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      setForm({ ...form, [name]: files[0] });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Submitting product:", form);
    dispatch(addProductAPI(form));
  };

  // Filter parent categories
  const parentCategory = categories.filter((cat) => cat.parentCategory === null);

  return (

  <div className="max-w-3xl mx-auto bg-white shadow-xl rounded-2xl p-8 mt-10 border border-gray2">

    <h2 className="text-2xl font-bold text-greenDark mb-6">
      Add New Product
    </h2>

    <form onSubmit={handleSubmit} className="grid md:grid-cols-2 gap-6">

      {/* Title */}
      <div className="md:col-span-2">
        <label className="text-sm text-text mb-1 block">Product Title</label>
        <input
          type="text"
          name="title"
          value={form.title}
          onChange={handlechange}
          placeholder="Enter product title"
          className="w-full border border-gray2 bg-gray3 p-3 rounded-lg
          focus:outline-none focus:ring-2 focus:ring-green1
          focus:border-green
          hover:shadow-md hover:shadow-green1/40
          transition-all duration-300"
        />
      </div>

      {/* Description */}
      <div className="md:col-span-2">
        <label className="text-sm text-text mb-1 block">Description</label>
        <textarea
          name="description"
          value={form.description}
          onChange={handlechange}
          rows="4"
          placeholder="Enter product description"
          className="w-full border border-gray2 bg-gray3 p-3 rounded-lg
          focus:outline-none focus:ring-2 focus:ring-green1
          focus:border-green
          hover:shadow-md hover:shadow-green1/40
          transition-all duration-300"
        />
      </div>

      {/* Price */}
      <div>
        <label className="text-sm text-text mb-1 block">Price</label>
        <input
          type="number"
          name="price"
          value={form.price}
          onChange={handlechange}
          className="w-full border border-gray2 bg-gray3 p-3 rounded-lg
          focus:outline-none focus:ring-2 focus:ring-green1
          focus:border-green
          hover:shadow-md hover:shadow-green1/40
          transition-all duration-300"
        />
      </div>

      {/* Stock */}
      <div>
        <label className="text-sm text-text mb-1 block">Stock</label>
        <input
          type="number"
          name="stock"
          value={form.stock}
          onChange={handlechange}
          className="w-full border border-gray2 bg-gray3 p-3 rounded-lg
          focus:outline-none focus:ring-2 focus:ring-green1
          focus:border-green
          hover:shadow-md hover:shadow-green1/40
          transition-all duration-300"
        />
      </div>

      {/* Image Upload */}
      <div className="md:col-span-2">
        <label className="text-sm text-text mb-1 block">Upload Image</label>
        <input
          type="file"
          name="image"
          onChange={handlechange}
          className="w-full border border-dashed border-green p-3 rounded-lg
          bg-greenSoft
          hover:bg-green1/20
          transition-all duration-300"
        />
      </div>

      {/* Parent Category */}
      <div>
        <label className="text-sm text-text mb-1 block">Parent Category</label>
        <select
          name="parentCategory"
          value={form.parentCategory}
          onChange={handlechange}
          className="w-full border border-gray2 bg-gray3 p-3 rounded-lg
          focus:outline-none focus:ring-2 focus:ring-green1
          focus:border-green"
        >
          <option value="">Select Parent Category</option>
          {parentCategory.map((cat) => (
            <option key={cat._id} value={cat._id}>
              {cat.name}
            </option>
          ))}
        </select>
      </div>

      {/* Child Category */}
      <div>
        <label className="text-sm text-text mb-1 block">Child Category</label>
        <select
          name="category"
          value={form.category}
          onChange={handlechange}
          disabled={!form.parentCategory}
          className="w-full border border-gray2 bg-gray3 p-3 rounded-lg
          focus:outline-none focus:ring-2 focus:ring-green1
          focus:border-green disabled:bg-gray1"
        >
          <option value="">Select Child Category</option>
          {childCategory.map((cat) => (
            <option key={cat._id} value={cat._id}>
              {cat.name}
            </option>
          ))}
        </select>
      </div>

      {/* Submit Button */}
      <div className="md:col-span-2 mt-4">
        <button
          type="submit"
          className="w-full bg-green text-white py-3 rounded-lg
          hover:bg-greenDark
          shadow-md hover:shadow-lg
          transition-all duration-300 font-semibold"
        >
          Add Product
        </button>
      </div>

    </form>
  </div>


  );
};

export default ProductAdd;
