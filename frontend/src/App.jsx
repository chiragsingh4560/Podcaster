import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainLayout from "./layout/MainLayout";
import Home from "./pages/Home";
import AuthLayout from "./layout/AuthLayout";
import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import Categories from "./pages/Categories";
import Profile from "./pages/Profile";
import axios from "axios";
import { useDispatch } from "react-redux";
import { authActions } from "./store/auth";
import AddPodcast from "./pages/AddPodcast";
import AllPodcasts from "./pages/AllPodcasts";
import CategoriesPage from "./pages/CategoriesPage";
import Description from "./pages/Description";
const App = () => {
  const dispatch = useDispatch();

  // this useffect runs on start it is for remembering the user profile and keeping him logged in if we find its cookie present
  useEffect(() => {
    const fetch = async () => {
      const res = await axios.get("http://localhost:3000/api/v1/check-cookie", {
        withCredentials: true,
      });
      // console.log(res.data.message);
      if (res.data.message == true) {
        //means we find the cookie of the use so keep him logged in
        dispatch(authActions.login());
      }
    };
    fetch();
  }, []);

  return (
    <div>
      <Router>
        <Routes>
          {/* Nest the Home,categories component inside the MainLayout i.e inside navbar qki navbar rhega hi in teeno m */}
          <Route path="/" element={<MainLayout />}>
            <Route index element={<Home />} />
            <Route path="/categories" element={<Categories />} />
            <Route path="/profile" element={<Profile />} />
            <Route path="/add-podcast" element={<AddPodcast />} />
            <Route path="/all-podcasts" element={<AllPodcasts />} />
            <Route path="/categories/:cat" element={<CategoriesPage />} />
            <Route path="/description/:id" element={<Description />} />
          </Route>
          <Route path="/" element={<AuthLayout />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </Router>
    </div>
  );
};

export default App;
