import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import useCategory from '../../redux/hooks/useCategory';
import { thunkcategory } from '../../redux/slices/categorySlice';

const AddCategory = () => {
  const dispatch=useDispatch()
  const {  categories}=useCategory()
  const [form,setForm]=useState({
    name:"",
    parentCategory:""
  })
  const handleChange=(e)=>{
    e.preventDefault()
    setForm({...form,[e.target.name]:e.target.value})
  }
const handleSubmit = (e) => {
  e.preventDefault();
  dispatch(thunkcategory(form));

};

  return (
    <div className="max-w-md mx-auto p-4 border rounded">
      <h2 className="text-xl font-bold mb-4">Add Category</h2>
<form onSubmit={handleSubmit}>

      <input
        placeholder="Category Name"
        className="w-full border p-2 mb-2"
        onChange={handleChange}
        name='name'
        value={form.name}
        />

      <select className="w-full border p-2 mb-4" onChange={handleChange} name='parentCategory' value={form.parentCategory}>
        <option value="">No Parent (Main Category)</option>
        
 {categories.map((cate) => (
    <option key={cate._id} value={cate._id}>
      {cate.name}
    </option>
  ))}
      </select>

      <button className="bg-green-500 text-black px-4 py-2 rounded" type='submit'>
        Add Category
      </button>
        </form>
    </div>
  );
};


export default AddCategory