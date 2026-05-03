import React, { useEffect, useState } from 'react'

const Content = () => {
    const [index,setIndex]=useState(0)
    const images=[
         "/image/01.jpg",
  "/image/02.jpg",
    ]
    useEffect(()=>{
        const interval=setInterval(()=>{
            setIndex((prev)=>(prev+1) %images.length)
        },3000)
        return ()=>clearInterval(interval)
    },[images.length])
  return (
 <>
<section className="w-full">
  <div className="max-w-8xl  m-10  px-4 ">

    <div className="relative w-full h-[500px] rounded-2xl overflow-hidden shadow-lg">

        <img
          src={images[index]}
          alt="banner"
          className="w-full h-full object-cover transition-all duration-700 ease-in-out"
        />

        <div className="absolute inset-0 bg-color2/30"></div>

        <div className="absolute inset-0 flex flex-col items-center justify-center text-light text-center px-4">
          
          <h1 className="text-4xl md:text-5xl sm:text-3xl font-bold mb-3">
            Welcome to SMV-ECOM
          </h1>

          <p className="text-lg mb-6 max-w-xl">
            Discover the best products at unbeatable prices
          </p>

          <button className="px-6 py-3 rounded-full bg-green3 hover:bg-green1 transition">
            Shop Now
          </button>

        </div>

      </div>

    </div>



 </section>
 </>
  )
}

export default Content