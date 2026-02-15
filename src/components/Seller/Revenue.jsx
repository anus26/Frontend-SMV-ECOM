import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import useRevenue from "../../redux/hooks/useRevenue";
import { revenuedailyThunk, revenuetotalThunk } from "../../redux/slices/revenueSlice";

const Revenue = () => {
  const dispatch = useDispatch();
  const { loading, error, total} = useRevenue();

  useEffect(() => {
    dispatch(revenuetotalThunk());
    dispatch(revenuedailyThunk())
  }, [dispatch]);

  return (
    <section className="flex justify-center mt-10">
      <div className="bg-white shadow-xl rounded-2xl p-8 w-[350px] text-center">
        <h2 className="text-2xl font-bold mb-6">Total Revenue</h2>

        {loading && <p>Loading...</p>}
        {error && <p className="text-red-500">{error}</p>}

        <div className="text-3xl font-bold text-green-600">
           {total?.totalRevenue || 0}
        </div>
      </div>
    
   
   
    </section>
  );
};


export default Revenue;
