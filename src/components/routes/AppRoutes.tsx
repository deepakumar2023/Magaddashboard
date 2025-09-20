import { Routes, Route } from "react-router";
import AppLayout from "../../layout/AppLayout";

import Home from "../../pages/Dashboard/Home";
import UserProfiles from "../../pages/UserProfiles";


import SignIn from "../../pages/AuthPages/SignIn";
import SignUp from "../../pages/AuthPages/SignUp";
import NotFound from "../../pages/OtherPage/NotFound";
import Board from "../../pages/master/board/GetBoard";
import Category from "../../pages/master/category/GetCategory";
import College from "../../pages/master/college/GetCollege";
import Religion from "../../pages/master/relegion/GetReligion";
import ProtectedRoute from "../routes/ProtectedRoute"; // ✅ Import ProtectedRoute
import Boardform from "../common/Boardform";
import EditBoardForm from "../../pages/master/board/EditFormBoard";
import CategoryAddform from "../../pages/master/category/Categoryform";
import EditCategoryForm from "../../pages/master/category/EditFormCategory";
import CollegeAddForm from "../../pages/master/college/CollegeAddform";
import CollegeDetailCard from "../../pages/master/college/CollegeDetails";
import SubCategoryAddForm from "../../pages/master/subcategory/AddSubCategory";
import ReligionAddForm from "../../pages/master/relegion/ReligionAddform";
import EditReligionForm from "../../pages/master/relegion/EditReligionForm";
import SubCategoryPage from "../../pages/master/subcategory/Getsubcategory";


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
          <Route path="/form" element={<Boardform />} />
          <Route path="/board/edit/:id" element={<EditBoardForm />} />
          <Route path="/category" element={<Category />} />
          <Route path="/add-category-form" element={<CategoryAddform />} />
          <Route path="/category/edit/:id" element={<EditCategoryForm />} />
          <Route path="/college" element={<College />} />
          <Route path="/add-college-form" element={<CollegeAddForm />} />
          <Route path="/college/:id" element={<CollegeDetailCard />} />
          <Route path="/religion" element={<Religion />} />
          <Route path="/add-religion-form" element={<ReligionAddForm />} />
          <Route path="/religion/edit/:id" element={<EditReligionForm />} />
          <Route path="/subcategory" element={<SubCategoryPage />} />
          <Route path="/add-subcategory" element={<SubCategoryAddForm />} />
        </Route>
      </Route>

      {/* 404 Fallback */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default AppRoutes;
