import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import "../App.css";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [userError, setUserError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [isFirstTimeFired, setFirstTimeFired] = useState(false);
  function validation() {
    let validated = false;
    if (!username) {
      setUserError("*username is required");
    } else if (!password) {
      setPasswordError("*Password is required");
    } else {
      validated = true;
    }
    return validated;
  }
  useEffect(() => {
    if (isFirstTimeFired) {
      validation();
    }
  }, [username, password, isFirstTimeFired]);
  const navigate = useNavigate();
  function handleSubmit() {
    const validated = validation();
    setFirstTimeFired(true);
    if (validated) {
      if (username === "user@gmail.com" && password === "user@123") {
        localStorage.setItem("token", "123456");
        navigate("/homepage");
      } else {
        toast.error("username/password invalid");
      }
    }
  }
  return (
    <div className="h-[100vh]">
      <div className="container mx-auto">
        <h1 className="font-style text-4xl text-center mt-4 text-textColor">
          Who Stops You,let's have<span className="ml-1 text-orange-500">Some Food</span>
        </h1>
        <div className="w-full   flex justify-center ">
          <form className="bg-green p-24 w-full flex  flex-col items-center gap-4  shadow-xl rounded-xl">
            <div className="h-14 w-96  rounded-lg p-2 flex gap-2 bg-white ">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 mt-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                />
              </svg>
              <input
                required
                type="E-mail"
                className="w-full"
                placeholder="E-mail"
                onChange={(e) => {
                  setUsername(e.target.value);
                }}
                // value={username}
              />
            </div>
            <div className="text-red-600">{userError}</div>
            <div className="h-14 w-96 bg-white rounded-lg p-2 flex gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-6 w-6 mt-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth={2}
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
                />
              </svg>
              <input
                required
                className="w-full"
                placeholder="Password"
                type="password"
                onChange={(e) => {
                  setPassword(e.target.value);
                }}
                // value={password}
              />
            </div>
            <div className="text-red-600">{passwordError}</div>
            <div className="h-12 w-36 bg-orange-400 rounded-md flex justify-center items-center font-bold text-white  text-xl">
              <button
                onClick={() => {
                  handleSubmit();
                }}
              >
                <p className="font-extrabold">Login</p>
              </button>
            </div>
            <Link to={"/signup"}>
              New user Register here
            </Link>
          </form>
        </div>
      </div>
    </div>
  );
}
