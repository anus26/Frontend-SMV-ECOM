import React, { useEffect, useState } from 'react'
import { IoIosArrowBack,IoIosArrowForward } from "react-icons/io";

const FeaturedCategory = () => {
    const categories=[
        "/image/01.jpg",
        "/image/01.webp",
        "/image/chicken.jpg",
        "/image/fish.jpg",
        "/image/meat.png",
        "/image/pampers.jpg",
        "/image/surf.jpg",
        "/image/big body.jpg",
        "/image/ringo.jpg",
        "/image/rolly polly.jpg"
    ]
    const [currentPage, setCurrentPage] = useState(1);
    const perpage=7
    const totalpage=Math.ceil(categories.length/perpage)
    const indexoflastitem=currentPage*perpage
    const indexoffirstitem=indexoflastitem-perpage
    const currrentitem=categories.slice(
        indexoffirstitem,indexoflastitem
    )
    const nextpage=()=>{
        if(currentPage<totalpage){
    setCurrentPage(currentPage+1)
        }
    }
    const prepage=()=>{
        if(currentPage>1){
            setCurrentPage(currentPage-1)
        }
    }
   
  return (
<>
<div >
    <h1 className='  m-10  px-4 font-semibold text-xl'>  Featured Category</h1>
    <div className=' flex gap-4  m-10  px-4     '>
        <button onClick={prepage} disabled={currentPage===1}
               className="text-3xl bg-white shadow-md p-2 rounded-full disabled:opacity-30"
               >
            <IoIosArrowBack/>
        </button>
{currrentitem.map((item)=>(

    <div key={item} className='border flex justify-center items-center w-32 m-5 shadow-md border-white hover:shadow-xl hover:border-green3'>

    <img src={item} alt="" className=' flex justify-center items-center m-2 w-20 '/>
    </div>

))}
<button onClick={nextpage} disabled={currentPage===totalpage}
            className="text-3xl bg-white shadow-md p-2 rounded-full disabled:opacity-30"
>
    <IoIosArrowForward />
</button>

    </div>
  
</div>

</>
  )
}

export default FeaturedCategory