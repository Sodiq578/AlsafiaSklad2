import axios from "axios";
import { useEffect, useState } from "react";
import Login from "../components/auth/login/Login";
import { MainLayout } from "../layouts/MainLayout";
import { ProductsPage } from "../components/home/Home";
import { Staff } from "../components/employees/Employees";
import { Products } from "../components/products/Products";
import { NotFound } from "../components/notfound/Notfound";
import { DefaultPage } from "../components/default/Default";
import { UserProfile } from "../components/employee/Employee";
import { Routes, Route, useNavigate } from "react-router-dom";
import { ProductPage } from "../components/product/ProductPage";
import { AddProduct } from "../components/products/create/AddProduct";
// import { ProfileMe } from "../components/profile/Profile";

export const Router = () => {
  const navigate = useNavigate();
  const [access, setAccess] = useState();

  useEffect(() => {
    checkAuth();
  }, []);

  async function checkAuth() {
    try {
      let { data } = await axios.get("/auth/check");
      setAccess(true);
    } catch (error) {
      setAccess(false);
    }
  }

  useEffect(() => {
    if (access === false) {
      refreshToken();
    }
  }, [access]);

  async function refreshToken() {
    try {
      let data = await axios.post("/auth/refresh/token");
      console.log(data);
      // return navigate("/auth/login");
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div>
      <Routes>
        <Route path="/" element={<DefaultPage />} />
        <Route path="/auth/login" element={<Login access={access} />} />
        <Route element={<MainLayout />}>
          <Route path="/employees" element={<Staff />} />
          <Route path="/home" element={<ProductsPage />} />
          <Route path="/dashboard" element={<Products />} />
          <Route path="/product/:id" element={<ProductPage />} />
          <Route path="/employee/:id" element={<UserProfile />} />
          <Route path="/product/create" element={<AddProduct />} />
          <Route path="/*" element={<NotFound />} />
        </Route>
      </Routes>
    </div>
  );
};
