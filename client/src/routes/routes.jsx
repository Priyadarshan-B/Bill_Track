import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "../pages/Login/Login";
import FormBill from "../pages/add_bill/form";
import Dashboard from "../pages/dashboard/dashboard";
import AppLayout from "../components/applayout/AppLayout";
import ProtectedRoute from "../components/utils/protectedRoute";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/login" element={<Login />} />

      <Route
        path="/*"
        element={
          // <ProtectedRoute>
          <AppLayout
            body={
              <Routes>
                <Route path="dashboard" element={<Dashboard />} />
                <Route path="add" element={<FormBill />} />
              </Routes>
            }
          />
          // </ProtectedRoute>
        }
      />
    </Routes>
  );
};

export default AppRoutes;
