import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css"; //toast css
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { authActions } from "../store/auth";
import ErrorPage from "./ErrorPage";
const Login = () => {
  //another react-redux hook used to update login status in store/auth.js
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // this use selector is another react-redux hook checks the state if it is logged in or not
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  const [Values, setValues] = useState({
    email: "",
    password: "",
  });
  const change = (e) => {
    const { name, value } = e.target;
    setValues({ ...Values, [name]: value });
  };
  const handleSubmit = async () => {
    try {
      const res = await axios.post(
        "http://localhost:3000/api/v1/sign-in", //login k route humne sign-in naam se banaya tha
        Values,
        { withCredentials: true }
      );
      // console.log(res.data);

      toast.success("Login Successful");
      //send the user to the profile page now after a time out
      console.log(isLoggedIn);
      setTimeout(() => {
        dispatch(authActions.login()); //dispath m authactions.login bhejde to login status true hojayega aisa
        navigate("/profile");
      }, 3000);
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };
  return (
    <>
      {isLoggedIn ? (
        <ErrorPage /> //mtlb already logged in ho to /login p show error pag
      ) : (
        <div className="h-screen bg-green-100 flex items-center justify-center">
          <ToastContainer position="top-center" draggable />
          <div className="w-4/6 md:w-3/6 lg:w-2/6 flex flex-col items-center justify-center">
            <Link to="/" className="text-2xl font-bold">
              PODCASTER
            </Link>
            <div className="mt-6 w-full">
              <div className="w-full flex flex-col mt-2">
                <label htmlFor="">Email</label>
                <input
                  type="email"
                  className="mt-2 px-2 py-2 rounded outline-none border border-black"
                  required
                  placeholder="Email"
                  name="email"
                  value={Values.email}
                  onChange={change}
                />
              </div>
              <div className="w-full flex flex-col mt-2">
                <label htmlFor="">Password</label>
                <input
                  type="password"
                  className="mt-2 px-2 py-2 rounded outline-none border border-black"
                  required
                  placeholder="Password"
                  name="password"
                  value={Values.password}
                  onChange={change}
                />
              </div>
              <div className="w-full flex flex-col mt-2">
                <button
                  onClick={handleSubmit}
                  className="bg-green-900 font-semibold text-xl text-white rounded py-2"
                >
                  Login
                </button>
              </div>
              <div className="w-full flex flex-col mt-2">
                <p>
                  Don't Have an account?{" "}
                  <Link
                    to={"/signup"}
                    className="font-semibold hover:text-blue-600"
                  >
                    Sign Up
                  </Link>
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Login;
