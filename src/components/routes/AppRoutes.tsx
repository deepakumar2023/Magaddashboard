import { Routes, Route } from "react-router";
import AppLayout from "../../layout/AppLayout";

import Home from "../../pages/Dashboard/Home";
import UserProfiles from "../../pages/UserProfiles";


import SignIn from "../../pages/AuthPages/SignIn";
import SignUp from "../../pages/AuthPages/SignUp";
import NotFound from "../../pages/OtherPage/NotFound";
import Board from "../../pages/master/board/getBoard";
import Category from "../../pages/master/Category";

import ProtectedRoute from "../routes/ProtectedRoute"; // ✅ Import ProtectedRoute

function AppRoutes() {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/" element={<SignIn />} />
      <Route path="/signup" element={<SignUp />} />

      {/* Protected Routes */}
      <Route element={<ProtectedRoute />}>
        <Route element={<AppLayout />}>
          <Route path="/dashboard" element={<Home />} />
          <Route path="/profile" element={<UserProfiles />} />
          <Route path="/board" element={<Board />} />
          <Route path="/category" element={<Category />} />
        </Route>
      </Route>

      {/* 404 Fallback */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default AppRoutes;
