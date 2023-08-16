import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import todoSlice from "./slices/todoSlice";
import userSlice from "./slices/userSlice";
import commentSlice from "./slices/commentSlice";

export const store = configureStore({
  reducer: {
    todos: todoSlice,
    user: userSlice,
    comment: commentSlice
  },
});

export type RootState = ReturnType<typeof store.getState>;
export const useAppDispatch: () => typeof store.dispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;