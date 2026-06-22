import React, { useEffect, useState } from "react";
import { IoIosArrowBack, IoIosArrowForward } from "react-icons/io";

const FeaturedCategory = () => {

  const categories = [
    "/image/01.jpg",
    // "/image/01.webp",
    "/image/chicken.jpg",
    "/image/fish.jpg",
    "/image/meat.png",
    "/image/pampers.jpg",
    "/image/surf.jpg",
    "/image/big body.jpg",
    "/image/ringo.jpg",
    "/image/rolly polly.jpg",
  ];
  const img=[
    "/image/vegatable.jpg",
    "/image/images (6).jpg",
    "/image/dra.webp",
  ]

  const [index, setIndex] = useState(0);

  // Auto Slider
  useEffect(() => {

    const interval = setInterval(() => {
      nextpage();
    }, 3000);

    return () => clearInterval(interval);

  }, [index]);

  // Next Slide
  const nextpage = () => {
    setIndex((prev) =>
      prev + 1 > categories.length -7 ? 0 : prev + 1
    );
  };

  // Previous Slide
  const prepage = () => {
    setIndex((prev) =>
      prev === 0 ? categories.length - 7 : prev - 1
    );
  };

  return (
    <>
      <div className="max-w-full mx-auto   px-4 m-10 ">

        <h1 className="font-semibold text-xl m-7 ">
          Featured Category
        </h1>

        <div className="flex items-center gap-4 max-w-screen-2xl">

          {/* Left Arrow */}
          <button
            onClick={prepage}
            className="text-2xl md:text-3xl bg-white shadow-md p-2 rounded-full  hover:bg-green-500 hover:text-white transition m-10"
          >
            <IoIosArrowBack />
          </button>

          {/* Categories */}
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-7 gap-4 w-full">

            {categories.slice(index, index + 7).map((item) => (

              <div
                key={item}
                className="border flex justify-center items-center xl:h-24 sm:h-32 w-full shadow-md border-white hover:shadow-xl hover:border-green-500 xl:rounded-full  transition bg-white"
              >

                <img
                  src={item}
                  alt=""
                  className="w-16 sm:w-20 object-contain"
                />

              </div>

            ))}

          </div>

          {/* Right Arrow */}
          <button
            onClick={nextpage}
            className="text-2xl md:text-3xl bg-white shadow-md p-2 rounded-full hover:bg-green-500 hover:text-white transition  m-10"
          >
            <IoIosArrowForward />
          </button>

        </div>
        <br />
<div className="grid grid-cols-1 sm:grid-cols-2  md:grid-cols-3 m-10 gap-20">

  {img.map((item) => (

    <div
      key={item}
      className="relative xl:w-96 md:40 rounded-2xl overflow-hidden shadow-lg group"
    >

   
      <div className="relative h-56 overflow-hidden">

        <img
          src={item}
          alt="Vegetables"
          className="w-full h-56 object-cover group-hover:scale-105 transition duration-500"
        />

        <div className="absolute inset-0 bg-black/30"></div>

     
        <div className="absolute inset-0 flex flex-col justify-center items-center text-white text-center px-4">

          <h2 className="text-2xl font-bold mb-2">
            Fresh Vegetables
          </h2>

          <p className="text-sm mb-4">
            Healthy and organic products
          </p>

          <button className="bg-green-500 hover:bg-green-600 px-5 py-2 rounded-full transition">
            Shop Now
          </button>

        </div>

      </div>

    </div>

  ))}

</div>
      </div>
    </>
  );
};

export default FeaturedCategory;