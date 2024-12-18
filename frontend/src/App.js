import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { ToastContainer } from 'react-toastify';
// Components
import Footer from "./components/Footer";

// Public
import LoginScreen from "./pages/public/LoginScreen";
import NotFound from "./pages/public/NotFound";
// Dashboard
import { AdminDashboard, GuestDashboard } from "./layouts";
import Invitacion from "./pages/public/Invitacion";
import MesaRegalos from "./components/Mesa/MesaRegalos";
import Quiz from "./components/Quiz";
const App = () => {
  return (
    <main className="bg-[#F5F4F2]">
      <Router>
        <Routes>
          <Route path="/invitaciones/:idInvitado" element={<Invitacion />} exact />
          <Route path="/mesaderegalos/:idInvitado" element={<MesaRegalos/>} />
          <Route path="/quiz" element={<Quiz/>} />
          <Route path="/admin/*" element={<AdminDashboard />} />
          <Route path="/guest/*" element={<GuestDashboard />} />
          <Route path="/login" element={<LoginScreen />} exact />
          <Route path="*" element={<NotFound />} exact />
        </Routes>
        {/* <Footer /> */}
      </Router>
      <ToastContainer autoClose={1500} pauseOnHover={false} />
    </main>
  );
};

export default App;
