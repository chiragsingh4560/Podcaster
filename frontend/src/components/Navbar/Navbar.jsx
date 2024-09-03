import React, { useState } from "react";
import { Link } from "react-router-dom";
import podcastLogo from "./podcast_logo.png";
import { IoReorderThreeOutline } from "react-icons/io5";
import { RxCross2 } from "react-icons/rx";
import { useSelector } from "react-redux";
//fuck you
const Navbar = () => {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);
  // console.log(isLoggedIn);
  const [mobileNav, setmobileNav] = useState(false);

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Categories", path: "/categories" },
    { name: "All Podcasts", path: "/all-podcasts" },
  ];

  return (
    <nav className="px-4 md:px-8 lg:px-12 py-2 relative">
      <div className="flex items-center justify-between">
        <div className="logo brand-name w-2/6 flex items-center gap-4">
          {/* add both link and podcaster under home link so onclick they both land you on home page */}
          <Link to="/" className="flex items-center gap-4 text-2xl font-bold">
            <img src={podcastLogo} alt="podcast logo" className="h-14" />
            Podcaster
          </Link>
        </div>
        <div className="hidden w-2/6 lg:flex items-center justify-center">
          {navLinks.map((item, i) => (
            <Link
              key={i}
              to={item.path}
              className="ms-4 hover:font-semibold transition-all duration-300"
            >
              {item.name}
            </Link>
          ))}
        </div>
        <div className="hidden w-2/6 lg:flex items-center justify-end">
          {/* simple logic h if not logged in then only show login and signup , else show profile button */}
          {!isLoggedIn ? (
            <>
              <Link
                to="/login"
                className="px-6 py-3 border border-black rounded-full"
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="ms-4 px-6 py-3 bg-black text-white rounded-full"
              >
                Signup
              </Link>
            </>
          ) : (
            <>
              <Link
                to="/profile"
                className="ms-4 px-6 py-3 bg-black text-white rounded-full"
              >
                Profile
              </Link>
            </>
          )} 
        </div>
        <div className="w-4/6 flex items-center justify-end lg:hidden z-50">
          <button
            className={`text-4xl ${
              mobileNav ? "rotate-360" : "rotate-180"
            } transition-all duration-300`}
            onClick={() => setmobileNav(!mobileNav)}
          >
            {mobileNav ? <RxCross2 /> : <IoReorderThreeOutline />}
          </button>
        </div>
      </div>
      {/* mobile nav */}
      <div
        className={`fixed top-0 left-0 w-full h-screen bg-blue-100 ${
          mobileNav ? "translate-y-0" : "translate-y-[-100%]"
        } transition-all duration-500 ease-in-out`}
      >
        <div className="h-full flex flex-col items-center justify-center">
          {navLinks.map((item, i) => (
            <Link
              key={i}
              to={item.path}
              className="mb-12 text-3xl hover:font-semibold transition-all duration-300"
            >
              {item.name}
            </Link>
          ))}
          {!isLoggedIn ? (
            <>
              <Link
                to="/login"
                className="mb-12 text-3xl hover:font-semibold transition-all duration-300"
              >
                Login
              </Link>
              <Link
                to="/signup"
                className="mb-12 text-3xl hover:font-semibold transition-all duration-300"
              >
                Signup
              </Link>
            </>
          ) : (
            <>
              <Link
                to="/profile"
                className="mb-12 text-3xl hover:font-semibold transition-all duration-300"
              >
                Profile
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
