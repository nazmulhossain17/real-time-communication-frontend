import {
  Home,
  Settings,
  CircleDollarSign,
  // MessageCircleMoreIcon,
} from "lucide-react";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const TopNavigationBar = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const id = currentUser?.data?.user?.id;

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`http://localhost:3000/api/v1/get-all/${id}`);
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        const result = await res.json();
        setData(result.data);
        console.log(result.data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchData();
    }
  }, [id]); // Dependency array includes `id`

  return (
    <nav className="flex items-center justify-between p-2 text-white bg-gray-900">
      <div className="flex items-center space-x-4">
        {/* <Menu className="w-6 h-6 cursor-pointer" />
        <span className="font-semibold">Menu</span> */}
      </div>

      <div className="flex items-center m-4 space-x-12">
        <Link to="/dashboard">
          <Home className="w-6 h-6 cursor-pointer" />
        </Link>
        {/* <Link to="/dashboard/chat">
          <MessageCircleMoreIcon className="w-6 h-6 cursor-pointer" />
        </Link> */}
        <Link to="/dashboard/settings">
          <Settings className="w-6 h-6 cursor-pointer" />
        </Link>
      </div>

      <div className="flex items-center space-x-2">
        <CircleDollarSign className="w-5 h-5 text-yellow-400" />
        <span className="text-sm">Total Point :</span>
        <span className="font-semibold">
          {loading ? "Loading..." : error ? `Error: ${error}` : data?.points}
        </span>
      </div>
    </nav>
  );
};

export default TopNavigationBar;
