import React from "react";
import { useSelector } from "react-redux";
import ErrorPage from "./ErrorPage";
import Header from "../components/Profile/Header";
import YourPodcast from "../components/Profile/YourPodcast";
const Profile = () => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  return (
    <div>
      <>
        {!isLoggedIn ? (
          <ErrorPage />
        ) : (
          <div>
            {/* header m hi profile rkha h apn ne */}
            <Header />
            <YourPodcast />
          </div>
        )}
      </>
    </div>
  );
};

export default Profile;
