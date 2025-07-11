import { createBrowserRouter } from "react-router-dom";
import UnprotectedLayout from "./Layout/UnprotectedLayout";
import Login from "./Pages/auth/Login";
import ProtectedLayout from "./Layout/ProtectedLayout";
import Dashboard from "./Pages/dashboard";
import Register from "./Pages/auth/Register";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: UnprotectedLayout,
    children: [
      { index: true, Component: Login },
      { path: "login", Component: Login },
      {
        path: "register",
        Component: Register,
      },
    ],
  },
  {
    path: "dashboard",
    Component: ProtectedLayout,
    children: [{ path: "home", Component: Dashboard }],
  },
]);
