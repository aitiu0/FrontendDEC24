import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
// Components
import Footer from "./components/Footer";

// Public
import LoginScreen from "./pages/public/LoginScreen";
import NotFound from "./pages/public/NotFound";
import InvitationScreen from './pages/public/InvitationScreen.jsx'
import GiftsTableScreen from './pages/public/GiftsTableScreen.jsx'
import QuizScreen from './pages/public/QuizScreen.jsx'
// Dashboard
import { AdminDashboard, GuestDashboard } from "./layouts";
const App = () => {
  return (
    <main className="bg-[#F5F4F2]">
      <Router>
        <Routes>
          <Route path="/invitaciones/:idInvitado" element={<InvitationScreen />} exact />
          <Route path="/mesaderegalos/:idInvitado" element={<GiftsTableScreen />} exact />
          <Route path="/quiz/:idInvitado" element={<QuizScreen />} exact />
          <Route path="/admin/*" element={<AdminDashboard />} />
          <Route path="/guest/*" element={<GuestDashboard />} />
          <Route path="/login" element={<LoginScreen />} exact />
          <Route path="*" element={<NotFound />} exact />
        </Routes>
      </Router>
    </main>
  );
};

export default App;
