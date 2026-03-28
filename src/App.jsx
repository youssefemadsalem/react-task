import { useState } from "react";
import "./App.css";
import Navbar from "./components/navbar";
import Cart from "./components/Cart";
import Home from "./components/home";
import { Route, Routes } from "react-router";

const menuData = [
  { id: 1, name: "small burger", price: 90, cateId: 1 },
  { id: 2, name: "medium burger", price: 120, cateId: 1 },
  { id: 3, name: "large burger", price: 200, cateId: 1 },
  { id: 4, name: "small cola", price: 10, cateId: 2 },
  { id: 5, name: "medium cola", price: 15, cateId: 2 },
  { id: 6, name: "large cola", price: 20, cateId: 2 },
  { id: 7, name: "small fries", price: 20, cateId: 3 },
  { id: 8, name: "medium fries", price: 25, cateId: 3 },
  { id: 9, name: "large fries", price: 35, cateId: 3 },
];

function App() {
  const [cart, setCart] = useState([]);

  const toggleCartItem = (product) => {
    const itemIndex = cart.findIndex((item) => item.id === product.id);

    if (itemIndex !== -1) {
      setCart(cart.filter((item) => item.id !== product.id));
    } else {
      setCart([...cart, { ...product, quantity: 1 }]);
    }
  };

  const updateQuantity = (id, amount) => {
    setCart(
      cart.map((item) => {
        if (item.id === id) {
          const newQuantity = item.quantity + amount;
          return { ...item, quantity: Math.max(1, newQuantity) };
        }
        return item;
      }),
    );
  };

  const removeFromCart = (id) => {
    setCart(cart.filter((item) => item.id !== id));
  };

  return (
    <>
      <Navbar />
      <Routes>
        <Route
          path="/"
          element={
            <Home data={menuData} cart={cart} toggleCartItem={toggleCartItem} />
          }
        />
        <Route
          path="/cart"
          element={
            <Cart
              cart={cart}
              updateQuantity={updateQuantity}
              removeFromCart={removeFromCart}
            />
          }
        />
      </Routes>
    </>
  );
}

export default App;
