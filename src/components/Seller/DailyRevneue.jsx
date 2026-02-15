import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend
} from "chart.js";
import useRevenue from "../../redux/hooks/useRevenue";
import { revenuedailyThunk } from "../../redux/slices/revenueSlice";

ChartJS.register(
  LineElement,
  CategoryScale,
  LinearScale,
  PointElement,
  Tooltip,
  Legend
);

const DailyRevenue = () => {
  const dispatch = useDispatch();
  const { daily, loading } = useRevenue();

  useEffect(() => {
    dispatch(revenuedailyThunk());
  }, [dispatch]);

  const data = {
    labels: daily?.map((item) => item._id),
    datasets: [
      {
        label: "Daily Revenue",
        data: daily?.map((item) => item.totalRevenue),
        borderColor: "green",
        backgroundColor: "rgba(0,128,0,0.2)",
        tension: 0.4
      }
    ]
  };

  return (
    <div className="bg-white p-6 rounded-2xl shadow-lg w-[600px]">
      <h2 className="text-xl font-bold mb-4">Daily Revenue</h2>
      {loading ? <p>Loading...</p> : <Line data={data} />}
    </div>
  );
};

export default DailyRevenue;
