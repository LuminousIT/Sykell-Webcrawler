import React from "react";
import { Outlet } from "react-router";

const ProtectedLayout = () => {
  return (
    <div>
      <section>App bar Protected</section>
      <Outlet />
    </div>
  );
};

export default ProtectedLayout;
