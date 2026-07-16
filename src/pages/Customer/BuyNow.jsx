import React,{useEffect, useState} from 'react'
import { IoBagRemoveOutline } from "react-icons/io5";
import { IoHomeOutline } from "react-icons/io5";
import { useDispatch } from 'react-redux';
import { Link, useParams } from 'react-router';
import usebuy from '../../redux/hooks/usebuy';
import { buyAddThunk, buygetThunk } from '../../redux/slices/buySlice';
import toast from 'react-hot-toast';
import ProductCard from '../../components/Customer/ProductCard';
import Product from './Product';
import useProduct from '../../redux/hooks/useProduct';
const BuyNow = () => {
    const {id}=useParams()
    const  dispatch=useDispatch()
    const {products}=useProduct()
    const product = products.find((item) => item._id === id);
    const {buy,loading,error}=usebuy()
    const [open,setOpen]=useState(false)
    const userid=buy?.userId

    const [data,setData]=useState(false)
    const [formData,setFormData]=useState({
FullName:"",
Province:"",
City:"",
Area:"",
Phone:"",
Address:"",
Building:"",
Colony:"",
AddressType:""



})


const input=[
{
label:"Full Name",
name:"FullName"
},
{
label:"Province",
name:"Province"
},
{
label:"City",
name:"City"
},
{
label:"Area",
name:"Area"
},
{
label:"Phone",
name:"Phone"
},
{
    label:"Address",
    name:"Address"
},
{
    label:"Colony/suburb/Locality/Landmark",
    name:"Colony"
},
{
    label:"Building/House.No/Floor/Street",
    name:"Building"
},
]
useEffect(() => {
    dispatch(buygetThunk());
    console.log("buy",buy);
}, []);
const handleChange=(e)=>{
        setFormData({
            ...formData,
            [e.target.name]:e.target.value

        })
    }
    const handlesubmit=(e)=>{
        e.preventDefault()
        // if(formData.Province===""){
        //     toast.apply("Please select Province")
        // }

    // if(formData.City === ""){
    //     toastt.apply("Please select City")
    //     return
    // }
        dispatch(buyAddThunk(formData))
    }
  return (
   <>
<section className="max-w-7xl mx-auto p-4 lg:p-8 grid grid-cols-1 lg:grid-cols-3 gap-6">
<div className="lg:col-span-2 bg-white rounded-xl shadow border border-gray">
     
  { buy&& !data?(
      
      
     <div className="p-6">
    <div className="flex justify-between items-center border-b pb-3">
        <div>
            <h2 className="text-lg font-semibold">
                Shipping Address
            </h2>
            <p className="text-gray-500 text-sm">
                Delivery Information
            </p>
        </div>

        <button
            onClick={() => {
                setData(true);
                setFormData(buy);
            }}
            className="text-green font-medium hover:underline"
        >
            Edit
        </button>
    </div>

    <div className="mt-5 grid md:grid-cols-2 gap-4">

        <div>
            <p className="text-gray-500 text-sm">Full Name</p>
            <h3 className="font-semibold">{buy.FullName}</h3>
        </div>

        <div>
            <p className="text-gray-500 text-sm">Phone</p>
            <h3>{buy.Phone}</h3>
        </div>

        <div className="md:col-span-2">
            <p className="text-gray-500 text-sm">Address</p>

            <h3>
                {buy.Building}, {buy.Colony},
                {buy.Area}, {buy.City},
                {buy.Province}
            </h3>
        </div>

    </div>
 <div className="flex gap-4 p-4 mt-5 border rounded-xl shadow-sm bg-white">

  <img
    src={product?.images?.[0]}
    alt={product?.title}
    className="w-24 h-24 object-cover rounded-lg border"
  />

  <div className="flex flex-col justify-between flex-1">

    <h2 className="text-lg font-semibold text-gray-800 line-clamp-2">
      {product?.title}
    </h2>

    <p className="text-sm text-gray-500">
      Qty: 1
    </p>

    <div className="flex justify-between items-center mt-2">
      <span className="text-xl font-bold text-green">
        Rs {product?.price}
      </span>

      <span className="text-xs bg-gray-100 px-2 py-1 rounded">
        In Stock
      </span>
    </div>

  </div>

</div>
</div>
    
):(
    
    
    <form onSubmit={handlesubmit}>
          <h1 className='font-semibold text-xl m-10'>Delivery Information</h1>
<div className="">
<div className="grid grid-cols-2 gap-8 m-10">


 {input.map((item)=>(
     <div key={item.name} className="text-text" >
         <label htmlFor={item} >{item.label}</label>
         <input onChange={handleChange} value={formData[item.name]}  disabled={(item.name ==="City"  && !formData.Province) 
              || (item.name ==="Area"  && !formData.City) 
                   || (item.name ==="Address"  && !formData.Area) 
                       || (item.name ==="Colony"  && !formData.Address) 
                                || (item.name ==="Building"  && !formData.Colony) 
             }   
               type="text" id={item} name={item.name} className="border rounded-md p-2 w-full border-gray2 hover:border-text" />
        
     </div>
 ))}
 </div>
  <div className='  m-10'>
 <h1  className='flex justify-end mr-10 font-semibold'>Select a label for this address</h1>
 <div className='flex gap-3 justify-end'>
   
 <button type='button' onClick={()=>setFormData({
         ...formData,AddressType:"Office"
})} className={`flex items-center gap-2 p-4 bg-white text-black shadow-md m-3 rounded-md border-green border ${formData.AddressType==="Office" 
 ? "bg-green text-white" 
 : "bg-white text-black"}`}>
   <IoBagRemoveOutline  />  Office
 </button>
 <button type="button" onClick={()=>setFormData({
     ...formData,AddressType:"Home"
 })} className={`flex items-center gap-2 p-4 bg-white text-black shadow-md m-3 rounded-md border-red1 border ${formData.AddressType==="Home" 
 ? "bg-red1 text-white" 
 : "bg-white text-black"}`}>
    <IoHomeOutline /> Home
     </button>

    
  

</div>
     </div>

         </div>
         <div className='flex justify-end '>

     <button className=' p-4 w-32 m-5 bg-green text-white rounded-lg shadow-md hover:bg-green1 transition duration-300 '>
         Save
         </button> 
         </div>
     </form>
)
}  
    </div>






  <div className="bg-white rounded-xl shadow-md border border-gray p-6 h-fit lg:sticky lg:top-5">

  {/* Promotion */}
  <div className="mb-6">
    <h2 className="text-lg font-semibold mb-3">Promotion</h2>

    <div className="flex gap-2">
      <input
        type="text"
        placeholder="Enter promotion code"
        className="flex-1 border border-gray rounded-lg px-3 py-2 focus:outline-none focus:border-green"
      />

      <button className="bg-blue text-white px-5 rounded-lg hover:bg-blue1 transition">
        Apply
      </button>
    </div>
  </div>

  {/* Invoice */}
  <div className="flex justify-between items-center border-t border-b py-4">
    <h2 className="text-lg font-semibold">
      Invoice & Contact Info
    </h2>

    <button
      onClick={() => setOpen(true)}
      className="text-green font-medium hover:underline"
    >
      Edit
    </button>
  </div>

  {/* Order Summary */}
  <div className="mt-6">
    <h2 className="text-lg font-semibold mb-4">
      Order Summary
    </h2>

    <div className="space-y-3">

      <div className="flex justify-between text-gray-600">
        <span>Items Total</span>
        <span>Rs 153</span>
      </div>

      <div className="flex justify-between text-gray-600">
        <span>Shipping Fee</span>
        <span>Rs 150</span>
      </div>

      <div className="flex justify-between text-gray-600">
        <span>Discount</span>
        <span>- Rs 0</span>
      </div>

    </div>

    <hr className="my-5" />

    <div className="flex justify-between text-xl font-bold">
      <span>Total</span>
      <span className="text-green">Rs 303</span>
    </div>

    <p className="text-xs text-gray-500 mt-2">
      VAT included, where applicable.
    </p>

    <button className="w-full mt-6 bg-green hover:bg-green1 text-white py-3 rounded-lg font-semibold transition">
      Proceed to Pay
    </button>
  </div>

</div>
    </section>   
    {open&&(
       <div className='drawer-toggle drawer-left p-4 bg-white fixed top=16 right-0 menu  h-full w-96  shadow-md'>
           <h1 className='font-semibold text-xl'>Invoice and Contact Info</h1>
           <div className='flex-col mt-3 '> 
            <label htmlFor="" className='font-medium text-md'>Email</label>
            <input type="email"  placeholder='Enter Email' className='w-80 mt-2 border p-1 rounded-md border-gray2 hover:border-text' />
            <p className='text-text text-sm'>Enter your email to get delivery status updates</p>

           </div>
           <div className='flex justify-between mt-3'>
            <h1>Billing Address</h1>
            <button>Edit</button>
           </div>
            <div className=''>
                <textarea name="" id="" className='w-80 rounded-md p-1 mt-3  border-gray2 border hover:border-text'></textarea>
                <p className='text-text text-sm'>Please edit your billing address</p>
            </div>
            <div className='flex justify-center gap-4 mt-5'>
           <button onClick={()=>setOpen(false)} className='bg-gray p-2 w-32 duration-300 transiton-all hover:bg-white'>Close</button>
           <button  className='bg-green hover:bg-green1 duration-300 transition-all p-2 w-32' >Save</button>
            </div>

       </div> 
    )}
   </>
  )
}

export default BuyNow