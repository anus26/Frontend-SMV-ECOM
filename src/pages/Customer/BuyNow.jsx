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
label:"Building/House.No/Floor/Street",
name:"Building"
},
{
label:"Colony/suburb/Locality/Landmark",
name:"Colony"
}
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
     
    <form onSubmit={handlesubmit}>
<div className="">
<div className="grid grid-cols-2 gap-8 m-10">


{input.map((item)=>(
    <div key={item.name} className="text-text" >
        <label htmlFor={item} >{item.label}</label>
        <input onChange={handleChange} value={formData[item.name]}  type="text" id={item} name={item.name} className="border rounded-md p-2 w-full border-gray2 hover:border-text" />
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