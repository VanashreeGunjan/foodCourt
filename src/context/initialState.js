import { FetchUser } from "../utils/fetchLocalData"

const userInfo=FetchUser();
export const initialState={
    user:userInfo,
    foodItems:null,
}