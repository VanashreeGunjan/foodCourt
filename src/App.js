import { Route, Routes } from "react-router-dom";
import "./App.css";
import { AnimatePresence } from "framer-motion";
import CreateContainer from "./components/create_container";
import MainContainer from "./components/main_container";
import Navbar from "./components/navbar";
import { useStateValue } from "./context/stateProvider";
import { getAllFoodItems } from "./utils/firebaseFunction";
import { useEffect, useState } from "react";
import { actionType } from "./context/reducer";
import { useNavigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Login from "./components/login";
import Signup from "./components/signup";

function App() {
  const [{ foodItems }, dispatch] = useStateValue();
  const fecthData = async () => {
    await getAllFoodItems().then((data) => {
      dispatch({
        type: actionType.SET_FOOD_ITEMS,
        foodItems: data,
      });
    });
  };
  useEffect(() => {
    fecthData();
  }, []);

  return (
    <AnimatePresence exitBeforeEnter>
      <div className="w-screen h-auto flex flex-col bg-primary">
        <Navbar />

        <main className="mt-20  md:mt-20 px-4 md:px-16 py-4 w-full">
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/signup" element={<Signup/>}/>
            <Route path="/homepage" element={<MainContainer />} />
            <Route path="/*" element={<MainContainer />} />
            <Route path="/createItem" element={<CreateContainer />} />
            <Route path="/home" element={<MainContainer />} />
          </Routes>
          <ToastContainer />
        </main>
      </div>
    </AnimatePresence>
  );
}

export default App;
