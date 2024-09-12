import { PayloadAction, createSlice } from "@reduxjs/toolkit";
const getSliderColor = JSON.parse(String(localStorage.getItem("settingValue")));
const initialState = {
  sliderColor: getSliderColor,
} as { sliderColor: string };
const SettingSlice = createSlice({
  name: "setting",
  initialState,
  reducers: {
    changeSliderBackground(state, action: PayloadAction<string>) {
      state.sliderColor = action.payload;
    },
  },
});
export const { changeSliderBackground } = SettingSlice.actions;
export default SettingSlice.reducer;
