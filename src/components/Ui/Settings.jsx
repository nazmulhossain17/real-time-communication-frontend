import { useState } from "react";
import { User, Mail, Link } from "lucide-react";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";

const Settings = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [photo, setphoto] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [errorMessage, setErrorMessage] = useState(""); // Added for error handling
  const { currentUser } = useSelector((state) => state.user);
  const id = currentUser?.data?.user?.id;

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Create an object to hold only the fields that have values
    const updateData = {};
    if (name) updateData.name = name;
    if (email) updateData.email = email;
    if (photo) updateData.photo = photo;

    try {
      const res = await fetch(
        `http://localhost:3000/api/v1/update-user/${id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updateData),
        }
      );

      if (!res.ok) {
        throw new Error(`HTTP error! Status: ${res.status}`);
      }

      const result = await res.json();
      if (result.success) {
        setSuccessMessage("Profile updated successfully!");
        setTimeout(() => setSuccessMessage(""), 3000);
      } else {
        throw new Error(result.message || "Failed to update profile");
      }
    } catch (error) {
      console.error("Fetch error:", error.message);
      setErrorMessage(error.message);
      toast.error("Failed to update profile");
    }
  };

  return (
    <div className="flex flex-col justify-center min-h-screen py-6 bg-gray-100 sm:py-12">
      <div className="relative w-full px-4 py-3 sm:max-w-2xl sm:mx-auto sm:px-0">
        <div className="absolute inset-0 transform -skew-y-6 shadow-lg bg-gradient-to-r from-blue-300 to-blue-600 sm:skew-y-0 sm:-rotate-6 sm:rounded-3xl"></div>
        <div className="relative px-6 py-12 bg-white shadow-lg sm:rounded-3xl sm:p-20">
          <div className="max-w-xl mx-auto">
            <div>
              <h1 className="mb-8 text-3xl font-semibold">
                Update Your Profile
              </h1>
            </div>
            <div className="divide-y divide-gray-200">
              <form
                onSubmit={handleSubmit}
                className="py-8 space-y-8 text-base leading-6 text-gray-700 sm:text-lg sm:leading-7"
              >
                <div className="relative">
                  <input
                    id="name"
                    name="name"
                    type="text"
                    className="w-full h-12 pt-2 text-xl text-gray-900 placeholder-transparent border-b-2 border-gray-300 peer focus:outline-none focus:border-blue-600"
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                  />
                  <label
                    htmlFor="name"
                    className="absolute left-0 text-sm text-gray-600 transition-all -top-4 peer-placeholder-shown:text-xl peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-3 peer-focus:-top-4 peer-focus:text-gray-600 peer-focus:text-sm"
                  >
                    Name
                  </label>
                  <User className="absolute right-0 text-gray-400 w-7 h-7 top-3" />
                </div>
                <div className="relative">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    className="w-full h-12 pt-2 text-xl text-gray-900 placeholder-transparent border-b-2 border-gray-300 peer focus:outline-none focus:border-blue-600"
                    placeholder="Email address"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  <label
                    htmlFor="email"
                    className="absolute left-0 text-sm text-gray-600 transition-all -top-4 peer-placeholder-shown:text-xl peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-3 peer-focus:-top-4 peer-focus:text-gray-600 peer-focus:text-sm"
                  >
                    Email Address
                  </label>
                  <Mail className="absolute right-0 text-gray-400 w-7 h-7 top-3" />
                </div>
                <div className="relative">
                  <input
                    id="photo"
                    name="photo"
                    type="url"
                    className="w-full h-12 pt-2 text-xl text-gray-900 placeholder-transparent border-b-2 border-gray-300 peer focus:outline-none focus:border-blue-600"
                    placeholder="Profile Picture URL"
                    value={photo}
                    onChange={(e) => setphoto(e.target.value)}
                  />
                  <label
                    htmlFor="photo"
                    className="absolute left-0 text-sm text-gray-600 transition-all -top-4 peer-placeholder-shown:text-xl peer-placeholder-shown:text-gray-440 peer-placeholder-shown:top-3 peer-focus:-top-4 peer-focus:text-gray-600 peer-focus:text-sm"
                  >
                    Profile Picture URL
                  </label>
                  <Link className="absolute right-0 text-gray-400 w-7 h-7 top-3" />
                </div>
                <div className="relative pt-4">
                  <button className="px-6 py-3 text-lg text-white transition-colors duration-300 bg-blue-500 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50">
                    Update Profile
                  </button>
                </div>
              </form>
            </div>
            {successMessage && (
              <div className="p-4 mt-6 text-lg text-green-700 bg-green-100 rounded-md">
                {successMessage}
              </div>
            )}
            {errorMessage && (
              <div className="p-4 mt-6 text-lg text-red-700 bg-red-100 rounded-md">
                {errorMessage}
              </div>
            )}
            {photo && (
              <div className="mt-8">
                <h2 className="mb-4 text-xl font-semibold">
                  Profile Picture Preview:
                </h2>
                <img
                  src={photo}
                  alt="Profile Preview"
                  className="object-cover w-40 h-40 border-4 border-blue-500 rounded-full"
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
