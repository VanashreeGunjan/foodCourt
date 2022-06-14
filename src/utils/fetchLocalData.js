export const FetchUser = () => {
  const userInfo =
    localStorage.getItem("User") !== "undefined"
      ? JSON.parse(localStorage.getItem("User"))
      : localStorage.clear();

  return userInfo;
};

export const FetchCart = () => {
  const cartInfo =
    localStorage.getItem("cartItems") !== "undefined"
      ? JSON.parse(localStorage.getItem("cartItems"))
      : localStorage.clear();

  return cartInfo ? cartInfo : [];
};
