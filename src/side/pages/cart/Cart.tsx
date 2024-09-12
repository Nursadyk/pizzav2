import React from "react";
import scss from "./Cart.module.scss";
// import { Link } from "react-router-dom";
import { useUpDispatch, useUpSelector } from "../../../redux/store";
import {
  addToCartSlice,
  removeCartItems,
} from "../../../redux/futures/CartSlice";
const Cart: React.FC = () => {
  const { items } = useUpSelector((s) => s.card);
  const dispatch = useUpDispatch();
  const { cart: cartCheckout } = useUpSelector((s) => s.pizzaCart);
  localStorage.setItem("pizzaCart", JSON.stringify(cartCheckout));
  const obj = JSON.parse(localStorage.getItem("pizzaCart") || "{}");
  const deleteItems = (id: number) => {
    dispatch(removeCartItems(id));
  };
  return (
    <div className={scss.Cart}>
      <div className="container">
        <div className={scss.content}>
          <div className={scss.cart__item__title}>
            <p>Items</p>
            <p>Title</p>
            <p>price</p>
            <p>Quantity</p>
            <p>TotalPrice</p>
            <p>Plus</p>
            <p>Remove</p>
          </div>
          <br />
          <hr />
          {items.map((cart) => {
            if (obj[cart.id!] > 0) {
              return (
                <div
                  key={cart.id}
                  className={`${scss.cart__item__title} ${scss.cart__items__item}`}
                >
                  <img src={cart.img} alt="" />
                  <p>{cart.name}</p>
                  <p>{cart.price}</p>
                  <p>{obj[cart.id!]}</p>
                  <p>{cart.price * obj[cart.id!]}</p>
                  <p
                    style={{
                      cursor: "pointer",
                    }}
                    onClick={() => dispatch(addToCartSlice(cart.id!))}
                  >
                    +
                  </p>
                  <p
                    style={{
                      cursor: "pointer",
                    }}
                    onClick={() => deleteItems(cart.id!)}
                  >
                    -
                  </p>
                </div>
              );
            }
          })}
        </div>
      </div>
    </div>
  );
};

export default Cart;
