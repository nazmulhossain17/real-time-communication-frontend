import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import {
  signInFailure,
  signInStart,
  signInSuccess,
  userAdded,
} from "../../redux/userSlice/userSlice";
import { toast } from "react-toastify";
import { setAuthToken } from "../../redux/authSlice/authSlice";

const SignIn = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(signInStart());
      const res = await fetch("http://localhost:3000/api/v1/login-user", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
        credentials: "include",
      });

      if (!res.ok) {
        throw new Error(`HTTP error! Status: ${res.status}`);
      }

      const data = await res.json();
      console.log(data);

      if (data.success === false) {
        dispatch(signInFailure(data.message));
        return;
      }
      dispatch(setAuthToken(data.token));
      dispatch(signInSuccess(data));
      dispatch(userAdded(data));
      toast.success("Login successful");
      navigate("/dashboard");
    } catch (error) {
      toast.error("Login failed");

      console.error("Fetch error:", error.message);
      dispatch(signInFailure(error.message));
    }
  };
  return (
    <div className="flex items-center justify-center min-h-screen p-4 bg-gradient-to-r from-purple-500 to-pink-500">
      <div className="relative w-full max-w-md">
        {/* Background image */}
        <div
          className="absolute inset-0 bg-center bg-cover"
          style={{ backgroundImage: "url('/api/placeholder/1200/800')" }}
        ></div>

        {/* Overlay */}
        <div className="absolute inset-0 bg-black opacity-50"></div>

        {/* Form container */}
        <div className="relative p-6 bg-gray-800 rounded-lg shadow-lg bg-opacity-80 sm:p-8">
          <h2 className="mb-6 text-2xl font-bold text-center text-white sm:text-3xl">
            Sign In
          </h2>
          <form onSubmit={handleSubmit}>
            <div className="mb-4">
              <input
                type="email"
                placeholder="Email Address"
                className="w-full px-3 py-2 text-sm text-white bg-gray-700 rounded sm:text-base"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <input
                type="password"
                placeholder="Password"
                className="w-full px-3 py-2 text-sm text-white bg-gray-700 rounded sm:text-base"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            <button
              type="submit"
              className="w-full py-2 text-sm text-white transition duration-300 bg-purple-600 rounded hover:bg-purple-700 sm:text-base"
            >
              Sign In
            </button>
          </form>
          <p className="mt-4 text-xs text-center text-gray-400 sm:text-sm">
            Don&apos;t have an account?{" "}
            <Link to="/sign-up" className="text-purple-400 hover:underline">
              Sign up now
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
