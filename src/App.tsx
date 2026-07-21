import { Navigate, Route, Routes } from "react-router-dom";
import PollPage from "./pages/PollPage";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import { useSelector } from "react-redux";

const App = () => {

  return (
    <div>
      <Routes>
        <Route path="/" element={<PollPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </div>
  );
};

export default App;
