function Admin({ menuData, deleteMenuItem }) {
  return (
    <div className="p-8 max-w-5xl mx-auto">
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
                    <button className="px-4 py-2 bg-blue-500 text-white font-bold rounded shadow hover:bg-blue-600 transition">
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
    </div>
  );
}

export default Admin;
