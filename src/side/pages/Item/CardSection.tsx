import React from "react";
import scss from "./CardSection.module.scss";
import { useUpDispatch, useUpSelector } from "../../../redux/store";
import { addToCartSlice } from "../../../redux/futures/CartSlice";
interface IpropsFromHome {
  el: Iproduct;
}

const CardSection: React.FC<IpropsFromHome> = ({ el }) => {
  const [isType, setIsType] = React.useState<number>();
  const [isCentimeter, setIsCentimeter] = React.useState<number>();
  const type = ["тонкое", "традиционнное"];
  const { cart } = useUpSelector((s) => s.pizzaCart);
  const dispatch = useUpDispatch();
  const addToCart = (id: number) => {
    dispatch(addToCartSlice(id));
  };
  return (
    <div className={scss.home__inner__card}>
      <div className={scss.image_wrapper}>
        <img src={el.img} alt="" />
        <h3>{el.name}</h3>
      </div>
      <div className={scss.home__inner__card__info}>
        <div className={scss.home__info_top}>
          {el.types.map((el) => (
            <li
              key={el}
              onClick={() => setIsType(el)}
              style={{
                background: isType === el ? "#fff" : "",
              }}
            >
              {type[el]}
            </li>
          ))}
        </div>
        <div className={scss.home__info_bottom}>
          <ul>
            {el.sizes.map((el, id) => (
              <li
                onClick={() => setIsCentimeter(el)}
                key={id}
                style={{
                  background: isCentimeter === el ? "#fff" : "",
                }}
              >
                {el}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className={scss.price}>
        <p> от {el.price} P</p>
        <button onClick={() => addToCart(el.id!)}>
          + Добавить{cart[el.id!] > 0 && cart[el.id!]}
        </button>
      </div>
    </div>
  );
};

export default CardSection;
