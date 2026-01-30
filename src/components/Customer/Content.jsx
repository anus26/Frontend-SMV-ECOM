import React, { useEffect, useState } from 'react'

const Content = () => {
    const [index,setIndex]=useState(0)
    useEffect(()=>{
        const interval=setInterval(()=>{
            setIndex((prev)=>(prev+1) %images.length)
        },3000)
        return ()=>clearInterval(interval)
    })
    const images=[
         "/image/01.jpg",
  "/image/02.jpg",
    ]
  return (
 <>
 <section>
    <div>
     <div className="flex justify-center w-full mt-6">
  <div className="relative w-[90%] h-[500px] rounded-2xl overflow-hidden shadow-lg">

    <img
      src={images[index]}
      alt="banner"
      className="w-full h-full object-cover duration-700  transition-all ease-in-out"
    />

    <div className="absolute inset-0 bg-black/30"></div>

    <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center px-4">
      <h1 className="text-4xl md:text-5xl font-bold mb-3">
        Welcome to SMV-ECOM
      </h1>
      <p className="text-lg mb-6 max-w-xl">
        Discover the best products at unbeatable prices
      </p>
      <button className="px-6 py-3 rounded-full bg-green-500 hover:bg-green-600 transition">
        Shop Now
      </button>
    </div>

  </div>
</div>

    </div>
 </section>
 </>
  )
}

export default Content