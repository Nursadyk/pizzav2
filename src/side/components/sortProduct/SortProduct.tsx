import React from "react";
import scss from "./SortProduct.module.scss";
interface IsimpleSort {
  text: string;
}

interface IpropsSort {
  popular: IsortWidthPopular;
  choose: string;
  onClickCategory: (text: string) => void;
  onClickChoose: (text: IsortWidthPopular) => void;
}
const simleSort: IsimpleSort[] = [
  {
    text: "Все",
  },
  {
    text: "Мясные",
  },
  {
    text: "Вегетарианская",
  },
  {
    text: "Гриль",
  },
  {
    text: "Острые",
  },
  {
    text: "Закрытые",
  },
];
const sortWidthPopular: IsortWidthPopular[] = [
  { name: "популярности(Desk)", sortProperty: "rating" },
  { name: "популярности(Ask)", sortProperty: "-rating" },
  { name: "цене(Desk)", sortProperty: "price" },
  { name: "цене(Ask)", sortProperty: "-price" },
  { name: " алфавиту(Desk)", sortProperty: "name" },
  { name: " алфавиту(Ask)", sortProperty: "-name" },
];
const SortProduct: React.FC<IpropsSort> = ({
  popular,

  choose,
  onClickCategory,
  onClickChoose,
}) => {
  const [openSort, setOpenSort] = React.useState<boolean>(false);
  const handleChooseSort = (el: IsortWidthPopular) => {
    onClickChoose(el);
    setOpenSort(false);
  };
  const sortRef = React.useRef<HTMLUListElement | null>(null);
  React.useEffect(() => {
    const handleCloseSort = (e: MouseEvent) => {
      if (!e.composedPath().includes(sortRef.current!)) {
        setOpenSort(false);
        console.log("re render");
      }
    };
    document.body.addEventListener("click", handleCloseSort);
    return () => {
      window.document.body.removeEventListener("click", handleCloseSort);
    };
  }, []);

  return (
    <div className={scss.sort}>
      <div className="container">
        <div className={scss.sort__inner}>
          <ul className={scss.simple__sort}>
            {simleSort.map((el, id) => (
              <li
                onClick={() => onClickCategory(el.text)}
                key={id}
                style={{
                  background: choose === el.text ? "black" : "",
                  color: choose === el.text ? "#fff" : "",
                }}
              >
                {el.text}
              </li>
            ))}
          </ul>
          <ul className={scss.sort__width_popular} ref={sortRef}>
            <li>Сортировка по:</li>
            <li
              onClick={() => setOpenSort(!openSort)}
              style={{
                color: " #FE5F1E",
                marginLeft: "5px",
                borderBottom: "1px dashed #FE5F1E",
              }}
            >
              {popular.name}
            </li>
            {openSort && (
              <ul className={scss.inner__ul}>
                {sortWidthPopular.map((el, id) => (
                  <li
                    style={{
                      color: popular.name === el.name ? "red" : "",
                      background: popular === el ? "#FE5F1E0D" : "",
                    }}
                    onClick={() => handleChooseSort(el)}
                    key={id}
                  >
                    {el.name}
                  </li>
                ))}
              </ul>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default SortProduct;
