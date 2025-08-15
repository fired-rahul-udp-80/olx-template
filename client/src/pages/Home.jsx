import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchListings } from "../slices/listingsSlice";
import { Link } from "react-router-dom";

export default function Home() {
  const dispatch = useDispatch();
  const { items, status } = useSelector((s) => s.listings);
  console.log("img",items);

  useEffect(() => { dispatch(fetchListings()); }, [dispatch]);

  return (
    <div className="mx-auto max-w-7xl px-4 py-6">
      <h2 className="text-xl font-semibold mb-4">Fresh recommendations</h2>

      {status === "loading" && <div>Loading…</div>}

      <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
        {items.map((it) => (
          <Link
            to={`/product/${it._id}`}
            key={it._id}
            className="block bg-white rounded-lg border border-gray-200 hover:shadow-md transition"
          >
            <div className="aspect-[4/3] w-full overflow-hidden rounded-t-lg bg-gray-100">
              {it.images?.[0] ? (
                <img
                  // src={`${import.meta.env.VITE_FILES_BASE || "http://localhost:4000"}${it.images[0]}`}
                  src={it.images?.[0]}
                  alt={it.title}
                  className="h-full w-full object-cover"
                  loading="lazy"
                />
              ) : (
                <div className="h-full w-full grid place-items-center text-gray-400">No Image</div>
              )}
            </div>
            <div className="p-3">
              <div className="text-lg font-bold">₹{it.price}</div>
              <div className="text-sm text-gray-800 line-clamp-1">{it.title}</div>
              <div className="text-xs text-gray-500 mt-2">• {it.category} / {it.subcategory}</div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
