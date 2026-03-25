import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { resendOtpThunk, resetPasswordThunk } from '../../redux/slices/authSlice'
import { useNavigate } from 'react-router'
import { ColorRing } from 'react-loader-spinner'
import useAuth from '../../redux/hooks/useAuth'
import { FaRegEye, FaRegEyeSlash } from 'react-icons/fa'

const Reset = () => {
    const dispatch=useDispatch()
     const email=useSelector((state)=>state.auth.email)
     const otp=useSelector((state)=>state.auth.otp)
     const {user,loading,error}=useAuth()
     const navigate=useNavigate()
       const [show ,setShow]=useState(false)
    const [formData,setFormData]=useState({
        newpassword:""
    })
    const handleshow=()=>{
        setShow(prev=>!prev)
    }
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
<form onSubmit={handlesubmit} className='space-y-4 mt-10 ' >
    <div className='relative' >
  <label className="block text-sm font-medium mb-1">New Password</label>
    <input       type={show? "text":"password"}onChange={handelchange} name='newpassword' value={formData.newpassword} placeholder='new password enter'
     className=" w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-greenDark"/>
     <div onClick={handleshow}  className="absolute right-3 top-9 " >
 
        {show?(
           <>
                       <FaRegEye />
                       </>   
        ):(
<FaRegEyeSlash />
        )}
     </div>
     </div>
    <button type='submit'
    className="w-full py-2 bg-greenDark text-white rounded-lg font-semibold hover:bg-greenDark transition flex justify-center">  {loading?(
    <>
    <ColorRing
visible={true}
height="30"
width="30"

ariaLabel="color-ring-loading"
wrapperStyle={{}}
wrapperClass="color-ring-wrapper"
colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
/>
    </>
    ):(
      "Reset Password"
    

   )}</button>
</form>

</div>
</div>
</>
  )
}

export default Reset