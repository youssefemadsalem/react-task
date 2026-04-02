import { useState, useEffect } from "react";
import "./App.css";
import Navbar from "./components/navbar";
import Cart from "./components/Cart";
import Home from "./components/home";
import { Route, Routes } from "react-router";
import Admin from "./components/Admin";
import AdminForm from "./components/AdminForm";

function App() {
  const [cart, setCart] = useState([]);
  const [menuData, setMenuData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const res = await fetch("http://localhost:3000/menu");
        const data = await res.json();

        setTimeout(() => {
          setMenuData(data);
          setLoading(false);
        }, 2000);
      } catch (error) {
        console.error("Error fetching menu:", error);
        setLoading(false);
      }
    };

    fetchMenu();
  }, []);


  

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

  const AddMenuItem = async (newItem) => {
    try {
      const response = await fetch("http://localhost:3000/menu", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newItem),
      });

      if (response.ok) {
        const addedItem = await response.json();

        setMenuData([...menuData, addedItem]);
      }
    } catch (error) {
      console.error("Error adding item:", error);
    }
  };

  const EditMenuItem = async (id, updatedItem) => {
    try {
      const response = await fetch(`http://localhost:3000/menu/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedItem),
      });

      if (response.ok) {
        const returnedItem = await response.json();

        setMenuData(
          menuData.map((item) => (item.id === id ? returnedItem : item)),
        );
      }
    } catch (error) {
      console.error("Error updating item:", error);
    }
  };

  const DeleteMenuItem = async (id) => {
    try {
      const response = await fetch(`http://localhost:3000/menu/${id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        setMenuData(menuData.filter((item) => item.id !== id));
      } else {
        console.error("Failed to delete the item from the server.");
      }
    } catch (error) {
      console.error("Error connecting to the server:", error);
    }
  };

  if (loading) {
    return <div>Loading menu...</div>;
  }

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

        <Route
          path="/admin"
          element={
            <Admin menuData={menuData} deleteMenuItem={DeleteMenuItem} />
          }
        />

        <Route
          path="/admin/create"
          element={<AdminForm menuData={menuData} addMenuItem={AddMenuItem} />}
        />
        <Route
          path="/admin/edit/:id"
          element={
            <AdminForm menuData={menuData} editMenuItem={EditMenuItem} />
          }
        />
      </Routes>
    </>
  );
}

export default App;
