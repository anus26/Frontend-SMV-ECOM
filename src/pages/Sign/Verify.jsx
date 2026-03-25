import React, { useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { resendOtpThunk, verifyPasswordThunk } from '../../redux/slices/authSlice'
import useAuth from '../../redux/hooks/useAuth'
import { useNavigate } from 'react-router'
import { ColorRing } from 'react-loader-spinner'

const Verify = () => {
    const dispatch=useDispatch()
    const email=useSelector((state)=>state.auth.email)
    const {user,loading,error}=useAuth()
    const [otp,setOtp]=useState(new Array(6).fill(""))
    const inputRef=useRef([])
    const navigate=useNavigate()
    const handleChange=(e,index)=>{
      const value=e.target.value
      if(!/^[0-9]$/.test(value)) return
      const newOtp=[...otp]
      newOtp[index]=value
      setOtp(newOtp)
      if (value&&index<5) {
        inputRef.current[index+1].focus()
      }
    
    }
    const handlebackspace=(e,index)=>{
        if(e.key==="Backespace"&&index>0){
            inputRef.current[index-1].focus()
        }
    }
    const handlesubmit=(e)=>{
        e.preventDefault()
        const finalotp=otp.join("")
        dispatch(verifyPasswordThunk({email, otp:finalotp
            
        }))
        navigate("/reset")
        
        
        
    }
    const handleOtp=(e)=>{
e.preventDefault()
const email=JSON.parse(localStorage.getItem("email"))
dispatch(resendOtpThunk({email}))
console.log("EMAIL FROM FRONTEND:", email);
     }
  return (
    <>
    <div className=' min-h-screen flex items-center justify-center'>
  <div className="bg-color1 w-full max-w-md p-8 rounded-2xl shadow-lg">
<h1 className="text-3xl font-bold text-center mb-2">Verify OTP</h1>
<form  className='space-y-4' onSubmit={handlesubmit}>
    <div className='flex gap-6'>
{otp.map((digit,i)=>(

    <input type="text" key={i} maxLength={1} 
    value={digit} onChange={(e)=>handleChange(e,i)}
    onKeyDown={(e)=>handlebackspace(e,i)}
    ref={(el)=>(inputRef.current[i]=el)}
      className='w-12 h-10 outline-gray2 rounded-md  hover:outline-green flex text-center' />
))}

    </div>
    <button type='submit' className="w-full py-2 bg-greenDark text-white rounded-lg font-semibold hover:bg-greenDark transition flex justify-center">
        verify</button>
</form>
<div className='mt-4 text-center'>
    <button onClick={handleOtp}>  {loading?(
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
      "Resend OTP"
    

   )}</button>
</div>
  </div>
    </div>
    </>
  )
}

export default Verify