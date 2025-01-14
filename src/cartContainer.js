import React, { useState, useEffect } from "react";
import { MdOutlineKeyboardBackspace } from "react-icons/md";
import { motion } from "framer-motion";
import { RiRefreshFill } from "react-icons/ri";
import { BiPlus, BiMinus } from "react-icons/bi";
import { useStateValue } from "./context/stateProvider";
import { actionType } from "./context/reducer";
import EmptyCart from "../src/components/img/emptyCart.svg";
import CartItem from "./cartItem";
import Payment from "./components/payment";

export default function CartContainer() {
  const [{ cartShow, cartItems, user }, dispatch] = useStateValue();
  const [tot, setTot] = useState(0);
  const [flag, setFlag] = useState(1);
  const showCart = () => {
    dispatch({
      type: actionType.SET_CART_SHOW,
      cartShow: !cartShow,
    });
  };
  useEffect(() => {
    let totalPrice = cartItems.reduce(function (accumulator, item) {
      return accumulator + item.qty * item.price;
    }, 0);
    setTot(totalPrice);
  }, [tot, flag]);

  const clearCart=()=>{
    dispatch({
      type:actionType.SET_CART_ITEMS,
      cartItems:[],
    });
    localStorage.setItem("cartItems",JSON.stringify([]))
  }
 const tokenValue= localStorage.getItem('token')
 console.log('token Value is ',tokenValue)

  return (
    <motion.div
      className="fixed top-0 right-0 w-full md:w-375 h-screen bg-white drop-shadow-md  flex flex-col z-[101]"
      initial={{ opacity: 0, x: 200 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 200 }}
    >
      <div className="w-full flex items-center justify-between p-4 cursor-pointer">
        <motion.div whileTap={{ scale: 0.75 }} onClick={showCart}>
          {" "}
          <MdOutlineKeyboardBackspace className="text-textColor" />
        </motion.div>
        <p  
        onClick={clearCart}
        className="text-textColor text-lg font-semibold">Cart</p>
        <motion.p className="flex items-center gap-2 p-1 px-2 my-2 bg-gray-100 rounded-md hover:shadow-md duration-100 ease-in-out transition-all cursor-pointer text-textColor text-base">
          Clear <RiRefreshFill />
        </motion.p>
      </div>
      {cartItems && cartItems.length > 0 ? (
        <div className="w-full h-full bg-cartBg rounded-t-[2rem] flex flex-col">
          <div className="w-full h-340 md:h-42 px-6 py-10 flex flex-col gap-3 overflow-y-scroll scrollbar-none">
            {cartItems &&
              cartItems.map((item) => <CartItem key={item.id} item={item} setFlag={setFlag} flag={flag}/>)}
          </div>
          <div className="w-full flex-1 bg-cartTotal rounded-t-[2rem] flex flex-col items-center justify-evenly px-8 py-2">
            <div className="w-full flex items-center justify-between">
              <p className="text-gray-400 text-lg">Sub Total</p>
              <p className="text-gray-400 text-lg">${tot}</p>
            </div>
            <div className="w-full flex items-center justify-between">
              <p className="text-gray-400 text-lg">Delievery</p>
              <p className="text-gray-400 text-lg">$2.5</p>
            </div>
            <div className="w-full border-b border-gray-600 my-2"></div>
            <div className="w-full flex items-center justify-between">
              <p className="text-gray-200 text-xl font-semibold">Total</p>
              <p className="text-gray-200 text-xl font-semibold">
                ${tot + 2.5}
              </p>
            </div>
            {tokenValue ? (
            <Payment total={tot}/>
            ) : (
              <motion.button
                whileTap={{ scale: 0.8 }}
                type="button"
                className="w-full p-2 rounded-full bg-orange-600  bg-gradient-to-tr from-orange-400 to-orange-600 text-gray-50 text-lg my-2 hover:shadow-lg "
              >
                Login to Check
              </motion.button>
            )}
          </div>
        </div>
      ) : (
        <div className="w-full h-full  flex flex-col items-center justify-center gap-6">
          <img src={EmptyCart} className="w--300" alt="alt" />
          <p className="text-xl text-textColor font-semibold">
            Add some items to your Cart
          </p>
        </div>
      )}
    </motion.div>
  );
}
