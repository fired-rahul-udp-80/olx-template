import { configureStore } from "@reduxjs/toolkit";
import listingsReducer from "./slices/listingsSlice";

export default configureStore({
  reducer: { listings: listingsReducer },
  middleware: (getDefault) =>
    getDefault({
      serializableCheck: false, // allow File objects in state during draft
    }),
});
