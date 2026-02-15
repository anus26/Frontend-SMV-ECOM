import React, { useEffect, useState } from 'react'
import { CiSearch, CiShoppingCart } from "react-icons/ci";
import { useDispatch, useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import useCategory from '../../redux/hooks/useCategory';
import { getthunkcategory } from '../../redux/slices/categorySlice';
import { getslugproductApi } from '../../redux/slices/productSlice';
import useProduct from '../../redux/hooks/useProduct';
import useAuth from '../../redux/hooks/useauth';

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
const {products=[]}=useProduct()
  const cartItems = useSelector((state) => state.cart.items);
  const { categories = [] } = useCategory();
  const {user}=useAuth()


  const [hoverParent, setHoverParent] = useState(null);

  const parentCategory = categories.filter(cat => !cat.parentCategory);

  const getChildCategory = (parentId) =>
    categories.filter(cat => cat.parentCategory === parentId);

  useEffect(() => {
    dispatch(getslugproductApi());
  }, [dispatch]);
  useEffect(()=>{
    dispatch(getthunkcategory())
  },[dispatch])

  return (
    <section>
      <div className="bg-dark rounded shadow-md relative">
        <div className="flex justify-between p-4 items-center">
        

          <Link className="text-2xl font-semibold"  onClick={()=>navigate("/")}>SMV-ECOM</Link>
        

{user?.role==="customer"&&(
   <div className="flex items-center gap-6 w-full">
  {/* Search */}
  <div className="relative w-[30%]">
            <input
              type="text"
              placeholder="Search products..."
              className="w-full rounded-full px-5 pr-12 py-2"
              />
            <CiSearch className="absolute right-4 top-2 text-xl" />
          </div>

          {/* Parent + Child */}
          <div className="flex gap-6 relative">
            {parentCategory.map((parent) => (
              <div
                key={parent._id}
                className="relative cursor-pointer"
                onMouseEnter={() => setHoverParent(parent._id)}
                onMouseLeave={() => setHoverParent(null)}
              >
                <span className="font-medium">{parent.name}</span>

                {/* CHILD DROPDOWN */}
                {hoverParent === parent._id && (
                  <div className="absolute top-full left-0 bg-white text-black shadow-md rounded w-40 z-50">
                    {getChildCategory(parent._id).map(child => (
                      <div
                        key={child._id}
                        className="px-4 py-2 hover:bg-green-100"
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

{/* Cart */}
<div className="flex items-center">
            <CiShoppingCart className="text-2xl" />
            ({cartItems.length})
          </div>

</div>
)}
{user?.role === "seller" && (
          <div className="flex items-center gap-4 ml-6">
           <Link
              to="/seller"
              className="px-3 py-1 rounded bg-green-500 hover:bg-green-600 transition"
            >
 Seller
            </Link>
            <Link
              to="/productadd"
              className="px-3 py-1 rounded bg-green-500 hover:bg-green-600 transition"
            >
              Product Add
            </Link>
            <Link
              to="/addcategory"
              className="px-3 py-1 rounded bg-blue-500 hover:bg-blue-600 transition"
            >
              Add Category
            </Link>
            <Link
              to="/getorder"
              className="px-3 py-1 rounded bg-purple-500 hover:bg-purple-600 transition"
            >
              Orders
            </Link>
          </div>
        )}
</div>
</div>
    </section>
  );
};

export default Navbar;
