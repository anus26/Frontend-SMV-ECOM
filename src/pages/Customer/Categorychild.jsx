import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import Breadcrumb from "../../components/BreadCrumb";
import useProduct from "../../redux/hooks/useProduct";
import useCategory from "../../redux/hooks/useCategory";
import { getslugproductApi } from "../../redux/slices/productSlice";
import { FaShoppingCart } from "react-icons/fa";

const Categorychild = () => {
  const { slug } = useParams(); // child slug
  const dispatch = useDispatch();
  const { products = [] } = useProduct();
  const { categories = [] } = useCategory();
  const [breadcrumb, setBreadcrumb] = useState([]);

  useEffect(() => {
    if (!slug || categories.length === 0) return;

    // Find the child category by slug
    const child = categories.find((c) => c.slug === slug);
    if (!child) return;

    // Find parent category
    const parent = child.parentCategory
      ? categories.find((c) => c._id === child.parentCategory)
      : null;

    // Set breadcrumb
    const crumbs = [];
    if (parent) crumbs.push({ name: parent.name, slug: parent.slug, type: "category" });
    crumbs.push({ name: child.name, slug: child.slug, type: "category" });
    setBreadcrumb(crumbs);

    // Fetch products for this category
    dispatch(getslugproductApi({ parentslug: parent?.slug || "", childslug: child.slug }));
  }, [slug, categories, dispatch]);

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
              <div className=" flex items-center justify-center h-48 overflow-hidden">
                {product.images&&product.images.length>0&&(
                  <div className="w-full h-full relative group">
                    <img
                      src={product.images[0]}
                      alt={product.title}
                      className="absolute w-full h-full object-cover transition-all duration-500 group-hover:opacity-0 group-hover:scale-105"
                    />
                   {product.images[1] && (
            <img
              src={product.images[1]}
              alt="product-hover"
              className="absolute w-full h-full object-cover opacity-0 transition-all duration-500 group-hover:opacity-100 group-hover:scale-105"
            />
          )}

                  </div>
                )}
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
