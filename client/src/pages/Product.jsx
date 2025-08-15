import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchListingById } from "../slices/listingsSlice";

export default function Product() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { items, active } = useSelector((s) => s.listings);

  const doc = active?._id === id ? active : items.find((x) => x._id === id);

  // State to track which image is shown as the main image
  const [mainImage, setMainImage] = useState(null);

  useEffect(() => {
    if (!doc) {
      dispatch(fetchListingById(id));
    } else {
      setMainImage(doc.images?.[0] || null); // default main image
    }
  }, [id, doc, dispatch]);

  if (!doc) return <div className="mx-auto max-w-7xl px-4 py-6">Loading…</div>;

  return (
    <div className="mx-auto max-w-7xl px-4 py-6">
      <div className="grid lg:grid-cols-3 gap-6">
        {/* Gallery */}
        <div className="lg:col-span-2 bg-white rounded-lg shadow overflow-hidden">
          <div className="aspect-[4/3] bg-gray-100">
            {mainImage ? (
              <img
                src={mainImage}
                alt={doc.title}
                className="h-full w-full object-cover"
              />
            ) : null}
          </div>

          {doc.images?.length > 1 && (
            <div className="p-3 flex gap-2 overflow-x-auto">
              {doc.images.map((src, i) => (
                <img
                  key={i}
                  src={src}
                  alt=""
                  onClick={() => setMainImage(src)}
                  className={`h-20 w-28 object-cover rounded border cursor-pointer 
                    ${mainImage === src ? "ring-2 ring-blue-500" : ""}`}
                />
              ))}
            </div>
          )}
        </div>

        {/* Side card */}
        <aside className="space-y-4">
          <div className="bg-white rounded-lg shadow p-4">
            <div className="text-2xl font-bold">₹{doc.price}</div>
            <div className="text-sm text-gray-600 mt-1">{doc.title}</div>
            <div className="text-xs text-gray-500 mt-2">
              {doc.category} / {doc.subcategory}
            </div>
            <button className="mt-4 w-full rounded-md bg-green-600 text-white py-2 hover:bg-green-700">
              Chat with seller
            </button>
          </div>

          <div className="bg-white rounded-lg shadow p-4">
            <div className="font-semibold mb-2">Details</div>
            <dl className="text-sm text-gray-700 grid grid-cols-2 gap-y-1">
              <dt className="text-gray-500">Brand</dt>
              <dd>{doc.attributes?.brand || "-"}</dd>
              <dt className="text-gray-500">Condition</dt>
              <dd>{doc.attributes?.condition || "-"}</dd>
            </dl>
          </div>

          <div className="bg-white rounded-lg shadow p-4">
            <div className="font-semibold mb-2">Description</div>
            <p className="text-sm text-gray-700 whitespace-pre-wrap">
              {doc.description || "-"}
            </p>
          </div>
        </aside>
      </div>
    </div>
  );
}
