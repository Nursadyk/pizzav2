import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
interface FetchDataParams {
  url: string;
  currentPage: number;
  filter: string;
  orderChange: string;
  order: string;
  search: string;
}
const initialState = {
  items: [],
  isLoading: true,
  filter: "Все",
  currentPage: 1,
  search: "",
  sort: {
    name: "популярности",
    sortProperty: "rating",
  },
} as {
  items: Iproduct[];
  isLoading: boolean;
  search: string;
  filter: string;
  currentPage: number;
  sort: { name: string; sortProperty: string };
};
export const fetchData = createAsyncThunk(
  "card/fetchData",
  async ({
    url,
    currentPage,
    filter,
    orderChange,
    order,
    search,
  }: FetchDataParams) => {
    try {
      const { data } = await axios.get(
        `${url}?&page=${currentPage}&limit=4${
          filter !== "Все" ? "&category=" + filter : ""
        }&sortBy=${orderChange}&order=${order}&name=${search.toLocaleLowerCase()}`
      );
      return data;
    } catch (error) {
      console.log(error);
    }
  }
);
const CardSlice = createSlice({
  name: "card",
  initialState,
  reducers: {
    searchItems: (state, action: PayloadAction<string>) => {
      state.search = action.payload;
    },
    filterCard(state, action: PayloadAction<string>) {
      state.filter = action.payload;
    },
    sortCard(
      state,
      action: PayloadAction<{ name: string; sortProperty: string }>
    ) {
      state.sort = action.payload;
    },
    setCurrentPage(state, action: PayloadAction<number>) {
      state.currentPage = action.payload;
    },
  },
  extraReducers: (build) => {
    build.addCase(fetchData.fulfilled, (state, action) => {
      state.items = action.payload;
      state.isLoading = false;
    });
  },
});
export const { searchItems, filterCard, sortCard, setCurrentPage } =
  CardSlice.actions;
export default CardSlice.reducer;
