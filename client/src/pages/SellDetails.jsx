import { useDispatch, useSelector } from "react-redux";
import { setField, setAttribute, setImages, resetDraft, createListing, fetchListings } from "../slices/listingsSlice";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

export default function SellDetails() {
  const dispatch = useDispatch();
  const nav = useNavigate();
  const { draft } = useSelector((s) => s.listings);
  const [busy, setBusy] = useState(false);

  useEffect(() => {
    if (!draft.category || !draft.subcategory) {
      nav("/sell/category");
    }
  }, [draft, nav]);

  const onSubmit = async (e) => {
    e.preventDefault();
    setBusy(true);
    try {
      await dispatch(createListing()).unwrap();
      await dispatch(fetchListings());
      dispatch(resetDraft());
      nav("/");
    } catch (e) {
      console.error(e);
    } finally {
      setBusy(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="mx-auto max-w-3xl pt-8 pb-16">
        <form className="bg-white rounded-lg shadow p-6" onSubmit={onSubmit}>
          <h1 className="text-xl font-semibold mb-6">Include some details</h1>
          <p className="text-sm text-gray-500 mb-4">
            {draft.category} / {draft.subcategory}
          </p>

          {/* Title & Price */}
          <div className="grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Ad Title</label>
              <input
                className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={draft.title}
                onChange={(e) => dispatch(setField({ key: "title", value: e.target.value }))}
                placeholder="e.g., iPhone 13 128GB"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Price (₹)</label>
              <input
                type="number"
                className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={draft.price}
                onChange={(e) => dispatch(setField({ key: "price", value: e.target.value }))}
                required
              />
            </div>
          </div>

          {/* Description */}
          <div className="mt-4">
            <label className="block text-sm font-medium mb-1">Description</label>
            <textarea
              rows="4"
              className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 resize-y"
              value={draft.description}
              onChange={(e) => dispatch(setField({ key: "description", value: e.target.value }))}
              placeholder="Add condition, features, reason for sale, etc."
            />
          </div>

          {/* Attributes */}
          <div className="mt-4 grid md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Condition</label>
              <select
                className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={draft.attributes.condition || ""}
                onChange={(e) => dispatch(setAttribute({ key: "condition", value: e.target.value }))}
              >
                <option value="">--</option>
                <option>New</option>
                <option>Used - Like New</option>
                <option>Used - Good</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Brand</label>
              <input
                className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={draft.attributes.brand || ""}
                onChange={(e) => dispatch(setAttribute({ key: "brand", value: e.target.value }))}
                placeholder="e.g., Apple"
              />
            </div>
          </div>

          {/* Images */}
          <div className="mt-4">
            <label className="block text-sm font-medium mb-1">Upload Photos (up to 5)</label>
            <input
              type="file"
              accept="image/*"
              multiple
              className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none"
              onChange={(e) => {
                const files = Array.from(e.target.files).slice(0, 5);
                dispatch(setImages(files));
              }}
            />
            <div className="text-xs text-gray-500 mt-1">
              {draft.images?.length || 0} selected
            </div>
          </div>

          {/* Actions */}
          <div className="mt-6 flex justify-end gap-3">
            
            <button
              type="submit"
              disabled={!draft.title || !draft.price || busy}
              className="px-4 py-2 rounded-md bg-green-600 text-white disabled:opacity-50"
            >
              {busy ? "Publishing..." : "Publish"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
