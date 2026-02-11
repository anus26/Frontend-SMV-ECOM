import React, { useEffect, useState } from 'react'
import { CiSearch, CiShoppingCart } from "react-icons/ci";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import useCategory from '../../redux/hooks/useCategory';
import { getthunkcategory } from '../../redux/slices/categorySlice';
import { getslugproductApi } from '../../redux/slices/productSlice';
import useProduct from '../../redux/hooks/useProduct';
import Cartpage from '../../pages/Customer/Cartpage';

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
const {products=[]}=useProduct()
  const cartItems = useSelector((state) => state.cart.items);
  const { categories = [] } = useCategory();

  const [hoverParent, setHoverParent] = useState(null);

  const parentCategory = categories.filter(cat => !cat.parentCategory);

  const getChildCategory = (parentId) =>
    categories.filter(cat => cat.parentCategory === parentId);

 
  useEffect(()=>{
    dispatch(getthunkcategory())
  },[dispatch])

  return (
    <section>
      <div className="bg-dark rounded shadow-md relative">
        <div className="flex justify-between p-4 items-center">

          <h1 className="text-2xl font-semibold">SMV-ECOM</h1>

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
          <div className="flex items-center" onClick={()=>navigate("/cartpage")}>
            <CiShoppingCart className="text-2xl" />
         ({cartItems.length})  
          </div>

        </div>
      </div>
    </section>
  );
};

export default Navbar;
