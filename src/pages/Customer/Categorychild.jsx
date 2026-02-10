import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import useCategory from '../../redux/hooks/useCategory'
import { childCategory } from '../../redux/slices/categorySlice'
import { useParams } from 'react-router'

const Categorychild = () => {
    const {slug}=useParams
    const dispatch=useDispatch()
    const {categories}=useCategory()
    useEffect(()=>{
        dispatch(childCategory(slug))
    },[dispatch])
  return (
  <>
  <section>
{categories.map((cat)=>(
     <div key={cat._id}>
        {cat.title}
        <img src={cat.image} alt="" />

     
    </div>
))}
  </section>
  </>
  )
}

export default Categorychild