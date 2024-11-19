import React from 'react';

const Login = () => {
  return (
    <section className="min-h-screen flex items-center justify-center bg-[#F7F7F9] px-6">
      <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-2xl font-bold text-[#1A3B5D] text-center mb-6">
          Login to MyHome2U
        </h2>
        <form className="space-y-4">
          <div>
            <label className="block text-gray-700 font-semibold mb-2" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              id="email"
              className="w-full px-4 py-2 border border-gray-300 rounded-md text-gray-700 focus:outline-none focus:border-[#4C8492]"
              placeholder="Enter your email"
            />
          </div>
          <div>
            <label className="block text-gray-700 font-semibold mb-2" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              id="password"
              className="w-full px-4 py-2 border border-gray-300 rounded-md text-gray-700 focus:outline-none focus:border-[#4C8492]"
              placeholder="Enter your password"
            />
          </div>
          <div className="text-right">
            <a href="/forgetpassword" className="text-sm text-[#4C8492] hover:text-[#F47C48]">
              Forget Password?
            </a>
          </div>
          <button
            type="submit"
            className="w-full py-2 mt-4 bg-[#F47C48] text-white font-semibold rounded-md hover:bg-[#e86d3f] transition duration-200"
          >
            Login
          </button>
          <p className="text-sm text-center text-gray-600 mt-4">
            Don't have an account?{' '}
            <a href="/register" className="text-[#4C8492] font-medium hover:text-[#F47C48]">
              Register here
            </a>
          </p>
        </form>
      </div>
    </section>
  );
};

export default Login;
