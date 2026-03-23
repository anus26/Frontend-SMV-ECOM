import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { forgetPasswordThunk } from '../../redux/slices/authSlice'
import { useNavigate } from 'react-router'

const Forgot = () => {
    const dispatch=useDispatch()
    const [formData,setFormData]=useState({email:""})
    const navigate=useNavigate()
    const handlechange=(e)=>{
        e.preventDefault()
        setFormData({
            ...formData,
            [e.target.name]:e.target.value
        })
    }


    const handleSubmit=(e)=>{
        e.preventDefault()
        localStorage.setItem("email",formData.email) // ✅ best
        dispatch(forgetPasswordThunk(formData))
 
        navigate("/verify"); // ✅ navigate after success
      

    }
  return (
<>
<div className=' min-h-screen flex items-center justify-center' >
    <div className="bg-color1 w-full max-w-md p-8 rounded-2xl shadow-lg">

    <h1 className='text-3xl font-bold text-center mt-10'>Forgot Password</h1>
    <form  className='space-y-4 mt-10' onSubmit={handleSubmit} >
        <div>

        <label  className="block text-sm font-medium mb-1">Email</label>
        <input onChange={handlechange} value={formData.email} name='email' type="email" placeholder='Eneter your email @'              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-greenDark"/>
        </div>
        <button  type='submit ' className="w-full py-2 bg-greenDark text-white rounded-lg font-semibold hover:bg-greenDark transition flex justify-center">
            Send OTP</button>
    </form>
    </div>
</div>
</>
  )
}

export default Forgot