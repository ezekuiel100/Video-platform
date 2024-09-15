import { createContext, useEffect, useState } from "react";
import { Route, BrowserRouter, Routes } from "react-router-dom";
import LoginPage from "./page/LoginPage.jsx";
import Home from "./page/Home.jsx";
import RegisterPage from "./page/RegisterPage.jsx";
import UploadVideo from "./page/UploadVideo.jsx";
import VideoPage from "./page/VideoPage.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import CheckSession from "./components/CheckSession.jsx";
import ChannelPage from "./page/ChannelPage.jsx";
import CreateChannel from "./page/CreateChannel.jsx";
import GuestRoute from "./components/GuestRoute.jsx";

export const AuthContext = createContext({});

function App() {
  const [user, setUser] = useState();

  return (
    <AuthContext.Provider
      value={{
        setUser,
        user,
      }}
    >
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Home />}></Route>
          <Route path='/login' element={<LoginPage />}></Route>
          <Route
            path='/register'
            element={<GuestRoute element={<RegisterPage />} path={"/"} />}
          ></Route>

          <Route
            path='/sendvideo'
            element={
              <ProtectedRoute element={<UploadVideo />} path={"/login"} />
            }
            login
          ></Route>
          <Route path='/createchannel' element={<CreateChannel />}></Route>
          <Route path='/video/:id' element={<VideoPage />}></Route>
          <Route path='/channel/:id' element={<ChannelPage />}></Route>
          <Route path='*' element={<div>Page not found</div>}></Route>
        </Routes>
        <CheckSession />
      </BrowserRouter>
    </AuthContext.Provider>
  );
}

export default App;
