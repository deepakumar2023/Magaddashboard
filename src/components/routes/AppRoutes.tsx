import { Routes, Route } from "react-router";
// import AppLayout from "./layout/AppLayout";

import AppLayout from "../../layout/AppLayout"

import Home from "../../pages/Dashboard/Home";
import UserProfiles from "../../pages/UserProfiles";
import FormElements from "../../pages/Forms/FormElements";


import SignIn from "../../pages/AuthPages/SignIn";
import SignUp from "../../pages/AuthPages/SignUp";
import NotFound from "../../pages/OtherPage/NotFound";
import Board from "../../pages/master/Board";
import Category from "../../pages/master/Category";

function AppRoutes() {
  return (
     <Routes>
      {/* Dashboard Layout */}
      <Route element={<AppLayout />}>
        <Route index path="/" element={<Home />} />
        <Route path="/profile" element={<UserProfiles />} />
        <Route path="/form-elements" element={<FormElements />} />
        <Route path="/board" element={<Board />} />
        <Route path="/category" element={<Category />} />

        
      </Route>

      {/* Auth Layout */}
      <Route path="/signin" element={<SignIn />} />
      <Route path="/signup" element={<SignUp />} />

      {/* Fallback Route */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  )
}

export default AppRoutes