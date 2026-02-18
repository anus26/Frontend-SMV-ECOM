import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import useRevenue from "../../redux/hooks/useRevenue";
import { revenuemonthlyThunk } from "../../redux/slices/revenueSlice";
import { Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend
} from "chart.js";

ChartJS.register(ArcElement, Tooltip, Legend);

const MonthlyRevenueChart = () => {
  const dispatch = useDispatch();
  const { monthly, loading } = useRevenue();

  useEffect(() => {
    dispatch(revenuemonthlyThunk());
  }, [dispatch]);

  const data = {
    labels: monthly?.map((item) => item._id),
    datasets: [
      {
        label: "Monthly Revenue",
        data: monthly?.map((item) => item.totalRevenue),
   backgroundColor: monthly?.map((_, index) => {
        const colors = [
          "#ef4444",  // Jan - red
          "#3b82f6",  // Feb - blue
          "#22c55e",  // Mar - green
          "#f59e0b",  // Apr - yellow
          "#8b5cf6",  // May - purple
          "#ec4899",  // Jun - pink
          "#14b8a6",  // Jul - teal
          "#f97316",  // Aug - orange
          "#0ea5e9",  // Sep - sky
          "#84cc16",  // Oct - lime
          "#6366f1",  // Nov - indigo
          "#d946ef"   // Dec - fuchsia
        ];
           return colors[index % colors.length];
   
    })

      }
    ]
  };

  return (
    <section className="flex justify-center mt-10">

      <div className="bg-white p-6 rounded-2xl shadow-lg lg:w-[400px] sm:w-[300px]">
        <h2 className="text-xl font-bold mb-4">Monthly Revenue</h2>
        {loading ? <p>Loading...</p> : <Pie data={data} />}
      </div>
    </section>
  );
};

export default MonthlyRevenueChart;
