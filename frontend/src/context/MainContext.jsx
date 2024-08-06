import { createContext, useEffect, useRef, useState } from "react";
import axios from "axios";
import { apiUri } from "../constants";
import { toast } from "react-toastify";

export const MainContext = createContext();

const MainContextProvider = ({ children }) => {
  // <------------------- Routes and Navigation ----------------->

  //<----------------------- States --------------------------->

  const [productsData, setProductsData] = useState([]);
  const [category, setCategory] = useState([
    { name: "Car" },
    { name: "Bike" },
    { name: "Bicycle" },
  ]);
  const [image, setImage] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  // <====== Authentication States ======>
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [accessToken, setAccessToken] = useState(null);
  const [currentState, setCurrentState] = useState("Sign Up");
  const [showLogin, setShowLogin] = useState(false);
  const [showLogout, setShowLogout] = useState(false);

  // <------------------------------ useRef References ------------------------>
  const titleRef = useRef(null);
  const descriptionRef = useRef(null);
  const imageRef = useRef(null);
  const priceRef = useRef(null);
  const categoryRef = useRef(null);

  // <====== Authentication useRef References ======>

  const nameRef = useRef(null);
  const emailRef = useRef(null);
  const passRef = useRef(null);

  //   <------------------------ Methods & Functions ----------------------->

  const fetchProductsData = async () => {
    try {
      const response = await axios.get(
        `${apiUri.baseUri}/${apiUri.productsUri}/list-product`
      );

      if (response.data.success) {
        setProductsData(response.data.data);
      }
    } catch (error) {
      console.log("Error while fetching products", error);
    }
  };

  const onSubmitHandler = async (e) => {
    e.preventDefault();
    let descriptionRefVal = descriptionRef.current.value;
    let imageRefVal = imageRef.current.files[0];
    let titleRefVal = titleRef.current.value;
    let priceRefVal = priceRef.current.value;
    let categoryRefVal = categoryRef.current.value;

    setIsLoading(true);
    try {
      const formData = new FormData();
      formData.append("title", titleRefVal);
      formData.append("description", descriptionRefVal);
      formData.append("image", imageRefVal);
      formData.append("price", priceRefVal);
      formData.append("category", categoryRefVal);

      const response = await axios.post(
        `${apiUri.baseUri}/${apiUri.productsUri}/add-product`,
        formData
      );

      if (response.status >= 200 && response.status < 300) {
        toast.success("Post added successfully !");
        setImage("");
        await fetchProductsData();
      } else {
        toast.error("Something went wrong while uploading post.");
      }
    } catch (error) {
      toast.error("Error occured");
      console.log(
        "Something went wrong while uploading post in catch block.",
        error
      );
    }
    setIsLoading(false);
  };

  const handleImageUpload = (inputRef) => {
    const file = inputRef.current.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // <======== Authentication Methods and Functions ========>

  const onLogin = async (event) => {
    event.preventDefault();
    let newUri = apiUri.usersUri;
    if (currentState === "Login") {
      newUri += "/login";
      const response = await axios.post(`${apiUri.baseUri}/${newUri}`, {
        password: passRef.current.value,
        email: emailRef.current.value,
      });

      if (response.data.success) {
        setAccessToken(response.data.data.accessToken);
        localStorage.setItem("accessToken", response.data.data.accessToken);
        setShowLogin(false);
        setIsLoggedIn(true);
      }
    } else {
      newUri += "/register";
      const response = await axios.post(`${apiUri.baseUri}/${newUri}`, {
        name: nameRef.current.value,
        password: passRef.current.value,
        email: emailRef.current.value,
      });

      if (response.data.success) {
        setShowLogin(false);
        console.log("Sign up successful !");
      }
    }
  };

  const logoutHandler = () => {
    localStorage.removeItem("accessToken");
    setAccessToken("");
    setIsLoggedIn(false);
    setShowLogout(false);
  };

  useEffect(() => {
    if (localStorage.getItem("accessToken")) {
      setAccessToken(localStorage.getItem("accessToken"));
      setIsLoggedIn(true);
    }
  }, []);

  // <------------------- Page Rendering Methods and Hooks -------------------->

  useEffect(() => {
    fetchProductsData();

    if (localStorage.getItem("accessToken")) {
      setAccessToken(localStorage.getItem("accessToken"));
    }
  }, []);

  //   <------------------------ Context Values -------------------------->

  const contextValue = {
    productsData,
    isLoggedIn,
    currentState,
    setCurrentState,
    accessToken,
    showLogin,
    setShowLogin,
    onLogin,
    nameRef,
    emailRef,
    passRef,
    showLogout,
    setShowLogout,
    logoutHandler,
    isLoading,
    setIsLoading,
    onSubmitHandler,
    imageRef,
    categoryRef,
    descriptionRef,
    titleRef,
    image,
    category,
    setCategory,
    priceRef,
    handleImageUpload,
  };

  //   <------------------------ Provider Wrapper ------------------------->

  return (
    <MainContext.Provider value={contextValue}>{children}</MainContext.Provider>
  );
};

export default MainContextProvider;
