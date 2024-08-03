import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  signOutUserFailure,
  signOutUserStart,
  signOutUserSuccess,
} from "../../redux/userSlice/userSlice";
import {
  Bell,
  ChevronDownSquareIcon,
  CirclePlus,
  Menu,
  Search,
  Settings,
  X,
} from "lucide-react";
import Dropdown from "./Dropdown";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { currentUser } = useSelector((state) => state.user);

  const handleLogOut = async () => {
    try {
      dispatch(signOutUserStart());
      const res = await fetch("http://localhost:3000/api/v1/log-out", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token: "token" }), // Include token if needed
      });
      if (!res.ok) {
        throw new Error(`HTTP error! Status: ${res.status}`);
      }
      toast.success("Log out successful");
      dispatch(signOutUserSuccess());
      navigate("/");
    } catch (error) {
      console.error("Fetch error:", error.message);
      dispatch(signOutUserFailure(error.message));
    }
  };

  const handleIncreasePoints = async () => {
    const userId = currentUser.data.user.id;
    try {
      const res = await fetch("http://localhost:3000/api/v1/increase-point", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId, points: 1 }), // Increment by 1 point
      });

      if (!res.ok) {
        throw new Error(`HTTP error! Status: ${res.status}`);
      }

      toast.success("Points increased successfully");
      window.location.reload(); // Refresh page to show updated points
    } catch (error) {
      console.error("Fetch error:", error.message);
      toast.error("Failed to increase points");
    }
  };

  return (
    <header className="relative p-4 text-white bg-gray-800">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Menu
            className="cursor-pointer lg:hidden"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          />
          <h1 className="text-2xl font-bold">convove</h1>
        </div>
        <div className="flex-1 hidden max-w-xl mx-4 lg:flex">
          <div className="relative w-full">
            <input
              type="text"
              placeholder="Search by category or celebrity name..."
              className="w-full px-4 py-2 pl-10 text-white bg-gray-700 rounded-full"
            />
            <Search className="absolute left-3 top-2.5 text-gray-400" />
          </div>
        </div>
        <div className="items-center hidden space-x-4 lg:flex">
          <CirclePlus
            className="cursor-pointer"
            onClick={handleIncreasePoints}
          />
          <span>{currentUser.data.user.name}</span>
          <div className="relative flex items-center space-x-2">
            <ChevronDownSquareIcon
              className="cursor-pointer"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            />
            <Dropdown
              isOpen={isDropdownOpen}
              setIsOpen={setIsDropdownOpen}
              handleLogOut={handleLogOut}
            />
          </div>
        </div>
        <div className="flex items-center space-x-4 lg:hidden">
          <Search className="cursor-pointer" />
          <Bell className="cursor-pointer" />
        </div>
      </div>

      {/* Mobile menu dropdown */}
      {isMenuOpen && (
        <div className="absolute left-0 right-0 z-50 bg-gray-800 shadow-md lg:hidden top-16">
          <div className="p-4">
            <div className="flex items-center justify-between mb-4">
              <h1 className="text-2xl font-bold">convove</h1>
              <X
                className="cursor-pointer"
                onClick={() => setIsMenuOpen(false)}
              />
            </div>
            <div className="relative mb-4">
              <input
                type="text"
                placeholder="Search by category or celebrity name..."
                className="w-full px-4 py-2 pl-10 text-white bg-gray-700 rounded-full"
              />
              <Search className="absolute left-3 top-2.5 text-gray-400" />
            </div>
            <div className="flex flex-col space-y-4">
              <div className="flex items-center space-x-2">
                <Settings className="cursor-pointer" />
                <Link to="/dashboard/settings">
                  <span>Settings</span>
                </Link>
              </div>
              <div className="flex items-center space-x-2">
                <span>{currentUser.data.user.name}</span>
                <ChevronDownSquareIcon
                  className="cursor-pointer"
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                />
                <Dropdown
                  isOpen={isDropdownOpen}
                  setIsOpen={setIsDropdownOpen}
                  handleLogOut={handleLogOut}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;
