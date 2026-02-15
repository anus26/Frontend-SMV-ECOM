import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { getStatsThunk } from "../../redux/slices/adminSlice";
import useAdmin from "../../redux/hooks/useAdmin";

const Stats = () => {
  const dispatch = useDispatch();
  const { stats, loading, error } = useAdmin();

  useEffect(() => {
    dispatch(getStatsThunk());
  }, [dispatch]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold">
        Total Users: {stats?.totalUsers ?? 0}
      </h1>
      <h1 className="text-xl font-bold">
        Total Orders: {stats?.totalOrders ?? 0}
      </h1>
    </div>
  );
};

export default Stats;
