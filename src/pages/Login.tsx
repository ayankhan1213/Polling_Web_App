import { useState } from "react";
import { Link } from "react-router-dom";

const Login = () => {
  const [showPassword, setShowPassword] = useState(true);

  const handleSubmit = (e: any) => {
    e.preventDefault();
  };

  return (
    <div className="flex h-[100vh] items-center justify-center px-4 py-12 sm:px-6 lg:px-8 bg-gray-50">
      <div className="w-full max-w-md space-y-8 rounded-xl p-8 shadow-2xl border-[#319A47] border-3">
        {/* Header */}
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tight text-[#319A47]">
            Login
          </h2>
          <p className="mt-2 text-sm text-gray-400">
            Please fill in your details to log in.
          </p>
        </div>

        {/* Form */}
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div className="space-y-4">
            {/* Email Field */}
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-black mb-1">
                Email Address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                className="block w-full rounded-md border border-gray-400 px-3 py-2 text-black placeholder-gray-500 focus:border-[#319A47] focus:outline-none focus:ring-1 focus:ring-[#319A47] sm:text-sm"
                placeholder="abc@example.com"
              />
            </div>

            {/* Password Field */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-black mb-1">
                Password
              </label>
              <div className="relative">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  required
                  className="block w-full rounded-md border border-gray-400 pl-3 pr-10 py-2 text-black placeholder-gray-500 focus:border-[#319A47] focus:outline-none focus:ring-1 focus:ring-[#319A47] sm:text-sm"
                  placeholder="Enter your Password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-200"
                >
                  {!showPassword ? (
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l18 18" />
                    </svg>
                  ) : (
                    <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  )}
                </button>
              </div>
            </div>
          </div>

          <p className="text-sm text-gray-400">
            Don't have an account?{" "}
            <Link className="text-[#319A47] hover:underline font-medium" to="/signup">
              Signup
            </Link>
          </p>

          <div>
            <button
              type="submit"
              className="group relative flex w-full justify-center rounded-md border-2 border-[#319A47] bg-white px-4 py-2 text-sm font-semibold text-[#319A47] transition-all duration-200 hover:bg-[#319A47] hover:text-white focus:outline-none focus:ring-2 focus:ring-[#319A47] focus:ring-offset-2 focus:ring-offset-[#1e1e20]"
            >
              Login
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;