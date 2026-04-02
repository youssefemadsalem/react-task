import { useNavigate } from "react-router";

function Admin({ menuData, deleteMenuItem }) {
  const navigate = useNavigate();

  return (
    <div className="p-8 max-w-5xl mx-auto relative">
      <h1 className="text-4xl font-bold text-center mb-8">Admin Dashboard</h1>

      <div className="overflow-x-auto bg-white shadow-md rounded-lg border border-gray-200">
        <table className="w-full text-left border-collapse">
          <thead className="bg-gray-100 text-gray-700 uppercase text-sm">
            <tr>
              <th className="p-4 border-b">ID</th>
              <th className="p-4 border-b">Name</th>
              <th className="p-4 border-b">Price (EGP)</th>
              <th className="p-4 border-b">Category ID</th>
              <th className="p-4 border-b text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            {menuData && menuData.length > 0 ? (
              menuData.map((item) => (
                <tr
                  key={item.id}
                  className="hover:bg-gray-50 border-b last:border-none transition"
                >
                  <td className="p-4 font-medium">{item.id}</td>
                  <td className="p-4 capitalize">{item.name}</td>
                  <td className="p-4 font-semibold text-gray-600">
                    {item.price}
                  </td>
                  <td className="p-4">{item.cateId}</td>
                  <td className="p-4 flex justify-center gap-3">
                    <button
                      onClick={() => navigate(`/admin/edit/${item.id}`)}
                      className="px-4 py-2 bg-blue-500 text-white font-bold rounded shadow hover:bg-blue-600 transition"
                    >
                      Edit
                    </button>

                    <button
                      onClick={() => deleteMenuItem(item.id)}
                      className="px-4 py-2 bg-red-500 text-white font-bold rounded shadow hover:bg-red-600 transition"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="5"
                  className="p-8 text-center text-gray-500 text-xl"
                >
                  No menu items available.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      <button
        onClick={() => navigate("/admin/create")}
        className="fixed bottom-10 right-10 bg-green-500 text-white w-16 h-16 rounded-full shadow-2xl flex justify-center items-center hover:bg-green-600 hover:scale-105 transition-all"
        title="Create New Item"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={2.5}
          stroke="currentColor"
          className="w-8 h-8"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M12 4.5v15m7.5-7.5h-15"
          />
        </svg>
      </button>
    </div>
  );
}

export default Admin;
