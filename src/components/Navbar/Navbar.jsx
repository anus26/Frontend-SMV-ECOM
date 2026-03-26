import React, { useEffect, useState, useRef } from "react";
import { CiSearch, CiShoppingCart, CiMenuBurger } from "react-icons/ci";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import useCategory from "../../redux/hooks/useCategory";
import { getthunkcategory } from "../../redux/slices/categorySlice";
import { getslugproductApi } from "../../redux/slices/productSlice";
import useProduct from "../../redux/hooks/useProduct";
import useAuth from "../../redux/hooks/useAuth";
import { IoIosArrowDown, IoIosArrowUp, IoIosLogOut } from "react-icons/io";
import { logoutApiThunk } from "../../redux/slices/authSlice";
import { TiDelete } from "react-icons/ti";
import { FaArrowAltCircleDown, FaArrowAltCircleUp } from "react-icons/fa";
const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { products = [] } = useProduct();
  const cartItems = useSelector((state) => state.cart.items);
  const { categories = [] } = useCategory();
  const { user } = useAuth();
  const [deleteitems,setDeleteItems]=useState(null)
  const [searchInput, setSearchInput] = useState("");
  const [hoverParent, setHoverParent] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showinput,setShowInput]=useState(false)
  const [inputvalue,setInputValue]=useState('')
  const [openParent, setOpenParent] = useState(null);
  // const menuRef = useRef(null);

  // Filter products for search
const filterData = Array.isArray(products)
  ? products.filter((item) =>
      item?.title?.toLowerCase()?.includes(searchInput?.toLowerCase())
    )
  : [];

  // Parent/child categories
  const parentCategory = categories.filter((cat) => !cat.parentCategory);
  const getChildCategory = (parentId) =>
    categories.filter((cat) => cat.parentCategory === parentId);

  useEffect(() => {
    dispatch(getslugproductApi());
    dispatch(getthunkcategory());
  }, [dispatch]);

  // useEffect(() => {
  //   const handleClickOutside = (event) => {
  //     if (menuRef.current && !menuRef.current.contains(event.target)) {
  //       setMobileMenuOpen(false);
  //     }
  //   };
  //   document.addEventListener("mousedown", handleClickOutside);
  //   return () =>
  //     document.removeEventListener("mousedown", handleClickOutside);
  // }, []);

  const handleLogout =async() => {
    await dispatch(logoutApiThunk());
    navigate("/signin");
  };
