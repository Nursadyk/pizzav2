import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface ICart {
  cart: {
    [key: string]: number;
  };
}
const initialState: ICart = {
  cart: JSON.parse(localStorage.getItem("pizzaCart") || "{}"),
};
const CartSLice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCartSlice(state, action: PayloadAction<number>) {
      if (!state.cart[action.payload]) {
        state.cart[action.payload] = 1;
        localStorage.setItem("pizzaCart", JSON.stringify(state.cart));
      } else {
        state.cart[action.payload] = state.cart[action.payload] + 1;
        localStorage.setItem("pizzaCart", JSON.stringify(state.cart));
      }
    },
    removeCartItems(state, action: PayloadAction<number>) {
      if (!state.cart[action.payload]) {
        state.cart[action.payload] = 1;
      } else {
        state.cart[action.payload] = state.cart[action.payload] - 1;
      }
    },
  },
});
export const { addToCartSlice, removeCartItems } = CartSLice.actions;
export default CartSLice.reducer;
