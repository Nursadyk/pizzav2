import React from "react";
import scss from "./Home.module.scss";
import CardSection from "./CardSection";
import Skeleton from "./Skeleton";
import SortProduct from "../../components/sortProduct/SortProduct";
import { useUpDispatch, useUpSelector } from "../../../redux/store";
import Pagination from "../../components/pagination";
import {
  fetchData,
  filterCard,
  sortCard,
} from "../../../redux/futures/CardSlice";
const url = import.meta.env.VITE_URL_ITEMS!;
interface IpropsHome {}
const ItemSection: React.FC<IpropsHome> = () => {
  const { search, filter, sort, currentPage, isLoading, items } = useUpSelector(
    (s) => s.card
  );
  const dispatch = useUpDispatch();
  const order = sort.sortProperty.includes("-") ? "ask" : "desc";
  const orderChange = sort.sortProperty.replace("-", "");
  React.useEffect(() => {
    const getItems = async () => {
      try {
        dispatch(
          fetchData({
            url,
            currentPage,
            filter,
            orderChange,
            order,
            search,
          })
        );
      } catch (error) {
        console.log(error);
      }
    };
    getItems();
  }, [filter, sort.sortProperty, search, currentPage]);
  const handleChoose = (text: string) => {
    dispatch(filterCard(text));
  };
  const handleSort = (text: IsortWidthPopular) => {
    dispatch(sortCard(text));
  };
  return (
    <>
      <SortProduct
        popular={sort}
        choose={filter}
        onClickCategory={(text) => handleChoose(text)}
        onClickChoose={(text) => handleSort(text)}
      />
      <section className={scss.home}>
        <div className="container">
          <h2>Все пиццы</h2>
          <div className={scss.home__inner}>
            {isLoading
              ? [...new Array(4)].map((_, i) => <Skeleton key={i} />)
              : items.map((el, id) => <CardSection key={id} el={el} />)}
          </div>
          <Pagination />
        </div>
      </section>
    </>
  );
};

export default ItemSection;
