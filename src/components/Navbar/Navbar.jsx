import React, { useEffect, useState, useRef } from "react";
import { CiSearch, CiShoppingCart, CiMenuBurger } from "react-icons/ci";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import useCategory from "../../redux/hooks/useCategory";
import { getthunkcategory } from "../../redux/slices/categorySlice";
import { getslugproductApi } from "../../redux/slices/productSlice";
import useProduct from "../../redux/hooks/useProduct";
import useAuth from "../../redux/hooks/useAuth";
import { IoIosLogOut } from "react-icons/io";
import { logoutApiThunk } from "../../redux/slices/authSlice";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { products = [] } = useProduct();
  const cartItems = useSelector((state) => state.cart.items);
  const { categories = [] } = useCategory();
  const { user } = useAuth();

  const [searchInput, setSearchInput] = useState("");
  const [hoverParent, setHoverParent] = useState(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const menuRef = useRef(null);

  // Filter products for search
const filterData = Array.isArray(products)
  ? products.filter((item) =>
      item.title.toLowerCase().includes(searchInput.toLowerCase())
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

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMobileMenuOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleLogout = async() => {
    await dispatch(logoutApiThunk());
    navigate("/signin");
  };

  return (
    <nav className="bg-green1 shadow-md sticky top-0 z-50 ">
      <div className="max-w-7xl  px-4 sm:px-6 lg:px-8   ">
        <div className="flex justify-between h-16 items-center">


          <div className="hidden md:flex items-center gap-10 justify-between flex-1 ml-6">

            {user?.role === "customer" && (
              <>
          <Link
            to="/"
            className="text-2xl font-bold text-blue  flex items-center "
          >
            <img src="./image/online-shopping.png" alt="image" className="w-8"/>
            SMV-ECOM
          </Link>
                <div className="relative flex ">
                  <input
                    type="text"
                    placeholder="Search products..."
                    className="w-full rounded-full  px-2 pr-14 py-2  focus:ring-2 focus:ring-green focus:outline-none "
                    value={searchInput}
                    onChange={(e) => setSearchInput(e.target.value)}
                  />
                  <CiSearch className="absolute right-4 top-2.5 text-xl text-gray-400 hover:rounded hover:bg-gray2" />
                  {searchInput && (
                    <div className="absolute w-full bg-white shadow-lg rounded mt-10 max-h-60 overflow-y-auto z-50">
                      {filterData.length > 0 ? (
                        filterData.slice(0, 5).map((item) => (
                          <Link
                            key={item._id}
                            to={`/product/${item._id}`}
                            className="block px-4 py-2 hover:bg-green"
                            onClick={() => setSearchInput("")}
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

                <div className="flex gap-6 relative">
                  {parentCategory.map((parent) => (
                    <div
                      key={parent._id}
                      className="relative cursor-pointer group "
                      onMouseEnter={() => setHoverParent(parent._id)}
                      onMouseLeave={() => setHoverParent(null)}
                    >
                      <span className="font-medium">{parent.name}</span>
                      {hoverParent === parent._id && (
                        <div className="absolute top-full left-0 bg-white  shadow-md rounded w-40 z-50">
                          {getChildCategory(parent._id).map((child) => (
                            <div
                              key={child._id}
                              className="px-4 py-2 hover:bg-gray1 cursor-pointer"
                              onClick={() =>
                                navigate(`/category/${child.slug}`)
                              }
                            >
                              {child.name}
                            </div>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}
                </div>

                <Link
                  to="/cartpage"
                  className="relative text-2xl text-gray hover:text-green"
                >
                  <CiShoppingCart />
                  {cartItems.length > 0 && (
                    <span className="absolute -top-2 -right-3  text-white hover:rounded-md bg-hover text-xs w-5 h-5 flex items-center justify-center rounded-full">
                      {cartItems.length}
                    </span>
                  )}
                </Link>
              </>
            )}

            {user?.role === "seller" && (
              <div className="flex gap-4">
                   <Link
          
            className="text-2xl font-bold text-blue  flex items-center "
          >
            <img src="./image/online-shopping.png" alt="image" className="w-8"/>
            SMV-ECOM
          </Link>
                <Link
                  to="/seller"
                  className="px-3 py-1 rounded  "
                >
                  Seller
                </Link>
                <Link
                  to="/productadd"
                  className="px-3 py-1 rounded "
                >
                  Product Add
                </Link>
                <Link
                  to="/addcategory"
                  className="px-3 py-1 rounded bg-blue-500 hover:bg-blue-600"
                >
                  Add Category
                </Link>
                <Link
                  to="/getorder"
                  className="px-3 py-1 rounded bg-blue hover:bg-hover hover:rounded-2xl text-white"
                >
                  Orders
                </Link>
              </div>
            )}

            {user?.role === "Admin" && (
              <div className="flex gap-4">
                 <Link
        
            className="text-2xl font-bold text-blue  flex items-center "
          >
            <img src="./image/online-shopping.png" alt="image" className="w-8"/>
            SMV-ECOM
          </Link>
                <Link
                  to="/admin"
                  className="px-4 py-1.5 rounded bg-green hover:bg-green1"
                >
                  Admin Dashboard
                </Link>
                <Link
                  to="/productget"
                  className="px-4 py-1.5 rounded bg-blue hover:bg-hover"
                >
                  Products
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
            
              <button
                onClick={handleLogout}
                className="px-4 py-1.5 rounded bg-red1 hover:bg-red2 text-white hover:rounded-2xl hover:text-black text-center flex items-center gap-2  "
              >
                Logout
                <span><IoIosLogOut /> </span>
              </button>
            )}
          </div>

          <div className="md:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-3xl text-gray-700"
            >
              <CiMenuBurger />
            </button>
          </div>
        </div>
      </div>

      {mobileMenuOpen && (
        <div
          ref={menuRef}
          className="md:hidden bg-white shadow-md p-4 space-y-4 animate-slide-down"
        >
          {user?.role === "customer" && (
            <input
              type="text"
              placeholder="Search products..."
              className="w-full border px-4 py-2 rounded"
              value={searchInput}
              onChange={(e) => setSearchInput(e.target.value)}
            />
          )}

          {user?.role === "customer" &&
            parentCategory.map((parent) => (
              <div key={parent._id}>
                <div className="font-medium py-2 border-b">{parent.name}</div>
                {getChildCategory(parent._id).map((child) => (
                  <div
                    key={child._id}
                    className="pl-4 py-1 text-sm cursor-pointer hover:text-green-500"
                    onClick={() => navigate(`/category/${child.slug}`)}
                  >
                    {child.name}
                  </div>
                ))}
              </div>
            ))}

          {user?.role === "seller" && (
            <div className="flex flex-col gap-2">
              <Link to="/seller" className="px-4 py-2 bg-green1 rounded">
                Seller
              </Link>
              <Link to="/productadd" className="px-4 py-2 bg-green-500 rounded">
                Product Add
              </Link>
              <Link to="/addcategory" className="px-4 py-2 bg-blue-500 rounded">
                Add Category
              </Link>
              <Link to="/getorder" className="px-4 py-2 bg-blue rounded text-white text-center hover:rounded-2xl ">
                Orders
              </Link>
            </div>
          )}

          {user?.role === "Admin" && (
            <div className="flex flex-col gap-2">
              <Link
                to="/admin"
                className="px-4 py-2 bg-green1 rounded text-black"
              >
                Admin Dashboard
              </Link>
              <Link
                to="/productget"
                className="px-4 py-2 bg-blue rounded text-black"
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
              className="w-full mt-2 px-4 py-2 rounded bg-red-500 hover:bg-red-600 text-white flex justify-center items-center"
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
