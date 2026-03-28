import { useState } from "react";

// Added cart and toggleCartItem props here
function Home({ data, cart, toggleCartItem }) {
  const [activeCategory, setActiveCategory] = useState("All");

  const filteredData = data.filter((item) => {
    if (activeCategory === "All") {
      return true;
    }
    return item.cateId === activeCategory;
  });

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold text-center mb-8">Our Menu</h1>

      <div className="flex justify-center gap-4 mb-8">
        <button
          onClick={() => setActiveCategory("All")}
          className="px-6 py-2 bg-red-500 text-white font-semibold rounded shadow hover:bg-red-600 transition"
        >
          All
        </button>
        <button
          onClick={() => setActiveCategory(1)}
          className="px-6 py-2 bg-yellow-500 text-white font-semibold rounded shadow hover:bg-yellow-600 transition"
        >
          Burger
        </button>
        <button
          onClick={() => setActiveCategory(2)}
          className="px-6 py-2 bg-yellow-500 text-white font-semibold rounded shadow hover:bg-yellow-600 transition"
        >
          Cola
        </button>
        <button
          onClick={() => setActiveCategory(3)}
          className="px-6 py-2 bg-yellow-500 text-white font-semibold rounded shadow hover:bg-yellow-600 transition"
        >
          Fries
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {filteredData.map((item) => {
          const isInCart = cart?.some((c) => c.id === item.id);

          return (
            <div
              key={item.id}
              className="border p-6 rounded-lg shadow-md flex flex-col items-center bg-white"
            >
              <h2 className="text-xl font-bold capitalize text-gray-800">
                {item.name}
              </h2>
              <p className="text-lg text-gray-600 mt-2 font-semibold">
                Price: {item.price} EGP
              </p>

              <button
                onClick={() => toggleCartItem(item)}
                className={`mt-4 px-4 py-2 rounded w-full font-bold text-white transition ${
                  isInCart
                    ? "bg-red-500 hover:bg-red-600"
                    : "bg-green-500 hover:bg-green-600"
                }`}
              >
                {isInCart ? "Remove from Cart" : "Add to Cart"}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Home;
