import { useContext } from "react";
import { BrowserRouter } from "react-router-dom";
import { MainContext } from "./context/MainContext";
import Login from "./components/login/Login";
import Home from "./pages/home/Home";
import Navbar from "./components/navbar/Navbar";
import FeedArea from "./components/feed/FeedArea";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Feed from "./components/feed/Feed";

const App = () => {
  const { showLogin, isLoggedIn } = useContext(MainContext);
  return (
    <>
      <BrowserRouter>
        <ToastContainer />
        {showLogin && <Login />}
        <main className=" mx-auto bg-white h-full">
          <Navbar />
          {isLoggedIn ? <Home /> : <FeedArea />}
        </main>
      </BrowserRouter>
    </>
  );
};

export default App;
