import { createContext, useEffect, useState } from "react";
import { Route, BrowserRouter, Routes } from "react-router-dom";
import LoginPage from "./page/LoginPage.jsx";
import Home from "./page/Home.jsx";
import RegisterPage from "./page/RegisterPage.jsx";
import SendVideo from "./page/SendVideo.jsx";

export const AuthContext = createContext({});

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState();

  const [user, setUser] = useState(null);

  useEffect(() => {
    setIsLoading(true);
    fetch("http://localhost:3000/auth/check-session", {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((data) => {
        setIsAuthenticated(data.isAuthenticated);
        // setUser(data.user);
      })
      .catch((err) => console.log(err))
      .finally(() => setIsLoading(false));
  }, []);

  return (
    <AuthContext.Provider
      value={{
        setUser,
        user,
        isAuthenticated,
        setIsAuthenticated,
        isLoading,
      }}
    >
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />}></Route>
          <Route path='/login' element={<LoginPage />}></Route>
          <Route path='/register' element={<RegisterPage />}></Route>
          <Route path='/sendvideo' element={<SendVideo />}></Route>
        </Routes>
      </BrowserRouter>
    </AuthContext.Provider>
  );
}

export default App;
