import React from "react";
import scss from "./HomeSection.module.scss";
const HomeSection: React.FC = () => {
  const [slider, setSlider] = React.useState(0);
  const settingValue = JSON.parse(String(localStorage.getItem("settingValue")));
  const slides = [
    "https://static.vecteezy.com/system/resources/previews/032/159/522/non_2x/sliced-piece-of-pizza-with-a-splash-of-ingredients-and-spices-isolated-on-white-background-ai-generated-photo.jpg",
    "https://static.vecteezy.com/system/resources/previews/032/155/434/non_2x/sliced-piece-of-pizza-with-a-splash-of-ingredients-and-spices-isolated-on-white-background-ai-generated-photo.jpg",
  ];
  React.useEffect(() => {
    const time = setTimeout(() => {
      setSlider((prev) => (prev === 1 ? (prev = 0) : prev + 1));
    }, 3000);
    return () => {
      clearInterval(time);
    };
  }, [slider]);
  return (
    <div className={scss.HomeSection}>
      <div className={scss.content}>
        <div
          className={scss.overlay}
          style={{ backgroundColor: settingValue }}
        ></div>
        <img src={slides[slider]} alt="home" />
      </div>
    </div>
  );
};

export default HomeSection;
