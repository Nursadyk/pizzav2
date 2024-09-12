import React from "react";
import scss from "./Header.module.scss";
import { useNavigate, Link } from "react-router-dom";
import SearchBlock from "../../searchBlock";
import axios from "axios";
import { useUpSelector } from "../../../../redux/store";
interface IpropsHeader {}
const Header: React.FC<IpropsHeader> = () => {
  const [userData, setUserData] = React.useState<IprofileUser>();
  const [selectImg, setSelectImg] = React.useState(false);
  const [isOpenSettings, setIsOpenSettings] = React.useState(false);
  const closeProfileRef = React.useRef<HTMLSpanElement | null>(null);
  const cart = useUpSelector((s) => s.pizzaCart.cart);
  const items = useUpSelector((s) => s.card.items);
  const online = navigator.onLine;
  const navigate = useNavigate();
  const handleToCart = () => {
    navigate("/cart");
  };
  const filteredItem = items.filter((el) => cart[el.id!] > 0);
  console.log(filteredItem);
  React.useEffect(() => {
    const getUser = async () => {
      try {
        const { data } = await axios.get(
          `${import.meta.env.VITE_AUTH_URL}/auth/user`,
          {
            headers: {
              Authorization: `Bearer ${JSON.parse(
                String(localStorage.getItem("accessToken"))
              )}`,
            },
          }
        );
        setUserData(data);
      } catch (error) {
        console.log(error);
      }
    };
    getUser();
    const handleCloseUserProfile = (e: MouseEvent) => {
      if (!e.composedPath().includes(closeProfileRef.current!)) {
        setIsOpenSettings(false);
      }
    };
    document.body.addEventListener("click", handleCloseUserProfile);
    const handleChooseImg = () => {
      setSelectImg(window.innerWidth < 768);
    };
    handleChooseImg();
    window.addEventListener("resize", handleChooseImg);
    return () => {
      document.removeEventListener("click", handleCloseUserProfile);
      window.removeEventListener("resize", handleChooseImg);
    };
  }, []);
  const handleLogout = () => {
    localStorage.clear();
    window.location.reload();
  };
  return (
    <header className={scss.header}>
      <div className="container">
        <div className={scss.header__inner}>
          <Link to={"/"} className={scss.logo}>
            {!selectImg ? (
              <img src="img/logo.svg" alt="" />
            ) : (
              <img src="img/media-logo.svg" />
            )}
          </Link>
          <SearchBlock />
          <div className={scss.buttons}>
            <button onClick={handleToCart}>
              <span className={scss.total__price}>
                {filteredItem.reduce((acc, el) => acc + el.price, 0)}R
              </span>
              <img src="img/divide-line.svg" alt="" />
              <div className={scss.basket_img}>
                <img src="img/basketImg.svg" alt="" />
                <span>
                  {Object.keys(cart).filter((el) => cart[el!] > 0).length}
                </span>
              </div>
            </button>
            {
              <div className={scss.user_profile}>
                <div
                  className={
                    online ? `${scss.online} ${scss.active}` : `${scss.online}`
                  }
                ></div>
                <img
                  className={scss.user_profile_image}
                  src={userData?.profile.photo}
                  alt={userData?.profile.username}
                />
                <span
                  ref={closeProfileRef}
                  onClick={() => setIsOpenSettings((prev) => !prev)}
                  className="material-symbols-outlined"
                >
                  arrow_drop_down
                </span>
                <div
                  className={
                    isOpenSettings
                      ? `${scss.settings} ${scss.active}`
                      : `${scss.settings}`
                  }
                >
                  <Link
                    to="userSettings"
                    onClick={() => setIsOpenSettings(false)}
                  >
                    settings
                  </Link>
                  <a>dark</a>
                  <button onClick={handleLogout} className={scss.logout}>
                    log out
                  </button>
                </div>
              </div>
            }
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
