import React from "react";
import ReactPaginate from "react-paginate";
import scss from "./Pagination.module.scss";
import { useUpDispatch } from "../../../redux/store";
import { setCurrentPage } from "../../../redux/futures/CardSlice";
const Pagination: React.FC = () => {
  const dispatch = useUpDispatch();
  return (
    <>
      <ReactPaginate
        className={scss.pagination}
        breakLabel="..."
        nextLabel=" >"
        onPageChange={(e) => dispatch(setCurrentPage(e.selected + 1))}
        pageRangeDisplayed={4}
        pageCount={2}
        previousLabel="<"
        renderOnZeroPageCount={null}
      />
    </>
  );
};

export default Pagination;
