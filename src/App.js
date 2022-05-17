import { Route, Routes } from "react-router-dom";
import "./App.css";
import { AnimatePresence } from "framer-motion";
import CreateContainer from "./components/create_container";
import MainContainer from "./components/main_container";
import Navbar from "./components/navbar";
import { useStateValue } from "./context/stateProvider";
import { getAllFoodItems } from "./utils/firebaseFunction";
import { useEffect } from "react";

function App() {
  const [dispatch] = useStateValue();
  const fecthData = async () => {
    await getAllFoodItems().then((data) => {
      console.log(data);
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
            <Route path="/*" element={<MainContainer />} />
            <Route path="/createItem" element={<CreateContainer />} />
          </Routes>
        </main>
      </div>
    </AnimatePresence>
  );
}

export default App;
