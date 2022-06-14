import { FetchCart, FetchUser } from "../utils/fetchLocalData";

const userInfo = FetchUser();
const cartInfo = FetchCart();
export const initialState = {
  user: userInfo,
  foodItems: null,
  cartShow: false,
  cartItems: cartInfo,
};
