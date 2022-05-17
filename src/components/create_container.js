import { useState } from "react";
import {
  deleteObject,
  getDownloadURL,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { motion } from "framer-motion";
import { storage } from "../firebase.config";

import {
  MdFastfood,
  MdCloudUpload,
  MdDelete,
  MdFoodBank,
  MdAttachMoney,
} from "react-icons/md";
import { categories } from "./data";
import Loader from "./loader";
import { saveItem } from "../utils/firebaseFunction";

export default function CreateContainer() {
  const [title, setTitle] = useState();
  const [calories, setcalories] = useState();
  const [price, setPrice] = useState();
  const [category, setCategory] = useState(null);
  const [imageAsset, setImageAssest] = useState(null);
  const [fields, setFields] = useState(true);
  const [alertStatus, setAlertStatus] = useState("danger");
  const [message, setMessage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  // console.log("categories data availabe here", categories);
  const uploadImage = (e) => {
    setIsLoading(true);
    const imageFile = e.target.files[0];
    const storageRef = ref(storage, `Images/${Date.now()}-${imageFile.name}`);
    const uploadTask = uploadBytesResumable(storageRef, imageFile);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const uploadProgress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      },
      (error) => {
        console.log(error);
        setFields(true);
        setMessage("Error while uploading");
        setAlertStatus("Danger");
        setTimeout(() => {
          setFields(false);
          setIsLoading(false);
        }, 4000);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
          setImageAssest(downloadURL);
          setIsLoading(false);
          setFields(true);
          setMessage("Image uploaded successfully");
          setAlertStatus("Success");
          setTimeout(() => {
            setFields(false);
          }, 4000);
        });
      }
    );
  };
  const deleteImage = () => {
    setIsLoading(true);
    const deleteRef = ref(storage, imageAsset);
    deleteObject(deleteRef).then(() => {
      setImageAssest(null);
      setIsLoading(false);
      setFields(true);
      setMessage("Image Deleted successfully");
      setAlertStatus("Success");
      setTimeout(() => {
        setFields(false);
      }, 4000);
    });
  };
  const saveDetails = () => {
    try {
      if (!title || !price || !calories || !imageAsset || !category) {
        setFields(true);
        setMessage("Required fields can't be empty");
        setAlertStatus("danger");
        setTimeout(() => {
          setFields(false);
          setIsLoading(false);
        }, 4000);
      } else {
        const data = {
          id: `${Date.now()}`,
          title: title,
          imageURL: imageAsset,
          category: category,
          calories: calories,
          qty: 1,
          price: price,
        };
        saveItem(data);
        setIsLoading(false);
        setFields(true);
        setMessage("Data uploded  successfully");
        setAlertStatus("Success");
        clearData();
        setTimeout(() => {
          setFields(false);
        }, 4000);
      }
    } catch (error) {
      console.log(error);
      setFields(true);
      setMessage("Error while uploading");
      setAlertStatus("Danger");
      setTimeout(() => {
        setFields(false);
        setIsLoading(false);
      }, 4000);
    }
  };
  const clearData=()=>{
    setTitle("");
    setImageAssest(null)
    setcalories("")
    setPrice("")
    setCategory("select category")
  }

  return (
    <div className="w-full min-h-screen flex items-center justify-center overflow-hidden">
      <div className="w-[90%] md:w-[75%] border rounded p-4 flex flex-col items-center justify-center gap-4 ">
        {fields && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className={`w-full p-2 rounded text-center ${
              alertStatus === "danger"
                ? "bg-red-200 text-red-800 font-semibold"
                : "bg-emerald-400 text-emerald-900 font-semibold"
            }}`}
          >
            {message}
          </motion.p>
        )}
        <div className="flex items-center border-b border-gray-500 py-2 w-full">
          <MdFastfood className="text-xl text-gray-700" />
          <input
            required
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Title......"
            className="ml-2 w-full h-full text-textColor text-lg bg-transparent outline-0"
          />
        </div>
        <div className="w-full">
          <select
            className="outline-0 w-full text-base border-b-2 border-gray-200 p-2 rounded-md cursor-pointer"
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="other" className="bg-white">
              Select Category
            </option>
            {categories &&
              categories.map((item) => (
                <option
                  className="text-base border-0 outline-none capitalize bg-white text-headingColor"
                  key={item.id}
                  value={item.urlName}
                >
                  {item.name}
                </option>
              ))}
          </select>
        </div>
        <div className="group flex justify-center items-center border-2 border-dotted border-gray-300 w-full h-225 md:430 cursor-pointer rounded-lg">
          {isLoading ? (
            <Loader />
          ) : (
            <>
              {!imageAsset ? (
                <>
                  <label className="w-full h-full flex flex-col items-center justify-center cursor-pointer">
                    <div className="w-full h-full flex flex-col items-center justify-center gap-2">
                      <MdCloudUpload className="text-gray-500 text-3xl hover:text-gray-700" />
                      <p className="text-gray-500 text-3xl hover:text-gray-700">
                        Click here to upload
                      </p>
                    </div>
                    <input
                      type="file"
                      name="uploadimage"
                      accept="image/*"
                      className="w-0 h-0"
                      onChange={uploadImage}
                    />
                  </label>
                </>
              ) : (
                <>
                  <div className="relative h-full ">
                    <img
                      src={imageAsset}
                      alt="uploaded image"
                      className="h-full w-full object-cover"
                    />
                    <button
                      className="absolute bottom-3 right-3 p-3 bg-red-500 text-xl cursor-pointer outline-none rounded-full hover:shadow-lg duration-500 transition-all ease-in-out "
                      onClick={deleteImage}
                    >
                      <MdDelete className="text-white" />
                    </button>
                  </div>
                </>
              )}
            </>
          )}
        </div>
        <div className="w-full flex flex-col md:flex-row items-center gap-3">
          <div className="w-full py-2 border-b border-gray-300 flex items-center gap-2">
            <MdFoodBank className="text-gray-700 text-2xl" />
            <input
              type="text"
              required
              value={calories}
              onChange={(e) => {
                setcalories(e.target.value);
              }}
              placeholder="Calories"
              className="w-full h-full text-lg bg-transparent outline-none border-none placeholder:text-gray-400 text-textColor"
            />
          </div>
          <div className="w-full py-2 border-b border-gray-300 flex items-center gap-2">
            <MdAttachMoney className="text-gray-700 text-2xl" />
            <input
              required
              type="number"
              value={price}
              onChange={(e) => setPrice(e.target.value)}
              placeholder="Price"
              className="w-full h-full text-lg bg-transparent outline-none placeholder:text-gray-400 text-textColor"
            />
          </div>
        </div>
        <div>
          <button
            className="ml-0 md:ml-auto w-full md:w-auto border-none outline-none bg-emerald-500 px-12 py-2 rounded-lg text-white font-semibold"
            onClick={saveDetails}
          >
            save
          </button>
        </div>
      </div>
    </div>
  );
}
