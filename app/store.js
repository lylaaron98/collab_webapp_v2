import { configureStore } from "@reduxjs/toolkit";
import { setupListeners } from "@reduxjs/toolkit/query";
import boardsSlice from "./(root)/kanbanBoard/boardsSlice";

export const store = configureStore({
  reducer: {
    boards: boardsSlice.reducer,
  },
  devTools: true,
});

setupListeners(store.dispatch);
