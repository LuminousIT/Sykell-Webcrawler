import React from "react";
import { Outlet } from "react-router";

const UnprotectedLayout = () => {
  return (
    <div>
      <section>App bar Unprotected</section>
      <Outlet />
    </div>
  );
};

export default UnprotectedLayout;
