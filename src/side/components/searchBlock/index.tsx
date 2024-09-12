import React from "react";
import scss from "./SearchBlock.module.scss";
import { useUpDispatch } from "../../../redux/store";
import { searchItems } from "../../../redux/futures/CardSlice";
import debounce from "lodash.debounce";
interface IpropSearch {}
const SearchBlock: React.FC<IpropSearch> = () => {
  const [value, setValue] = React.useState<string>("");
  const dispatch = useUpDispatch();
  const inputRef = React.useRef<HTMLInputElement | null>(null);
  const handleClose = () => {
    setValue("");
    dispatch(searchItems(""));
    inputRef.current?.focus();
  };
  const handleDebounce = React.useCallback(
    debounce((str) => {
      dispatch(searchItems(str));
    }, 1000),
    []
  );
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
    handleDebounce(e.target.value);
  };
  return (
    <>
      <div className={scss.root}>
        <span className="material-symbols-outlined">search</span>
        <input
          type="text"
          placeholder="Search heres"
          className={scss.input}
          value={value}
          ref={inputRef}
          onChange={handleChange}
        />
        <span onClick={handleClose} className="material-symbols-outlined close">
          close
        </span>
      </div>
    </>
  );
};

export default SearchBlock;
