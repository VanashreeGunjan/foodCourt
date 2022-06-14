import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";

export default function Signup() {
  const [userDetails, setUserDetails] = useState({
    username: "",
    email: "",
    setPassword: "",
    confirmpassword: "",
  });
  const handleSignupSubmit = () => {
    const userVariable = userDetails;
    console.log("userinformation are", userVariable);
  };
  return (
    <div className="h-[100vh]">
      <div className="container mx-auto">
        <div className="w-full   flex justify-center ">
          <form className="bg-green p-24 w-full flex  flex-col items-center gap-4  shadow-xl rounded-xl">
            <div className="h-14 w-96  rounded-lg p-2 flex gap-2 bg-white ">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                class="h-6 w-6 mt-2"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                stroke-width="2"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
              <input
                required
                type="E-mail"
                name="username"
                className="w-full"
                placeholder="Username"
                onChange={(e) =>
                  setUserDetails({
                    ...userDetails,
                    [e.target.name]: e.target.value,
                  })
                }
              />
            </div>
            {/* <div className="text-red-600">{error}</div> */}
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
                // value={username}
                name="email"
                onChange={(e) =>
                  setUserDetails({
                    ...userDetails,
                    [e.target.name]: e.target.value,
                  })
                }
              />
            </div>
            {/* <div className="text-red-600">{error}</div> */}
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
                placeholder="Set Password"
                type="password"
                name="setPassword"
                onChange={(e) =>
                  setUserDetails({
                    ...userDetails,
                    [e.target.name]: e.target.value,
                  })
                }
              />
            </div>
            {/* <div className="text-red-600">{error}</div> */}
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
                placeholder="Confirm Password"
                type="password"
                name="confirmPassword"
                onChange={(e) =>
                  setUserDetails({
                    ...userDetails,
                    [e.target.name]: e.target.value,
                  })
                }
              />
            </div>
            {/* <div className="text-red-600">{error}</div> */}
            <div className="h-12 w-36 bg-orange-400 rounded-md flex justify-center items-center font-bold text-white  text-xl">
              <button onClick={handleSignupSubmit}>
                <p className="font-extrabold">Signup</p>
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
