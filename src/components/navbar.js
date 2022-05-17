import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { app } from "../firebase.config";
import { Link } from "react-router-dom";
import React, { useState } from "react";
import Logo from "./img/logo.png";
import { motion } from "framer-motion";
import { MdShoppingBasket, MdAdd, MdLogout } from "react-icons/md";
import Avatar from "./img/avatar.png";
// import { Link } from "react-router-dom";
import { useStateValue } from "../context/stateProvider";
import { actionType } from "../context/reducer";
export default function Navbar() {
  const firebaseAuth = getAuth(app);
  const provider = new GoogleAuthProvider();
  const [{ user }, dispatch] = useStateValue();
  const [isMenu, setIsMenu] = useState();
  const login = async () => {
    if (!user) {
      const {
        user: { refreshToken, providerData },
      } = await signInWithPopup(firebaseAuth, provider);
      dispatch({
        type: actionType.SET_USER,
        user: providerData[0],
      });
      localStorage.setItem("User", JSON.stringify(providerData[0]));
    } else {
      setIsMenu(!isMenu);
    }
  };
  const logout = () => {
    setIsMenu(false);
    localStorage.clear();
    dispatch({
      type: actionType.SET_USER,
      user: null,
    });
  };
  return (
    <header className="fixed z-50 w-full  p-3 px-8 md:p-6 md:px-6">
      <div className="hidden md:flex h-full w-full items-center justify-between ">
        <Link to={"/"} className="flex items-center">
          <img src={Logo} alt="logo" className="w-10 object-cover" />
          <p className="text-headingColor text-xl font-bold">City</p>
        </Link>
        <div className="flex items-center">
          <div className="flex items-center gap-6">
            <motion.ul
              initial={{ opacity: 0, x: 200 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 200 }}
              className="flex items-center gap-8"
            >
              <li className="text-base text-textColor hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer">
                Home
              </li>
              <li className="text-base text-textColor hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer ">
                Menu
              </li>
              <li className="text-base text-textColor hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer ">
                About Us
              </li>
              <li className="text-base text-textColor hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer">
                Services
              </li>
            </motion.ul>
            <div className="relative flex justify-center items-center">
              <MdShoppingBasket className="text-2xl ml-8 cursor-pointer " />
              <div className="absolute -top-3 -right-2 w-5 h-5 rounded-full bg-cartNumBg flex justify-center items-center">
                <p className="text-xs text-white font-semibold">8</p>
              </div>
            </div>
            <div className="relative">
              <motion.img
                whileTap={{ scale: 0.7 }}
                src={user ? user.photoURL : Avatar}
                className=" h-8 rounded-full drop-shadow-xl cursor-pointer"
                alt="user"
                onClick={login}
              />
              {isMenu && (
                <motion.div
                  initial={{ opacity: 0, sacle: 0.6 }}
                  animate={{ opacity: 1, sacle: 1 }}
                  exit={{ opacity: 0, sacle: 0.6 }}
                  className="w-40 bg-white rounded-lg flex flex-col absolute top-10 right-1 "
                >
                  {user && user.email === "parkashmi66@gmail.com" && (
                    <Link to={"/createItem"}>
                      <p className="flex items-center gap-3 px-4 py-2 cursor-pointer hover:bg-slate-100 hover:rounded-md transition-all duration-100 ease-in-out text-textColor text-base">
                        New Item <MdAdd />
                      </p>
                    </Link>
                  )}
                  <p
                    onClick={logout}
                    className="flex items-center gap-3 px-4 py-2 cursor-pointer hover:bg-slate-100 hover:rounded-md transition-all duration-100 ease-in-out text-textColor text-base"
                  >
                    Logout <MdLogout />
                  </p>
                </motion.div>
              )}
            </div>
          </div>
        </div>
      </div>
      <div className="flex justify-between items-center md:hidden  p-4">
        <div className="relative flex justify-center items-center">
          <MdShoppingBasket className="text-2xl ml-8 cursor-pointer " />
          <div className="absolute -top-3 -right-2 w-5 h-5 rounded-full bg-cartNumBg flex justify-center items-center">
            <p className="text-xs text-white font-semibold">8</p>
          </div>
        </div>
        <Link to={"/"} className="flex items-center">
          <img src={Logo} alt="logo" className="w-10 object-cover" />
          <p className="text-headingColor text-xl font-bold">City</p>
        </Link>
        <div className="relative">
          <motion.img
            whileTap={{ scale: 0.7 }}
            src={user ? user.photoURL : Avatar}
            className=" h-8 rounded-full drop-shadow-xl cursor-pointer"
            alt="user"
            onClick={login}
          />
          {isMenu && (
            <motion.div
              initial={{ opacity: 0, sacle: 0.6 }}
              animate={{ opacity: 1, sacle: 1 }}
              exit={{ opacity: 0, sacle: 0.6 }}
              className="w-40 bg-white rounded-lg flex flex-col absolute top-10 right-1 "
            >
              {user && user.email === "parkashmi66@gmail.com" && (
                <Link to={"/createItem"}>
                  <p className="flex items-center gap-3 px-4 py-2 cursor-pointer hover:bg-slate-100 hover:rounded-md transition-all duration-100 ease-in-out text-textColor text-base">
                    New Item <MdAdd />
                  </p>
                </Link>
              )}
              <ul className="flex flex-col  ">
                <li
                  onClick={() => {
                    setIsMenu(false);
                  }}
                  className="text-base text-textColor  px-4 py-2  hover:bg-slate-100 hover:rounded-md  hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer"
                >
                  Home
                </li>
                <li
                  onClick={() => {
                    setIsMenu(false);
                  }}
                  className="text-base text-textColor  px-4 py-2  hover:bg-slate-100 hover:rounded-md  hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer "
                >
                  Menu
                </li>
                <li
                  onClick={() => {
                    setIsMenu(false);
                  }}
                  className="text-base text-textColor  px-4 py-2   hover:bg-slate-100 hover:rounded-md  hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer "
                >
                  About Us
                </li>
                <li 
                onClick={()=>{
                  setIsMenu(false)
                }}
                className="text-base text-textColor  px-4 py-2  hover:bg-slate-100  hover:text-headingColor duration-100 transition-all ease-in-out cursor-pointer">
                  Services
                </li>
              </ul>
              <p
                onClick={logout}
                className="flex items-center gap-3 px-4 py-2 cursor-pointer hover:bg-slate-100 hover:rounded-md transition-all duration-100 ease-in-out text-textColor text-base"
              >
                Logout <MdLogout />
              </p>
            </motion.div>
          )}
        </div>
      </div>
    </header>
  );
}