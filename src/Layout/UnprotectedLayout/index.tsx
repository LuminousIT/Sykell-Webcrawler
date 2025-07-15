import { Outlet } from "react-router";
import Navbar from "./components/Navbar";

const UnprotectedLayout = () => {
  return (
    <div>
      <header>
        <Navbar />
      </header>
      <section id="main">
        <Outlet />
      </section>
    </div>
  );
};

export default UnprotectedLayout;
