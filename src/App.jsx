import { useContext } from "react";
import { Routes, Route } from "react-router-dom";
import { UserContext } from "./context/user.context";
import Login from "./routes/Login/login.route";
import SignUp from "./routes/Signup/signup.route";
import Admin from "./routes/Admin/admin.route";

const App = () => {
  const { currentUser } = useContext(UserContext);
  return (
    <Routes>
      <Route index element={<Login />}></Route>
      <Route path="/sign-up" element={<SignUp />}></Route>
      {currentUser && <Route path="/admin" element={<Admin />}></Route>}
    </Routes>
  );
};

export default App;
