import { Link } from "react-router-dom";

const SignUp = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-r from-purple-500 to-pink-500 p-4">
      <div className="relative w-full max-w-md">
        {/* Background image */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('/api/placeholder/1200/800')" }}
        ></div>

        {/* Overlay */}
        <div className="absolute inset-0 bg-black opacity-50"></div>

        {/* Form container */}
        <div className="relative bg-gray-800 bg-opacity-80 p-6 sm:p-8 rounded-lg shadow-lg">
          <h2 className="text-2xl sm:text-3xl font-bold mb-6 text-center text-white">
            Create new account
          </h2>
          <form>
            <div className="mb-4">
              <input
                type="text"
                placeholder="Your Name"
                className="w-full px-3 py-2 bg-gray-700 text-white rounded text-sm sm:text-base"
                required
              />
            </div>
            <div className="mb-4">
              <input
                type="email"
                placeholder="Email Address"
                className="w-full px-3 py-2 bg-gray-700 text-white rounded text-sm sm:text-base"
                required
              />
            </div>
            <div className="mb-4">
              <input
                type="password"
                placeholder="Password"
                className="w-full px-3 py-2 bg-gray-700 text-white rounded text-sm sm:text-base"
                required
              />
            </div>
            <div className="mb-6">
              <input
                type="password"
                placeholder="Confirm Password"
                className="w-full px-3 py-2 bg-gray-700 text-white rounded text-sm sm:text-base"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-purple-600 text-white py-2 rounded hover:bg-purple-700 transition duration-300 text-sm sm:text-base"
            >
              Sign Up
            </button>
          </form>
          <p className="mt-4 text-center text-xs sm:text-sm text-gray-400">
            Already have an account?{" "}
            <Link to="/" className="text-purple-400 hover:underline">
              Sign in now
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
