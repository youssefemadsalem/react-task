import { useEffect } from "react";
import { useNavigate, useParams } from "react-router";
import { useForm } from "react-hook-form";

function AdminForm({ menuData, addMenuItem, editMenuItem }) {
  const { id } = useParams();
  const navigate = useNavigate();
  const isEditMode = Boolean(id);

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: { name: "", price: "", cateId: 1 },
  });

  useEffect(() => {
    if (isEditMode && menuData.length > 0) {
      const itemToEdit = menuData.find(
        (item) => String(item.id) === String(id),
      );

      if (itemToEdit) {
        reset({
          name: itemToEdit.name,
          price: itemToEdit.price,
          cateId: itemToEdit.cateId,
        });
      }
    }
  }, [id, menuData, isEditMode, reset]);

  const onSubmit = async (data) => {
    const formattedData = {
      ...data,
      price: Number(data.price),
      cateId: Number(data.cateId),
    };

    if (isEditMode) {
      await editMenuItem(id, formattedData);
    } else {
      await addMenuItem(formattedData);
    }

    navigate("/admin");
  };

  return (
    <div className="p-8 max-w-2xl mx-auto">
      <h1 className="text-4xl font-bold text-center mb-8">
        {isEditMode ? "Edit Menu Item" : "Create New Item"}
      </h1>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white p-8 rounded-xl shadow-md flex flex-col gap-6"
      >
        <div className="flex flex-col gap-2">
          <label className="font-semibold text-gray-700">Item Name</label>
          <input
            {...register("name", { required: "Name is required" })}
            type="text"
            className="border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="e.g. Mega Burger"
          />
          {errors.name && (
            <span className="text-red-500 text-sm">{errors.name.message}</span>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <label className="font-semibold text-gray-700">Price (EGP)</label>
          <input
            {...register("price", {
              required: "Price is required",
              min: { value: 1, message: "Price must be above 0" },
            })}
            type="number"
            className="border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="0"
          />
          {errors.price && (
            <span className="text-red-500 text-sm">{errors.price.message}</span>
          )}
        </div>

        <div className="flex flex-col gap-2">
          <label className="font-semibold text-gray-700">Category</label>
          <select
            {...register("cateId", { required: true })}
            className="border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value={1}>Burgers (1)</option>
            <option value={2}>Cola (2)</option>
            <option value={3}>Fries (3)</option>
          </select>
        </div>

        <div className="flex gap-4 mt-4">
          <button
            type="button"
            onClick={() => navigate("/admin")}
            className="flex-1 bg-gray-400 text-white font-bold py-3 rounded-lg hover:bg-gray-500 transition"
          >
            Cancel
          </button>
          <button
            type="submit"
            className={`flex-1 text-white font-bold py-3 rounded-lg transition ${
              isEditMode
                ? "bg-blue-500 hover:bg-blue-600"
                : "bg-green-500 hover:bg-green-600"
            }`}
          >
            {isEditMode ? "Update Item" : "Save New Item"}
          </button>
        </div>
      </form>
    </div>
  );
}

export default AdminForm;
