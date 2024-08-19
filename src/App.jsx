import { createContext, useState } from "react";
import { Route, BrowserRouter, Routes } from "react-router-dom";
import LoginPage from "./page/LoginPage.jsx";
import Home from "./page/Home.jsx";
import RegisterPage from "./page/RegisterPage.jsx";

export const AuthContext = createContext({});

function App() {
  const [token, setToken] = useState(null);

  return (
    <AuthContext.Provider value={{ token, setToken }}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/login" element={<LoginPage />}></Route>
          <Route path="/register" element={<RegisterPage />}></Route>
        </Routes>
      </BrowserRouter>
    </AuthContext.Provider>
  );
}

export default App;
