import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import useCategory from "../../redux/hooks/useCategory";
import { getthunkcategory, thunkcategory } from "../../redux/slices/categorySlice";

const AddCategory = () => {
  const dispatch = useDispatch();
  const { categories } = useCategory();

  const [form, setForm] = useState({
    name: "",
    parentCategory: ""
  });

  useEffect(() => {
    dispatch(getthunkcategory());
  }, [dispatch]);

  // ✅ FIXED
  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm({
      ...form,
      [name]: value
    });
  };

  // ✅ MOST IMPORTANT FIX
  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(
      thunkcategory({
        ...form,
        parentCategory: form.parentCategory || null
      })
    );

    // optional: clear form
    setForm({
      name: "",
      parentCategory: ""
    });
  };

  return (
    <div className="max-w-xl mx-auto mt-12 bg-white shadow-xl rounded-2xl p-8 border border-gray2">

      <h2 className="text-2xl font-bold text-greenDark mb-6">
        Add New Category
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">

        <div>
          <label className="block text-sm text-text mb-1">
            Category Name
          </label>
          <input
            type="text"
            name="name"
            value={form.name}
            onChange={handleChange}
            placeholder="Enter category name"
            className="w-full border border-gray2 bg-gray3 p-3 rounded-lg
            focus:outline-none focus:ring-2 focus:ring-green1
            focus:border-green
            hover:shadow-md hover:shadow-green1/40
            transition-all duration-300"
          />
        </div>

        <div>
          <label className="block text-sm text-text mb-1">
            Parent Category
          </label>
          <select
            name="parentCategory"
            value={form.parentCategory}
            onChange={handleChange}
            className="w-full border border-gray2 bg-gray3 p-3 rounded-lg
            focus:outline-none focus:ring-2 focus:ring-green1
            focus:border-green
            transition-all duration-300"
          >
            <option value="">No Parent (Main Category)</option>
            {categories?.filter((cate) =>cate.parentCategory===null).map((cate)=> (
              <option key={cate._id} value={cate._id}>
                {cate.name}
              </option>
            ))}
          </select>
        </div>

        <button
          type="submit"
          className="w-full bg-green text-white py-3 rounded-lg
          hover:bg-greenDark
          shadow-md hover:shadow-lg
          transition-all duration-300 font-semibold"
        >
          Add Category
        </button>

      </form>
    </div>
  );
};

export default AddCategory;
