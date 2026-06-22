import React,{useState} from 'react'
import { IoBagRemoveOutline } from "react-icons/io5";
import { IoHomeOutline } from "react-icons/io5";
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router';
import usebuy from '../../redux/hooks/usebuy';
import { buyAddThunk } from '../../redux/slices/buySlice';
const BuyNow = () => {
    const {id}=useParams()
    const  dispatch=useDispatch()
    const {buy,loading,error}=usebuy()
    const userid=buy?.userId
    const [formData,setFormData]=useState({})
    const input=[
        "Full Name",
        "Province",
        "City",
        "Area",
        "Phone",
        "Address",
        "Building/House.No/Floor/Street",
        "Colony/suburb/Locality/Landmark"
    ]
    const handleChange=(e)=>{
        setFormData({
            ...formData,
            [e.target.name]:e.target.value

        })
    }
    const handlesubmit=(e)=>{
        e.preventDefault()
        dispatch(buyAddThunk(formData))
    }
  return (
   <>
<section>
    <div className="bg-white rounded-sm shadow-md m-16">
        <h1 className='font-semibold text-xl m-10'>Delivery Information</h1>
     
    <form >
<div className="">
<div className="grid grid-cols-2 gap-8 m-10">


{input.map((item)=>(
    <div key={item} className="text-text" >
        <label htmlFor={item} >{item}</label>
        <input type="text" id={item} name={item} className="border rounded-md p-2 w-full border-gray2 hover:border-text" />
    </div>
))}
</div>
 <div className='  m-10'>
<h1  className='flex justify-end mr-10 font-semibold'>Select a label for this address</h1>
<div className='flex gap-3 justify-end'>

<button className='flex items-center gap-2 p-4 bg-white text-black shadow-md m-3 rounded-md border-green border transition duration-300 hover '>
  <IoBagRemoveOutline  />  Office 
</button>
<button className='flex items-center gap-2 p-4 bg-white text-black shadow-md m-3 rounded-md border-red1 border transition duration-300 hover '>
   <IoHomeOutline /> Home
</button>
</div>
    </div>

        </div>
        <div className='flex justify-end m'>

    <button className=' p-4 w-32 m-5 bg-green text-white rounded-lg shadow-md hover:bg-green1 transition duration-300 '>
        Save
        </button> 
        </div>
    </form>
    </div>
    </section>   
   </>
  )
}

export default BuyNow