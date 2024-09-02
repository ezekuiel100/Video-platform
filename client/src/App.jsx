import { createContext, useEffect, useState } from "react";
import { Route, BrowserRouter, Routes } from "react-router-dom";
import LoginPage from "./page/LoginPage.jsx";
import Home from "./page/Home.jsx";
import RegisterPage from "./page/RegisterPage.jsx";
import UploadVideo from "./page/UploadVideo.jsx";
import VideoPage from "./page/VideoPage.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";

export const AuthContext = createContext({});

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState();
  const [isLoading, setIsLoading] = useState();
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user_data"))
  );

  useEffect(() => {
    setIsLoading(true);
    fetch("http://localhost:3000/auth/check-session", {
      credentials: "include",
    })
      .then((res) => {
        if (!res.ok) {
          return null;
        }
        return res.json();
      })
      .then((data) => {
        if (!data) {
          setIsAuthenticated(false);

          return null;
        }
        setIsAuthenticated(data.isAuthenticated);
      })
      .catch((error) => console.log(error))
      .finally(() => {
        setIsLoading(false);
      });
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
          <Route
            path='/sendvideo'
            element={<ProtectedRoute element={<UploadVideo />} />}
          ></Route>
          <Route path='/video/:id' element={<VideoPage />}></Route>
          <Route path='*' element={<div>Page not found</div>}></Route>
        </Routes>
      </BrowserRouter>
    </AuthContext.Provider>
  );
}

export default App;
