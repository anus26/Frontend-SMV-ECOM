import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { signupUser } from "../redux/slices/authSlice";
import useAuth from "../redux/hooks/useauth";

const Signup = () => {
  const dispatch=useDispatch()
  const navigate=useNavigate()
  const {user,loading,error}=useAuth()
       const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "customer",
  });
    const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

    const handleSubmit=(e)=>{
        e.preventDefault()
      dispatch(signupUser(formData))
  
    }
//     useEffect(() => {
//   if (user) {
//     navigate("/signin"); 
//   }
// }, [user, navigate]);
//  useEffect(() => {
//   if (user) {
//     if (user.role === "seller") {
//       navigate("/seller");
//     } else if (user.role === "customer") {
//       navigate("/");
//     }
//   }
// }, [user, navigate]);

    
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-color1 w-full max-w-md p-8 rounded-2xl shadow-lg">
        
        <h1 className="text-3xl font-bold text-center mb-2">
          Create Account 
        </h1>
        <p className="text-gray4 text-center mb-6">
          Join SMV-ECOM and start shopping
        </p>

        <form className="space-y-4" onSubmit={handleSubmit}>
          
          <div>
            <label className="block text-sm font-medium mb-1">
               Name
            </label>
            <input
              
              
               onChange={handleChange}
               value={formData.name}
               name="name"
              placeholder="John Doe"
              className="w-full px-4 py-2 border rounded-lg
              focus:outline-none focus:ring-2 focus:ring-greenDark"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Email
            </label>
            <input
              type="email"
              onChange={handleChange}
              value={formData.email}
              name="email"
              placeholder="example@email.com"
              className="w-full px-4 py-2 border rounded-lg
              focus:outline-none focus:ring-2 focus:ring-greenDark"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">
              Password
            </label>
            <input
              type="password"
              placeholder="********"
              onChange={handleChange}
              value={formData.password}
              name="password"
              className="w-full px-4 py-2 border rounded-lg
              focus:outline-none focus:ring-2 focus:ring-greenDark"
            />
          </div>

        {/* Role */}
<label className="block text-sm font-medium mb-1">Role</label>
<select
  name="role"
  value={formData.role}
  onChange={handleChange}
  className="w-full px-4 py-2 border rounded-lg"
>
  <option value="customer">customer</option>
  <option value="seller">seller</option>
  <option value="Admin">Admin</option>
</select>




          <div className="flex items-center gap-2 text-sm">
            <input type="checkbox" className="accent-greenDark" />
            <span>
              I agree to the{" "}
              <span className="text-greenDark cursor-pointer hover:underline">
                Terms & Conditions
              </span>
            </span>
          </div>

          <button
            type="submit"
            className="w-full py-2 bg-greenDark text-white rounded-lg
            font-semibold hover:bg-greenDark transition"
          
          >
            Sign Up
          </button>
        {loading ? "Creating..." : "Sign Up"}
        </form>
  {error && (
          <p className="text-red1 text-sm mt-3 text-center">{error}</p>
        )}
        <p className="text-center text-sm text-gray mt-6">
          Already have an account?
          <span className="text-greenDark cursor-pointer ml-1 hover:underline">
          <Link to="/signin">Sign in</Link>  
          </span>
        </p>
      </div>
    </div>
  );
};

export default Signup;
