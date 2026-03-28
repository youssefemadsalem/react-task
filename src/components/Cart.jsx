function Cart({ cart, updateQuantity, removeFromCart }) {
  if (!cart || cart.length === 0) {
    return (
      <div className="h-screen flex justify-center items-center">
        <h2 className="text-4xl text-gray-400">Your cart is empty</h2>
      </div>
    );
  }

  return (
    <div className="p-8 max-w-4xl mx-auto flex flex-col gap-8 h-screen">
      <h1 className="text-4xl font-bold text-center mb-8">Cart</h1>

      {cart.map((item) => (
        <div
          key={item.id}
          className="flex flex-col justify-center items-center border p-8 rounded-2xl shadow-md bg-white"
        >
          <div className="text-center mb-6">
            <h4 className="text-4xl mb-2 capitalize">{item.name}</h4>
          </div>

          <div className="space-x-6 flex items-center">
            <button
              onClick={() => updateQuantity(item.id, 1)}
              className="bg-black px-8 py-3 rounded-2xl text-amber-50 text-xl font-bold"
            >
              +
            </button>

            <span className="text-4xl font-bold w-8 text-center">
              {item.quantity}
            </span>

            <button
              onClick={() => updateQuantity(item.id, -1)}
              className="bg-black px-8 py-3 rounded-2xl text-amber-50 text-xl font-bold"
            >
              -
            </button>

            <button
              onClick={() => removeFromCart(item.id)}
              className="bg-red-500 px-8 py-3 rounded-2xl text-amber-50 text-xl font-bold"
            >
              reset
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default Cart;
