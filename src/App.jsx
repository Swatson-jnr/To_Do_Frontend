import { Routes, Route } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import Home from "./pages/Home";
import Login from "./pages/Login";
import VerifyEmail from "./pages/VerifyEmail";
import PasswordReset from "./pages/PasswordReset";

const App = () => {
  return (
    <div>
      <ToastContainer />
      <Routes>
        {/* Auth routes */}
        <Route path="/login" element={<Login />} />
        <Route path="/password-reset" element={<PasswordReset />} />
        <Route path="/verify-mail" element={<VerifyEmail />} />

        {/* user Routes */}
        <Route path="/" element={<Home />} />
      </Routes>
    </div>
  );
};

export default App;
