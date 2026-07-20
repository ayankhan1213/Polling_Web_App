import { message } from "antd";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
const Login = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e: any) => {
    e.preventDefault();

    if (!email && !password) {
      message.error("All fields are required");
    } else if (!email) {
      message.error("Email is required");
    } else if (!password) {
      message.error("Password is required");
    } else {
      const auth = getAuth();
      signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          const user = userCredential.user;
          message.success("Login Sucessfull");
          navigate("/");
        })
        .catch((error) => {
          message.error(
            error.message.replace(
              "Firebase: Error (auth/invalid-credential).",
              "Invalid Email and Password",
            ),
          );
        });
    }
  };

  return (
    <div className="relative flex h-screen items-center justify-center overflow-hidden bg-[#FEF9EF] px-4 py-4 sm:px-6">
      {/* decorative floating blobs */}
      <div className="pointer-events-none absolute -left-12 -top-12 h-40 w-40 animate-pulse rounded-full bg-[#FFC857]/30" />
      <div className="pointer-events-none absolute -bottom-14 -right-12 h-48 w-48 animate-pulse rounded-full bg-[#FF6F59]/25" />
      <div className="pointer-events-none absolute right-[8%] top-[14%] h-14 w-14 animate-pulse rounded-full bg-[#3FA35E]/20" />

      <div className="relative z-10 w-full max-w-md animate-[fadeIn_0.5s_ease] space-y-4 overflow-y-auto rounded-[24px] border-2 border-[#3FA35E]/20 bg-white p-6 shadow-[0_24px_60px_-10px_rgba(31,109,59,0.25)] max-h-full">
        {/* sprout mascot */}
        <div className="flex justify-center">
          <div className="flex h-12 w-12 animate-[sway_3.5s_ease-in-out_infinite] items-center justify-center rounded-full bg-gradient-to-br from-[#3FA35E] to-[#1F6D3B] [transform-origin:bottom_center]">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
              <path
                d="M12 22V13"
                stroke="#fff"
                strokeWidth="2"
                strokeLinecap="round"
              />
              <path
                d="M12 13C12 13 4 13 4 5C11 5 12 13 12 13Z"
                fill="#FFC857"
              />
              <path
                d="M12 13C12 13 20 13 20 5C13 5 12 13 12 13Z"
                fill="#fff"
                fillOpacity="0.85"
              />
            </svg>
          </div>
        </div>

        {/* Header */}
        <div className="text-center">
          <h2 className="text-xl font-extrabold tracking-tight text-[#1F6D3B]">
            Welcome back
          </h2>
          <p className="mt-1 text-xs text-[#7a8a76]">
            Log in to keep things growing.
          </p>
        </div>

        {/* Form */}
        <form className="space-y-3" onSubmit={handleSubmit}>
          <div className="space-y-3">
            {/* Email Field */}
            <div>
              <label
                htmlFor="email"
                className="mb-1.5 block text-sm font-bold text-[#233821]"
              >
                Email address
              </label>
              <input
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                id="email"
                name="email"
                type="email"
                className="block w-full rounded-2xl border-2 border-[#e4e7de] bg-[#fbfbf7] px-3 py-2 text-sm text-[#233821] placeholder-gray-400 transition-all focus:border-[#3FA35E] focus:outline-none focus:ring-4 focus:ring-[#3FA35E]/20"
                placeholder="abc@example.com"
              />
            </div>

            {/* Password Field */}
            <div>
              <label
                htmlFor="password"
                className="mb-1.5 block text-sm font-bold text-[#233821]"
              >
                Password
              </label>
              <div className="relative">
                <input
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  id="password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  className="block w-full rounded-2xl border-2 border-[#e4e7de] bg-[#fbfbf7] py-2 pl-3 pr-10 text-sm text-[#233821] placeholder-gray-400 transition-all focus:border-[#3FA35E] focus:outline-none focus:ring-4 focus:ring-[#3FA35E]/20"
                  placeholder="Enter your password"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-1 flex items-center justify-center rounded-lg px-2 text-[#1F6D3B] hover:bg-[#1F6D3B]/10"
                >
                  {!showPassword ? (
                    <svg
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l18 18"
                      />
                    </svg>
                  ) : (
                    <svg
                      className="h-5 w-5"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                      />
                    </svg>
                  )}
                </button>
              </div>
            </div>
          </div>

          <p className="text-xs text-[#7a8a76]">
            Don't have an account?{" "}
            <Link
              className="font-bold text-[#1F6D3B] hover:underline"
              to="/signup"
            >
              Sign up
            </Link>
          </p>

          <button
            type="submit"
            className="group relative flex w-full items-center justify-center rounded-2xl border-none bg-gradient-to-br from-[#3FA35E] to-[#1F6D3B] px-4 py-2.5 text-sm font-extrabold text-white shadow-[0_8px_18px_-4px_rgba(31,109,59,0.4)] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_10px_22px_-2px_rgba(31,109,59,0.45)] active:translate-y-0 active:scale-[0.98] focus:outline-none focus:ring-2 focus:ring-[#3FA35E] focus:ring-offset-2"
          >
            Log in
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
