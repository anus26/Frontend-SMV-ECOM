import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { signupUser } from "../redux/slices/authSlice";
import useAuth from "../redux/hooks/useAuth";
import { ColorRing } from "react-loader-spinner";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";

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
  const [show,setShow]=useState(false)
    const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    loading(true)
    setTimeout(()=>{
      loading(false)
    },2000)
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
 useEffect(() => {
  if (user) {
    if (user.role === "seller") {
      navigate("/seller");
    } else if (user.role === "customer") {
      navigate("/");
    }else if (user.role==="Admin"){
      navigate("/")
    }
  }
}, [user, navigate]);

    
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-color1 w-full max-w-md p-8 rounded-2xl shadow-lg">
        
        <h1 className="text-3xl font-bold text-center mb-2">
          Create Account 
        </h1>
        <p className="text-gray4 text-center mb-6 flex justify-center items-center">
          Join  <img src="./image/door.png" alt="img"  className="w-[10%] "/>   <span className="font-semibold  text-green">SMV-ECOM</span> and start shopping
        </p>

        <form className="space-y-4" onSubmit={handleSubmit}>
          
          <div>
            <label className="block text-sm font-medium mb-1 ">
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
            <label className="block text-sm font-medium mb-1 ">
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

          <div className="relative">
            <label className="block text-sm font-medium mb-1">
              Password
            </label>
            <input
              type={show?"text":"password"}
              placeholder="********"
              onChange={handleChange}
              value={formData.password}
              name="password"
              className="w-full px-4 py-2 border rounded-lg
              focus:outline-none focus:ring-2 focus:ring-greenDark"
            />
            <span onClick={()=>setShow(!show)} className="absolute right-3 top-9">
              {show?(
                <>
                          
                              <FaRegEye />
                              </>
                            ):(
                <FaRegEyeSlash />
              
              )}
            </span>
          </div>

        {/* Role */}
<label className="block text-sm font-medium mb-1">Role</label>
<select
  name="role"
  value={formData.role}
  onChange={handleChange}
  className="w-full px-4 py-2 border rounded-lg focus:oultine-none focus:ring-2 focus:ring-greenDark"
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
            className="w-full py-2 bg-greenDark flex justify-center text-white rounded-lg
            font-semibold hover:bg-greenDark transition"
          
          >
             {loading?(
    <>
    <ColorRing
visible={true}
height="30"
width="30"

ariaLabel="color-ring-loading"
wrapperStyle={{}}
wrapperClass="color-ring-wrapper"
colors={['#e15b64', '#f47e60', '#f8b26a', '#abbd81', '#849b87']}
/>
    </>
    ):(
      "Sign Up"
    

   )}
          </button>
        </form>
  {error && (
          <p className="text-red1 text-sm mt-3 text-center">{error}</p>
        )}
        <p className="text-center text-sm text-black mt-6">
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
