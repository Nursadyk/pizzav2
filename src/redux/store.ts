import { combineReducers, configureStore } from "@reduxjs/toolkit";
import CardSlice from "./futures/CardSlice";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import SettingSlice from "./futures/SettingSlice";
import CartSlice from "./futures/CartSlice";
const combineValues = combineReducers({
  card: CardSlice,
  setting: SettingSlice,
  pizzaCart: CartSlice,
});
export const store = configureStore({
  reducer: combineValues,
});
export const useUpDispatch: () => typeof store.dispatch = useDispatch;
export const useUpSelector: TypedUseSelectorHook<
  ReturnType<typeof store.getState>
> = useSelector;
