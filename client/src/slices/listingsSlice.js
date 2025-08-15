import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../api/axios";

export const fetchListings = createAsyncThunk("listings/fetchAll", async () => {
  const res = await api.get("/listings");
  return res.data;
});

export const fetchListingById = createAsyncThunk("listings/fetchOne", async (id) => {
  const res = await api.get(`/listings/${id}`); // if you don't have this, keep using /listings and filter client-side
  return res.data;
}, { condition: (id) => !!id });

export const createListing = createAsyncThunk("listings/create", async (_, { getState }) => {
  const { draft } = getState().listings;
  const fd = new FormData();
  fd.append("category", draft.category);
  fd.append("subcategory", draft.subcategory);
  fd.append("title", draft.title);
  fd.append("description", draft.description);
  fd.append("price", draft.price);
  // attributes flatten
  Object.entries(draft.attributes || {}).forEach(([k, v]) => fd.append(`attributes[${k}]`, v || ""));
  (draft.images || []).forEach((f) => fd.append("images", f));
  const res = await api.post("/listings", fd, { headers: { "Content-Type": "multipart/form-data" } });
  return res.data;
});

const initialState = {
  items: [],
  status: "idle",
  draft: {
    category: "",
    subcategory: "",
    title: "",
    description: "",
    price: "",
    attributes: { condition: "", brand: "" },
    images: [],
  },
  categories: {
    "Mobiles": ["Mobile Phones", "Accessories"],
    "Vehicles": ["Cars", "Motorcycles"],
    "Electronics & Appliances": ["TVs", "ACs", "Refrigerators"],
    "Furniture": ["Sofa & Dining", "Beds & Wardrobes"],
  },
  active: null,
};

const listingsSlice = createSlice({
  name: "listings",
  initialState,
  reducers: {
    setCategory: (s, a) => { s.draft.category = a.payload; s.draft.subcategory = ""; },
    setSubcategory: (s, a) => { s.draft.subcategory = a.payload; },
    setField: (s, a) => { const { key, value } = a.payload; s.draft[key] = value; },
    setAttribute: (s, a) => { const { key, value } = a.payload; s.draft.attributes[key] = value; },
    setImages: (s, a) => { s.draft.images = a.payload; },
    resetDraft: (s) => { s.draft = initialState.draft; },
  },
  extraReducers: (b) => {
    b.addCase(fetchListings.fulfilled, (s, a) => { s.items = a.payload; s.status = "succeeded"; });
    b.addCase(createListing.fulfilled, (s, a) => { s.items.unshift(a.payload); });
    b.addCase(fetchListingById.fulfilled, (s, a) => { s.active = a.payload; });
  },
});

export const { setCategory, setSubcategory, setField, setAttribute, setImages, resetDraft } = listingsSlice.actions;
export default listingsSlice.reducer;
