import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// Components
import Footer from "./components/Footer";

// Public
import LoginScreen from "./pages/public/LoginScreen";
import NotFound from "./pages/public/NotFound";
// Dashboard
import { AdminDashboard, GuestDashboard } from "./layouts";
import Products from "./components/crud/Products";
import Invitation from "./components/crud/Invitation";
import ShoppingCar from "./components/crud/ShoppingCar";
const App = () => {



  return (
    <main className="bg-[#F5F4F2]">
      <Router>
        <Routes>
          <Route path="/" element={<LoginScreen />} exact />
          <Route path="/admin/*" element={<AdminDashboard />} />
          <Route path="/guest/*" element={<GuestDashboard />} />
          <Route path="/login" element={<LoginScreen />} exact />
          <Route path="*" element={<NotFound />} exact />
          <Route path="/products" element={<Products />} exact />
          <Route path="/invitation" element={<Invitation />} exact />
          <Route path="/cart" element={<ShoppingCar />} exact />
        </Routes>
        <Footer />
      </Router>
    </main>
  );
};

export default App;
