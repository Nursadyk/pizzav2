import axios from "axios";
import React, { ReactNode } from "react";
import { useLocation, useNavigate } from "react-router-dom";
interface IpropsChildren {
  children: ReactNode;
}
const url = import.meta.env.VITE_AUTH_URL;
const PrivateProvider: React.FC<IpropsChildren> = ({ children }) => {
  const [status, setStatus] = React.useState("pending");
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const accessToken = JSON.parse(String(localStorage.getItem("accessToken")));
  const refreshToken = JSON.parse(String(localStorage.getItem("refreshToken")));
  const check = async () => {
    try {
      const response = await axios.get(`${url}/auth/user`, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });
      if (response.status === 200) {
        setStatus("fulfilled");
      } else {
        setStatus("rejected");
      }
    } catch (error) {
      setStatus("rejected");
    }
  };
  const checkRefresh = async () => {
    const { data } = await axios.patch(`${url}/auth/refresh`, {
      refreshToken,
    });
    if (data) {
      localStorage.setItem("accessToken", JSON.stringify(data.accessToken));
      localStorage.setItem("refreshToken", JSON.stringify(data.refreshToken));
    }
  };
  const handleNavigation = async () => {
    if (refreshToken && status === "rejected") {
      await checkRefresh();
    }
    switch (pathname) {
      case "/auth/sign-in":
      case "/auth/sign-up":
        if (status === "fulfilled") {
          navigate("/");
        }
        break;
      case "/":
      case "/userSettings":
      case "/cart":
        if (status === "rejected") {
          navigate("/auth/sign-in");
        }
        break;
      default:
        break;
    }
  };
  React.useEffect(() => {
    check();
    handleNavigation();
  }, [status, pathname, navigate]);
  return children;
};

export default PrivateProvider;
