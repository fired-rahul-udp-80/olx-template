import { Link } from "react-router-dom";
import { Plus } from "lucide-react";
export default function Navbar() {
  return (
    <header className="bg-white shadow-lg">
      <div className="mx-auto max-w-7xl px-4 py-3 flex items-center gap-4">
        <Link to="/" className="text-2xl font-extrabold text-blue-600">
          OLX
        </Link>
        <div className="flex-1">
          <input
            className="w-full rounded-md border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Search"
          />
        </div>
        <Link
          to="/sell/category"
          className="relative inline-flex items-center px-5 py-2 font-bold text-blue-800 
                 rounded-full border-4  
                 bg-white text-sm overflow-hidden"
          style={{
            borderImage: "linear-gradient(90deg, #fbbc05, #34a853, #4285f4) 1",
          }}
        >
          <Plus size={16} className="mr-1" strokeWidth={3} />
          SELL
        </Link>
      </div>
    </header>
  );
}
