import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const DashboardUser = () => {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("http://localhost:3000/api/v1/get-all");
        if (!res.ok) {
          throw new Error("Network response was not ok");
        }
        const result = await res.json();
        console.log(result.data);
        setData(result.data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }

  return (
    <>
      <div className="grid grid-cols-1 col-span-9 gap-5 p-5 md:grid-cols-2 lg:grid-cols-4">
        {data.map((item, index) => (
          <div
            key={index}
            className="max-w-sm overflow-hidden rounded shadow-lg"
          >
            <img
              className="w-full"
              src={item.photo}
              alt="Sunset in the mountains"
            />
            <div className="px-6 py-4">
              <div className="mb-2 text-xl font-bold">
                <Link to={`/dashboard/profile/${item.id}`}>{item.name}</Link>
              </div>
              <p className="text-base text-gray-700">Hello i'm using convove</p>
            </div>
            <div className="px-6 pt-4 pb-2">
              <span className="inline-block px-3 py-1 mb-2 mr-2 text-sm font-semibold text-gray-700 bg-gray-200 rounded-full">
                #photography
              </span>
              <span className="inline-block px-3 py-1 mb-2 mr-2 text-sm font-semibold text-gray-700 bg-gray-200 rounded-full">
                #travel
              </span>
              <span className="inline-block px-3 py-1 mb-2 mr-2 text-sm font-semibold text-gray-700 bg-gray-200 rounded-full">
                #winter
              </span>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default DashboardUser;
