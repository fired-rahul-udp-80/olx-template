import { useDispatch, useSelector } from "react-redux";
import { setCategory, setSubcategory } from "../slices/listingsSlice";
import { useNavigate } from "react-router-dom";

export default function SellCategory() {
  const dispatch = useDispatch();
  const nav = useNavigate();
  const { draft, categories } = useSelector((s) => s.listings);

  const goNext = () => {
    if (draft.category && draft.subcategory) nav("/sell/details");
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="mx-auto max-w-3xl pt-8 pb-16">
        <div className="bg-white rounded-lg shadow p-6">
          <h1 className="text-xl font-semibold mb-6">Choose a category</h1>

          <div className="grid md:grid-cols-2 gap-4">
            {/* Category */}
            <div>
              <label className="block text-sm font-medium mb-1">Category</label>
              <select
                className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={draft.category}
                onChange={(e) => dispatch(setCategory(e.target.value))}
              >
                <option value="">-- Choose --</option>
                {Object.keys(categories).map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </select>
            </div>

            {/* Subcategory */}
            <div>
              <label className="block text-sm font-medium mb-1">Subcategory</label>
              <select
                className="w-full rounded-md border border-gray-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={draft.subcategory}
                onChange={(e) => dispatch(setSubcategory(e.target.value))}
                disabled={!draft.category}
              >
                <option value="">-- Choose --</option>
                {(categories[draft.category] || []).map((sc) => (
                  <option key={sc} value={sc}>{sc}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="mt-6 flex justify-end gap-3">
             
            <button
              className="px-4 py-2 rounded-md bg-green-600 text-white disabled:opacity-50"
              disabled={!draft.category || !draft.subcategory}
              onClick={goNext}
            >
              Next
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
