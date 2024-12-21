import React from "react";
import { Routes, Route } from "react-router-dom";
import Login from "../pages/Login/Login";
import BillManager from "../pages/add_bill/bill";
import Dashboard from "../pages/dashboard/dashboard";
import AllBills from "../pages/all_bills/all_bills";
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
                <Route path="add" element={<BillManager />} />
                <Route path="bills" element={<AllBills />} />
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
