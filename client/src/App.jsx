import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Product from "./pages/Product";
import SellCategory from "./pages/SellCategory";
import SellDetails from "./pages/SellDetails";

export default function App() {
  const { pathname } = useLocation();
  const hideNav = pathname.startsWith("/sell");

  return (
    <div className="min-h-screen w-full bg-gray-100">
 
      {!hideNav && <Navbar />}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/product/:id" element={<Product />} />
        <Route path="/sell/category" element={<SellCategory />} />
        <Route path="/sell/details" element={<SellDetails />} />
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </div>
  );
}
