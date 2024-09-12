import React from "react";
import scss from "./userSettings.module.scss";
import { useUpDispatch, useUpSelector } from "../../redux/store";
import { changeSliderBackground } from "../../redux/futures/SettingSlice";
const UserSettings: React.FC = () => {
  const settingValue = useUpSelector((s) => s.setting.sliderColor);
  const dispatch = useUpDispatch();
  const handleGetColor = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(changeSliderBackground(e.target.value));
  };
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    localStorage.setItem("settingValue", JSON.stringify(settingValue));
  };
  return (
    <div className={scss.UserSettings}>
      <div className="container">
        <div className={scss.content}>
          <form onSubmit={handleSubmit}>
            <label htmlFor="favcolor">
              Select your Slider color:{settingValue}
            </label>
            <input
              type="color"
              value={settingValue}
              onChange={handleGetColor}
            />
            <p>
              <input type="submit" value="Submit" />
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UserSettings;
