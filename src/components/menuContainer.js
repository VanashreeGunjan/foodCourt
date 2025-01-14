import React, { useEffect } from "react";
import { IoFastFood } from "react-icons/io5";
import { useState } from "react";
import { categories } from "./data";
import RowContainer from "./RowContainer";
import { useStateValue } from "../context/stateProvider";

export default function MenuContainer() {
  const [filter, setFilter] = useState("chicken");
  const [{ foodItems }, dispatch] = useStateValue();
  useEffect(()=>{},[filter])
  return (
    <section className="w-full my-6" id="menu">
      <div className="w-full flex flex-col items-center justify-center">
        <p className="text-2xl font-semibold capitalize text-headingColor relative before:absolute before:rounded-lg before:content before:w-32 before:h-1 before:-bottom-2 before:left-0 before:bg-gradient-to-tr from-orange-500 to-orange-600 transition-all ease-in-out duration-100 mr-auto">
          Our Hot Dishes
        </p>
        <div className="w-full flex items-center justify-start lg:justify-center gap-8 py-6 overflow-x-scroll scrollbar-none">
          {categories &&
            categories.map((category) => (
              <div
                key={category.id}
                className={`group bg-card hover:bg-red-600 w-24 min-w-[94px] h-28 cursor-pointer drop-shadow-xl flex flex-col gap-3 items-center justify-center duration-150 transition-all ease-in-out`}
                onClick={()=>setFilter(category.urlName)}
              >
                <div className="w-10 h-10 rounded-full bg-red-600 group-hover:bg-card flex items-center justify-center">
                  <IoFastFood className="text-card group-hover:text-textColor text-lg" />
                </div>
                <p className="text-sm text-textColor group-hover:text-card">
                  {category.name}
                </p>
              </div>
            ))}
        </div>
        <div className="w-full  ">
          <RowContainer flag={false}  data={foodItems?.filter(item=>item.category===filter)}/>
        </div>
      </div>
    </section>
  );
}
