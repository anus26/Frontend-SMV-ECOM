import React from "react";

const Signin = () => {
  return (
    <div className="min-h-screen flex items-center justify-center ">
      <div className="bg-white w-full max-w-md p-8 rounded-2xl shadow-lg">
        
        <h1 className="text-3xl font-bold text-center mb-2">Welcome Back 👋</h1>
        <p className="text-gray4 text-center mb-6">
          Sign in to continue to SMV-ECOM
        </p>

        <form className="space-y-4">
          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              placeholder="example@email.com"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-greenDark"
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Password</label>
            <input
              type="password"
              placeholder="********"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-greenDark"
            />
          </div>

          <div className="flex justify-between items-center text-sm">
            <label className="flex items-center gap-2">
              <input type="checkbox" className="accent-greenDark" />
              Remember me
            </label>
            <span className="text-greenDark cursor-pointer hover:underline">
              Forgot password?
            </span>
          </div>

          <button
            type="submit"
            className="w-full py-2 bg-greenDark text-white rounded-lg font-semibold hover:bg-greenDark transition"
          >
            Sign In
          </button>
        </form>

        <p className="text-center text-sm text-gray mt-6">
          Don’t have an account?
          <span className="text-greenDark cursor-pointer ml-1 hover:underline">
            Sign up
          </span>
        </p>
      </div>
    </div>
  );
};

export default Signin;
