export const FetchUser = () => {
  const userInfo =
    localStorage.getItem("User") !== "undefined"
      ? JSON.parse(localStorage.getItem("User"))
      : localStorage.clear();

  return userInfo;
};
