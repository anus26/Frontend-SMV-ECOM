import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import Breadcrumb from "../../components/BreadCrumb";
import useProduct from "../../redux/hooks/useProduct";
import { getslugproductApi } from "../../redux/slices/productSlice";
import { FaShoppingCart } from "react-icons/fa";

const Categorychild = () => {
  const { slug } = useParams();
  const dispatch = useDispatch();
  const [breadcrumb, setBreadCrumb] = useState([]);
  const { products = [] } = useProduct();

useEffect(() => {
  if (slug) {
    dispatch(getslugproductApi({ parentslug: "aMobile", childslug: slug }));
    setBreadCrumb([{ name: slug.replace("-", " "), slug }]);
  }
}, [dispatch, slug]);


  return (
    <section className="max-w-7xl mx-auto px-4 py-6">

      {/* Breadcrumb */}
      <div className="mb-6">
        <Breadcrumb items={breadcrumb} />
      </div>

      {/* If No Products */}
      {products.length === 0 ? (
        <div className="text-center text-gray-500 text-lg py-20">
          No products found in this category
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6">

          {products.map((product) => (
            <Link
              to={`/product/${product._id}`}
              key={product._id}
              className="bg-white shadow-md rounded-xl p-4 hover:shadow-xl transition duration-300 flex flex-col"
            >
              <div className="h-40 flex items-center justify-center">
                <img
                  src={product.image}
                  alt={product.title}
                  className="h-full object-cover rounded-md"
                />
              </div>

              <h2 className="mt-3 font-semibold text-sm line-clamp-2">
                {product.title}
              </h2>

              <p className="text-green-600 font-bold mt-1">
                {product.price} Rs
              </p>

              <div className="mt-auto pt-3 flex justify-end">
                <FaShoppingCart className="text-gray-500 hover:text-green-600 text-lg" />
              </div>
            </Link>
          ))}

        </div>
      )}
    </section>
  );
};

export default Categorychild;
