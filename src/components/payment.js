import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function Payment({ total }) {
  const [amount, setAmount] = useState("");
  const handleSubmit = () => {
    setAmount(total);

      var options = {
        key: "rzp_test_bX3kihGFA0pOlT",
        key_secret: "6Qv7vwEvh7y1PiPMxDuKuorK",
        amount: amount * 100,
        currency: "INR",
        name: "STARTUP_PROJECTS",
        description: "for testing purpose",
        handler: function (response) {
          alert(response.razorpay_payment_id);
        },
        prefill: {
          name: "vakanda",
          email: "vakandaforever@gmail.com",
          contact: "9463302840",
        },
        notes: {
          address: "Razorpay Cooperaate office",
        },
        theme: {
          color: "#3399cc",
        },
      };
      var pay = new window.Razorpay(options);
      pay.open();
    }
  return (
    <div>
      <motion.button
        whileTap={{ scale: 0.8 }}
        type="button"
        className="w-full p-2 rounded-full bg-orange-600  bg-gradient-to-tr from-orange-400 to-orange-600 text-gray-50 text-lg my-2 hover:shadow-lg "
        onClick={handleSubmit}
      >
        CheckOut
      </motion.button>
    </div>
  );
}
