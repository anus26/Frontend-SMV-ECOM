import React, { useEffect } from 'react'
import Navbar from '../Navbar/Navbar'
import { Outlet } from 'react-router-dom'
import { useDispatch } from 'react-redux';
import { getUser } from '../../redux/slices/authSlice';

const Layouts = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getUser());
  }, [dispatch]);
  return (
<>
<div className='bg-white h-full'>
<Navbar/>
<div className=''>

<Outlet />
</div>
</div>
</>
  )
}

export default Layouts