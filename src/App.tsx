import { BrowserRouter as Router } from "react-router";
import { ScrollToTop } from "./components/common/ScrollToTop";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


import AppRoutes from  "./components/routes/AppRoutes"

export default function App() {


  return (
    <Router>
      <ScrollToTop />
      <AppRoutes />
      <ToastContainer position="top-center" autoClose={3000} />
    </Router>
  );
}
