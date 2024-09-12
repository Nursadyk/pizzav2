import React from "react";
import Header from "./header/Header";
import { Outlet } from "react-router-dom";

const Layout: React.FC = () => {
  return (
    <div className="">
      <Header />
      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
