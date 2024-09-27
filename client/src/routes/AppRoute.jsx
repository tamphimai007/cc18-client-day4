import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Home from "../pages/Home";
import About from "../pages/About";
import Register from "../pages/auth/Register";
import Login from "../pages/auth/Login";
import Layout from "../layouts/Layout";
import Dashboard from "../pages/admin/Dashboard";
import Manage from "../pages/admin/Manage";
import AdminLayout from "../layouts/AdminLayout";
import UserLayout from "../layouts/UserLayout";
import HomeUser from "../pages/user/HomeUser";
import Unauthorization from "../pages/Unauthorization";
import PageNotFound from "../pages/PageNotFound";
import ProtectRoute from "./ProtectRoute";

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    children: [
      { index: true, element: <Home /> },
      { path: "about", element: <About /> },
      { path: "register", element: <Register /> },
      { path: "login", element: <Login /> },
      { path: "unauthorization", element: <Unauthorization /> },
      { path: "*", element: <PageNotFound /> },
    ],
  },
  {
    path: "/admin",
    element: <ProtectRoute element={<AdminLayout />} allow={["ADMIN"]} />,
    children: [
      { index: true, element: <Dashboard /> },
      { path: "manage", element: <Manage /> },
    ],
  },
  {
    path: "/user",
    element: <ProtectRoute element={<UserLayout />} allow={["USER","ADMIN"]} />,
    children: [{ index: true, element: <HomeUser /> }],
  },
]);
const AppRoute = () => {
  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
};

export default AppRoute;
