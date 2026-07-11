import React,{useEffect, useState} from 'react'
import { IoBagRemoveOutline } from "react-icons/io5";
import { IoHomeOutline } from "react-icons/io5";
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router';
import usebuy from '../../redux/hooks/usebuy';
import { buyAddThunk, buygetThunk } from '../../redux/slices/buySlice';
import toast from 'react-hot-toast';
const BuyNow = () => {
    const {id}=useParams()
    const  dispatch=useDispatch()
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

useEffect(() => {
    dispatch(buygetThunk());
}, []);

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
<section className='flex justify-between'>
    <div className="bg-white rounded-sm shadow-md m-16 w-[70%]">
        <h1 className='font-semibold text-xl m-10'>Delivery Information</h1>
     
  { buy?(

      
      <form onSubmit={handlesubmit}>
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
):(
         <div>
            <h2>{buy.FullName}</h2>
            <p>{buy.Phone}</p>
            <p>{buy.Address}</p>
            <button>Edit</button>
        </div>
)
}  
    </div>





    <div className="bg-white rounded-sm shadow-md m-16 w-[30%] h-[60%]">
        <h1 className='font-semibold text-xl m-5'>Promotion</h1>
        <div className='flex  m-5 justify-between'>
            <input type="text" placeholder="Enter promotion code" className='border rounded-md p-2  border-gray2 hover:border-text'/>
            <button className=' p-2 bg-blue text-white rounded-md hover:bg-blue1 transition duration-300 '>
                Apply
            </button>
        </div>
        <div className='flex m-5 justify-between'>
            <h1 className='font-semibold text-xl '>Invoice and Contact Info</h1>
            <button onClick={()=>setOpen(!open)}>Edit</button>
        </div>

 <div>
    <h1 className='m-4'>Order Summary</h1>
    <div className='flex justify-between m-4 '>
        <h1>items Total</h1>
<p>Rs 153</p>
    </div>
        <div className='flex justify-between m-4'>
        <h1>items Total</h1>
<p>Rs 153</p>
    </div>
        <div className='flex justify-between m-4'>
        <h1>items Total</h1>
    <p>Rs 153</p>
    </div>
    
 </div>
 <div className='border m-4 '></div>
 <div className="flex justify-between m-4">
    <h1>Total</h1>
    <p>
        Rs 303
    </p>

 </div>
 <h1 className='flex justify-end m-4'>VAT included, where applicable</h1>
 <button className='  bg-green hover:bg-green1 p-2 m-2 transition-all duration-300 w-[95%] rounded-md'>
    Proceed to Pay
 </button>
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