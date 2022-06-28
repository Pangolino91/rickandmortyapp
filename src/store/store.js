import { configureStore } from "@reduxjs/toolkit";
import CharactersSlice from "./chars-slice";

const store = configureStore({
  reducer: {
    chars: CharactersSlice.reducer
  },
});
export default store;
