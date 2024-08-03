import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

export const Profile = () => {
  const { id } = useParams();
  const navigate = useNavigate(); // Add useNavigate hook
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [points, setPoints] = useState(null); // State for points

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch(`http://localhost:3000/api/v1/get-all/${id}`);
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        const result = await res.json();
        setData(result.data);
        setPoints(result.data.points); // Set points from the fetched data
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [id]);

  const handleDecreasePoints = async (pointsToDeduct) => {
    try {
      const res = await fetch("http://localhost:3000/api/v1/decrease-point", {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ userId: id, points: pointsToDeduct }),
      });

      if (!res.ok) {
        throw new Error(`HTTP error! Status: ${res.status}`);
      }

      const result = await res.json();
      if (result && result.user && typeof result.user.points === "number") {
        setPoints(result.user.points); // Update points in state
        toast.success(`Points decreased by ${pointsToDeduct}`);
      } else {
        throw new Error("Unexpected response structure");
      }
    } catch (error) {
      console.error("Fetch error:", error.message);
      toast.error("Failed to decrease points");
    }
  };

  const handleMessageClick = async () => {
    try {
      if (points >= 1) {
        await handleDecreasePoints(1); // Decrease points by 1
        navigate(`/chat/${id}`); // Navigate to chat page with user ID
      } else {
        toast.error("Not enough points to send a message");
      }
    } catch (error) {
      toast.error("Failed to process message");
    }
  };

  const handleAudioCallClick = async () => {
    try {
      if (points >= 3) {
        await handleDecreasePoints(3); // Decrease points by 3
      } else {
        toast.error("Not enough points for an audio call");
      }
    } catch (error) {
      toast.error("Failed to process audio call");
    }
  };

  const handleVideoCallClick = async () => {
    try {
      if (points >= 5) {
        await handleDecreasePoints(5); // Decrease points by 5
      } else {
        toast.error("Not enough points for a video call");
      }
    } catch (error) {
      toast.error("Failed to process video call");
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <div className="w-full p-6 text-black">
      <div className="flex flex-col items-start justify-between mb-6 space-y-4 md:flex-row md:space-y-0">
        <div className="flex items-center">
          <img
            src={data.photo}
            alt={data.name}
            className="w-16 h-16 mr-4 rounded-full"
          />
          <div>
            <h2 className="text-xl font-bold">{data.name}</h2>
            <p className="text-black">Makeup Artist - Alfie Makeover</p>
            <div className="flex items-center mt-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <svg
                  key={star}
                  className="w-4 h-4 text-yellow-500 fill-current"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
              <span className="ml-1 text-gray-400">4.5/5</span>
            </div>
          </div>
        </div>
        <div className="w-full space-y-2 md:w-auto">
          <button
            className="flex items-center justify-between w-full px-4 py-2 text-white bg-purple-600 rounded-md"
            onClick={handleMessageClick} // Decrease points and navigate to chat
          >
            <span>Message For</span>
            <span>01</span>
          </button>
          <button
            className="flex items-center justify-between w-full px-4 py-2 text-white bg-purple-600 rounded-md"
            onClick={handleAudioCallClick} // Decrease points by 3
          >
            <span>Audio Call For</span>
            <span>03</span>
          </button>
          <button
            className="flex items-center justify-between w-full px-4 py-2 text-white bg-purple-600 rounded-md"
            onClick={handleVideoCallClick} // Decrease points by 5
          >
            <span>Video Call For</span>
            <span>05</span>
          </button>
        </div>
      </div>
      <div className="pt-6 border-t border-gray-700">
        <h3 className="mb-2 text-lg font-semibold">About {data.name}</h3>
        <p className="text-black">
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum."
        </p>
      </div>
    </div>
  );
};
