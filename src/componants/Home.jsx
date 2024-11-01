import React, { useEffect, useState } from "react";
import axios from "axios";

const Home = () => {
   const MyApikey= process.env.Api_key;

  const [data, setData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(10);
  const [loading, setLoading] = useState(true);



  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd",
          {
            headers: {
              accept: "application/json",
              "x-cg-demo-api-key": MyApikey,
            },
          }
        );
        setData(response.data);
        setLoading(false);
       
      } catch (error) {
        console.error("Error fetching data:", error);
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const totalPages = Math.ceil(data.length / itemsPerPage);
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  if (loading) {
    return <div className="text-center text-slate-500 text-7xl font-serif">Loading...</div>;
  }

  return (
    <div className="container mx-auto p-4 font-serif">
      <h1 className="text-6xl font-extrabold text-center mb-8 text-transparent bg-clip-text bg-gradient-to-r from-yellow-500 via-yellow-300 to-yellow-500 drop-shadow-2xl tracking-wide">
        Cryptocurrencies
      </h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-4">
        {currentItems.map((item) => (
          <div
            key={item.id}
            className="border rounded-lg p-4 shadow-lg bg-yellow-100 transition-transform transform hover:scale-105 hover:shadow-xl hover:bg-yellow-200 cursor-pointer"
          >
            <img
              src={item.image}
              alt={item.name}
              className="w-16 h-16 mb-4 mx-auto"
            />
            <h2 className="text-lg font-semibold text-center">{item.name}</h2>
            <p className="text-gray-700 text-center">
              Current Price:{" "}
              <span className="font-bold">
                ${item.current_price.toFixed(2)}
              </span>
            </p>
            <p className="text-gray-700 text-center">
              24h Change:{" "}
              <span
                className={`font-bold ${
                  item.price_change_percentage_24h < 0
                    ? "text-red-500"
                    : "text-green-500"
                }`}
              >
                {item.price_change_percentage_24h.toFixed(2)}%
              </span>
            </p>
            <p className="text-gray-700 text-center">
              Market Cap:{" "}
              <span className="font-bold">
                ${item.market_cap.toLocaleString()}
              </span>
            </p>
          </div>
        ))}
      </div>

      <div className="flex justify-center mt-6">
        {Array.from({ length: totalPages }, (_, index) => (
          <button
            className={`border-2 m-1 p-2 rounded-lg transition-colors duration-300  ${
              currentPage === index + 1
                ? "bg-blue-500 text-white"
                : "bg-white text-black"
            }`}
            key={index + 1}
            onClick={() => handlePageChange(index + 1)}
            disabled={currentPage === index + 1}
          >
            {index + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default Home;
