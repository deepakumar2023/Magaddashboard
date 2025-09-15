import { BrowserRouter as Router } from "react-router";
import { ScrollToTop } from "./components/common/ScrollToTop";

import AppRoutes from  "./components/routes/AppRoutes"

export default function App() {
  return (
    <Router>
      <ScrollToTop />
      <AppRoutes />
    </Router>
  );
}
