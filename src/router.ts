import { createBrowserRouter } from "react-router-dom";
import Login from "./Pages/auth/Login";
import Dashboard from "./Pages/dashboard";
import Register from "./Pages/auth/Register";
import AuthGuard from "./Layout/AuthGuard";
import GuestGuard from "./Layout/GuestGuard";
import URLManagement from "./Pages/url-management";
import CrawlDetails from "./Pages/dashboard/CrawlDetails";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: GuestGuard,
    children: [
      { path: "", Component: Login },
      { path: "login", Component: Login },
      {
        path: "register",
        Component: Register,
      },
    ],
  },
  {
    path: "/dashboard",
    Component: AuthGuard,
    children: [
      {
        path: "",
        Component: Dashboard,
      },
      {
        path: "details",
        Component: CrawlDetails,
      },
      // {
      //   path: "overview",
      //   Component: Dashboard,
      //   children: [{ path: "details", Component: CrawlDetails }],
      // },
      { path: "url-management", Component: URLManagement },
    ],
  },
]);