const toggleInput=()=>{
setShowInput(true)
}
  return (
    <nav className="bg-green1 shadow-md sticky top-0 z-50 h-16">
      <div className="  px-4 xs:px-6 lg:px-8   flex justify-between items-center h-16   ">
  {
    user?.role==="customer"&&(

          <Link
            to="/"
            className="text-2xl font-bold text-blue flex items-center w-[50%] "
          >
            <img src="./image/online-shopping.png" alt="image" className="w-8"/>
            SMV-ECOM
          </Link>
    )
  }
  {
    user?.role==="seller"&&(

          <Link
            to="/seller"
            className="text-2xl font-bold text-blue flex items-center w-[50%] "
          >
            <img src="./image/online-shopping.png" alt="image" className="w-8"/>
            SMV-ECOM
          </Link>
    )
  }
    {
    user?.role==="Admin"&&(

          <Link
            to="/Admin"
            className="text-2xl font-bold text-blue flex items-center w-[50%] "
          >
            <img src="./image/online-shopping.png" alt="image" className="w-8"/>
            SMV-ECOM
          </Link>
    )
  }
        <div className="    ">


    

           <div className="flex  justify-between  ">

            {user?.role === "customer" && (
              <div className="flex justify-between    gap-10  ">
              
    

    
          

                <div className=" gap-6 relative  mt-2  xl:flex xs:hidden">
                  {parentCategory.map((parent) => (
                    <div
                      key={parent._id}
                      className="relative    inline-block cursor-pointer group font-semibold"
                      onMouseEnter={() =>  setHoverParent(parent._id)}
                      onMouseLeave={() =>  setHoverParent(null)}
                    >
                      <span className="font-medium">{parent.name}</span>
                                        <span className="absolute left-1/2 -translate-x-1/2 bottom-0  h-[2px] w-0 bg-green group-hover:w-full duration-300 transition-all"></span>
                      
                      {hoverParent === parent._id && (
                        <div className="absolute  left-0 bg-white  shadow-md rounded w-40 z-50">
                          {getChildCategory(parent._id).map((child) => (
                            <div
                              key={child._id}
                              className="px-4 py-2 hover:bg-gray1 cursor-pointer "
                              onClick={() =>{setSearchInput()
                                navigate(`/category/${child.slug}`)
                              }}
                            >
                              {child.name}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
                <div className="flex items-center   ">
      <div className="relative">
  <Link
    to="/cartpage"
    className="text-2xl relative flex items-center hover:bg-gray p-2 rounded-full"
  >
    <CiShoppingCart className="hover:bg-gray rounded-full transition font-medium" />

    {cartItems.length > 0 && (
      <span className="absolute -top-2 -right-3 bg-red1 p-2 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
        {cartItems.length}
      </span>
    )}
  </Link>
</div>

  <button
    onClick={()=>setShowInput(true)}
    className="p-2 hover:bg-gray rounded-full  transition "
  >
    <CiSearch className="text-xl text-gray-600"     />
  </button>

{showinput && (
  <div className="fixed inset-0 bg-black/40 flex justify-center items-start pt-24 z-50">
    <div className="bg-white w-[90%] sm:w-[400px] rounded-xl shadow-xl p-6 relative">

      <button
        onClick={() => setShowInput(false)}
        className="absolute right-4 top-4 text-gray-500 text-xl"
      >
        ✕
      </button>

      <div className="relative mt-6">
        <input
          autoFocus
          type="text"
          placeholder="Search products..."
          className="w-full rounded-full border px-4 py-2 focus:ring-2 focus:ring-green"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
        />

        {searchInput && (
          <div className="absolute top-12 left-0 w-full bg-white shadow-lg rounded-xl max-h-60 overflow-y-auto">
            {filterData.length > 0 ? (
              filterData.slice(0, 5).map((item) => (
                <Link
                  key={item._id}
                  to={`/product/${item._id}`}
                  className="block px-4 py-2 hover:bg-gray-100 "
                  onClick={() => {
                    setSearchInput("");
                    setShowInput(false);
                  }}
                >
                  {item.title}
                  
                </Link>
              ))
            ) : (
              <div className="px-4 py-2 text-gray-500">
                No product found
              </div>
            )}
          </div>
        )}
      </div>

    </div>
  </div>
)}
</div>
                  </div>
         
     
            )}

            {user?.role === "seller" && (
              <div className="flex gap-4 xl:block xs:hidden">

                <Link
                  to="/productadd"
                  className="px-3 py-1 rounded relative inline-block cursor-pointer group font-semibold"
                >
                Product Add
                <span className="absolute left-1/2 -translate-x-1/2 bottom-0  h-[2px] w-0 bg-green group-hover:w-full duration-300 transition-all"></span>
                </Link>
                <Link
                  to="/addcategory"
                  className="px-3 py-1 rounded relative inline-block cursor-pointer group font-semibold"
                >
                  Add Category
                  <span className="absolute left-1/2 -translate-x-1/2 bottom-0  h-[2px] w-0 bg-green group-hover:w-full duration-300 transition-all"></span>
                </Link>
                <Link
                  to="/getorder"
                  className="px-3 py-1 rounded  relative inline-block cursor-pointer group font-semibold"
                >
                  Orders
                  <span className="absolute left-1/2 -translate-x-1/2 bottom-0  h-[2px] w-0 bg-green group-hover:w-full duration-300 transition-all"></span>
                </Link>
              </div>
            )}

            {user?.role === "Admin" && (
              <div className="flex gap-4 xl:block xs:hidden">

                <Link
                  to="/productget"
                  className="px-4 py-1.5 rounded relative inline-block cursor-pointer group font-semibold"
                >
                  Products
                  <span className="absolute left-1/2 -translate-x-1/2 bottom-0  h-[2px] w-0 bg-green group-hover:w-full duration-300 transition-all"></span>
                </Link>

              </div>
            )}

            {!user && (
              <div className="flex gap-4 ml-4">
                <Link
                  to="/signin"
                  className="px-4 py-1.5 rounded bg-green hover:bg-green1 text-white"
                >
                  Login
                </Link>
                <Link
                  to="/signup"
                  className="px-4 py-1.5 rounded bg-blue hover:bg-hover text-white"
                >
                  Signup
                </Link>
              </div>
            )}

           
            {user && (
            
        <div className="relative group  xl:block  text-center flex justify-center p-2 bg-gray rounded-full">
  <div className="cursor-pointer font-medium  p-1 w-full text-center flex justify-center">
    {user.name?.charAt(0).toUpperCase()}
  </div>

  <div className="absolute hidden group-hover:block right-0   bg-white shadow-md rounded-md">
    <button
      onClick={handleLogout}
      className="w-full text-left px-4 py-2 hover:bg-gray-100 text-red-500"
    >
      Logout
    </button>
  </div>
</div>
            )}
          </div>

        </div>
          <div className="xl:hidden sm:block ">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-3xl text-black flex"
            >
             {mobileMenuOpen?<TiDelete/>:<CiMenuBurger />}
            </button>
          </div>
      </div>

      {mobileMenuOpen && (
        <div
    
          className="sm:block xl:hidden bg-white fixed top-16 right-0 drawer-toggle drawer-left menu  h-full w-80 p-4 shadow-md   " 
        >  
          {user?.role === "customer" && (
            <div  className="w-full grid grid-flow-row">


{/* 
            <input
              type="text"
              placeholder="Search products..."
              className="w-full border px-4 py-2 rounded"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
            />
         {searchInput && (
                    <div className="absolute w-[40%] bg-white  shadow-lg rounded-xl    max-h-60 overflow-y-auto z-50" onClick={()=>searchInput()}>
                      {filterData.length > 0 ? (
                        filterData.slice(0, 5).map((item) => (
                          <div className="flex justify-between" key={item._id}>

                          <Link
                      
                          to={`/product/${item._id}`}
                          className=" px-4 py-2 hover:bg-gray2  text-black"
                           onClick={() => {
    setSearchInput("");
    setMobileMenuOpen(false);   // ✅ menu close
  }}
                              
                          >
                            

                            {item.title}
                        
                          </Link>

                        </div>
                        ))
                      ) : (
                        <div className="px-4 py-2 text-gray">
                          No product found
                        </div>
                      )}
                    </div>
                  )} */}

       <div className="  gap-6 flex flex-col">
                  {parentCategory.map((parent) => (
<div key={parent._id}>
<div
        className="flex justify-between items-center cursor-pointer py-2"
        onClick={() =>
          setOpenParent(
            openParent === parent._id ? null : parent._id
          )
        }
      >
        <span className="font-medium">{parent.name}</span>

        {openParent === parent._id ? (
        <IoIosArrowUp />
        ) : (
       <IoIosArrowDown />
        )}
      </div>

                      {openParent === parent._id && (
                        <div className="   mt-2 flex flex-col  ">
                          {getChildCategory(parent._id).map((child) => (
                            <div
                              key={child._id}
                              className="px-4 py-2 hover:bg-gray1 cursor-pointer"
                              onClick={() =>{setMobileMenuOpen(false)
                                navigate(`/category/${child.slug}`)
                              }}
                            >
                              {child.name}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
          </div>
        )}

          {user?.role === "seller" && (
            <div className="flex flex-col gap-2 ">
             
              <Link to="/productadd" className="px-4 py-2 rounded" onClick={() => setMobileMenuOpen(false)}>
                Product Add
              </Link>
              <Link to="/addcategory" className="px-4 py-2  rounded" onClick={() => setMobileMenuOpen(false)}>
                Add Category
              </Link>
              <Link to="/getorder" className="px-4 py-2  rounded text-black  hover:rounded-2xl " onClick={() => setMobileMenuOpen(false)}>
                Orders
              </Link>
            </div>
          )}

          {user?.role === "Admin" && (
            <div className="flex flex-col gap-2">
           
              <Link
                to="/productget"
                className="px-4 py-2 rounded text-black"
              >
                Products
              </Link>
            </div>
          )}

          {!user && (
            <div className="flex flex-col gap-2">
              <Link
                to="/login"
                className="px-4 py-2 rounded bg-green1 text-black text-center"
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="px-4 py-2 rounded bg-blue text-black text-center"
              >
                Signup
              </Link>
            </div>
          )}

          {user && (
            <button
              onClick={handleLogout}
              className="w-full mt-10 px-4 py-2 rounded bg-red2 hover:bg-red1 text-black flex justify-center items-center"
            >
              <span><IoIosLogOut className=""/></span>
              Logout
            </button>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
