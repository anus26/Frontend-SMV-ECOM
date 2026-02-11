import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import useCategory from '../../redux/hooks/useCategory'
import { childCategory } from '../../redux/slices/categorySlice'
import { useParams } from 'react-router'
import Breadcrumb from '../../components/BreadCrumb'
import { Link } from 'react-router-dom'
import useProduct from '../../redux/hooks/useProduct'
import { getslugproductApi } from '../../redux/slices/productSlice'

const Categorychild = () => {
    const {slug}=useParams()
    const dispatch=useDispatch()
    const [breadcrumb,setBreadCrumb]=useState([])
      const { products = [] } = useProduct();

    const {categories}=useCategory()


    useEffect(() => {
    if (slug) {
      dispatch(getslugproductApi(slug));

      // simple breadcrumb (slug based)
      setBreadCrumb([
        { name: slug.replace("-", " "), slug },
      ]);
    }
  }, [dispatch, slug]);
    
  return (
  <>
  <section>
    <Breadcrumb items={breadcrumb} />
{products.map((cat)=>(
        <Link to={`/product/${cat._id}`} key={cat._id}>

        {cat.title}
        <img src={cat.image} alt="" />

     
  
</Link>
))}
  </section>
  </>
  )
}

export default Categorychild