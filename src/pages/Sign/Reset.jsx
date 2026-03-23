import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { resetPasswordThunk } from '../../redux/slices/authSlice'
import { useNavigate } from 'react-router'

const Reset = () => {
    const dispatch=useDispatch()
     const email=useSelector((state)=>state.auth.email)
     const otp=useSelector((state)=>state.auth.otp)
     const navigate=useNavigate()
    const [formData,setFormData]=useState({
        newpassword:""
    })
    const handelchange=(e)=>{
        e.preventDefault()
        setFormData({
            ...formData,
        [e.target.name]:e.target.value
            })
    }
    const handlesubmit=(e)=>{
        e.preventDefault()
        dispatch(resetPasswordThunk({email,otp,...formData}))
        navigate("/signin")
    }
  return (
<>
<div className=' min-h-screen flex items-center justify-center'>
<div  className="bg-color1 w-full max-w-md p-8 rounded-2xl shadow-lg">
<h1 className="text-3xl font-bold text-center mb-2">Reset Password</h1>
<form onSubmit={handlesubmit} >
    <input type="password" onChange={handelchange} name='newpassword' value={formData.newpassword} placeholder='new password enter' />
    <button type='submit'>Reset passwor</button>
</form>
</div>
</div>
</>
  )
}

export default Reset