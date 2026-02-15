import axios from "axios";

export const getUsers = async () => {
  const res = await axios.get("/api/admin/users");
  return res.data;
};

export const approve = async (id) => {
  const res = await axios.put(`/api/admin/approve/${id}`);
  return res.data;
};

export const blockUser = async (id) => {
  const res = await axios.put(`/api/admin/block/${id}`);
  return res.data;
};

export const getStats = async () => {
  const res = await axios.get("/api/admin/stats");
  return res.data;
};
