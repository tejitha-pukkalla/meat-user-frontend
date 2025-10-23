import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./Components/Header";
import Footer from "./Components/Footer";
import Body from "./Components/Body";
import UserLogin from "./Components/UserLogin";
import Profile from "./Components/Profile";
import { AuthProvider } from "./context/AuthContext"; // ✅ Adjust path if needed
import SubcategoryPage from "./Components/pages/SubcategoryPage";


function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Header /> {/* ✅ Always visible */}
        <Routes>
          <Route path="/" element={<Body />} />         {/* ✅ Homepage */}
          <Route path="/login" element={<UserLogin />} /> {/* ✅ Login page */}
          <Route path="/profile" element={<Profile />} /> {/* ✅ Profile page */}
           <Route path="/category/:categorySlug" element={<SubcategoryPage />} />
        </Routes>
        <Footer /> {/* ✅ Always visible */}
      </AuthProvider>
    </BrowserRouter>
  );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<App />);
