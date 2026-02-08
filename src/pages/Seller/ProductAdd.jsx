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
    <div className="max-w-md mx-auto p-4 border rounded">
      <h2 className="text-xl font-bold mb-4">Add Product</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Product Title"
          name="title"
          value={form.title}
          onChange={handlechange}
          className="w-full border p-2 mb-2"
        />

        <textarea
          placeholder="Product Description"
          name="description"
          value={form.description}
          onChange={handlechange}
          className="w-full border p-2 mb-2"
        />

        <input
          type="number"
          placeholder="Price"
          name="price"
          value={form.price}
          onChange={handlechange}
          className="w-full border p-2 mb-2"
        />

        <input
          type="number"
          placeholder="Stock"
          name="stock"
          value={form.stock}
          onChange={handlechange}
          className="w-full border p-2 mb-2"
        />

        <input
          type="file"
          name="image"
          onChange={handlechange}
          className="w-full border p-2 mb-2"
        />

        {/* Parent Category */}
        <select
          name="parentCategory"
          value={form.parentCategory}
          onChange={handlechange}
          className="w-full border p-2 mb-4"
        >
          <option value="">Select Parent Category</option>
          {parentCategory.map((cat) => (
            <option key={cat._id} value={cat._id}>
              {cat.name}
            </option>
          ))}
        </select>

        {/* Child Category */}
        <select
          name="category"
          value={form.category}
          onChange={handlechange}
          className="w-full border p-2 mb-4"
          disabled={!form.parentCategory}
        >
          <option value="">Select Child Category</option>
          {childCategory.map((cat) => (
            <option key={cat._id} value={cat._id}>
              {cat.name}
            </option>
          ))}
        </select>

        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Add Product
        </button>
      </form>
    </div>
  );
};

export default ProductAdd;
