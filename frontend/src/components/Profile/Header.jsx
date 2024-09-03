import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { authActions } from "../../store/auth";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; //toast css
const Header = () => {
  //authActions and dispatcb to set the isLoggedIn false in auth.js
  // useNavigate to send the user from page profile to home after logging out
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  // useEffect for fetching user details to display in profile while mounting
  useEffect(() => {
    const fetchUserDetails = async () => {
      // fetch from our user-details route
      const res = await axios.get("http://localhost:3000/api/v1/user-details", {
        withCredentials: true,
      });
      console.log(res.data.user);
      setUser(res.data.user);
    };
    fetchUserDetails();
  }, []);

  // we have a route named /logout usme we are just clearing the cookie thats it! simple
  const handleLogOut = async () => {
    try {
      const res = await axios.post(
        "http://localhost:3000/api/v1/logout",
        {},
        {
          withCredentials: true,
        }
      );
      // console.log(res.data.message);
      toast.success("Logged Out Successfully");
      setTimeout(() => {
        dispatch(authActions.logout()); // Update the Redux state to set isLoggedIn to false
        navigate("/"); // Navigate to home page
      }, 3000);
    } catch (error) {
      toast.error("Error Logging Out");
    }
  };

  return (
    <>
      {!user ? (
        <div>Loading Data Please Wait!!!</div>
      ) : (
        <div className="bg-green-900 rounded py-8 flex flex-col md:flex-row items-center justify-center gap-4 md:justify-between px-4 lg:px-12">
          <ToastContainer position="top-center" draggable />
          <div className="flex flex-col items-center md:items-start">
            <p className="text-zinc-300 ">Profile</p>
            <h1 className="text-3xl md:text-4xl lg:text-5xl text-zinc-100 font-bold text-center">
              {user.username}
            </h1>
            <p className="text-zinc-300 mt-1">{user.email}</p>
          </div>
          <div>
            <button
              onClick={handleLogOut}
              className="bg-white px-4 py-2 rounded text-zinc-800 font-semibold hover:shadow-xl transition-all duration-300"
            >
              Logout
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Header;
