import { useContext } from "react";
import { RiExternalLinkLine } from "react-icons/ri";
import { MainContext } from "../../context/MainContext";
import { assets } from "../../assets/assets";
import { NavLink } from "react-router-dom";

const Navbar = () => {
  const { isLoggedIn, setShowLogin, showLogout, setShowLogout, logoutHandler } =
    useContext(MainContext);

  return (
    <nav className={`shadow-md h-20 w-full bg-gray-900 px-[10%]`}>
      <section className="flex w-full items-center font-semibold justify-between">
        <NavLink to="/">
          {" "}
          <img
            src={assets.logo}
            className="size-20 cursor-pointer"
            alt="logo"
          />
        </NavLink>
        {isLoggedIn ? (
          <div className="flex items-center">
            <div
              onClick={() => setShowLogout((prev) => !prev)}
              className="flex items-center justify-center bg-gray-900 gap-6 rounded-full cursor-pointer"
            >
              <p className="text-white text-xl">Shahzaib Khan</p>
              <p className="text-gray-900 size-12 bg-white rounded-full flex justify-center text-2xl items-center">
                S
              </p>
            </div>
          </div>
        ) : (
          <button
            onClick={() => setShowLogin(true)}
            className="bg-white text-black text-[18px] px-10 py-2 rounded-full hover:scale-105"
          >
            Login
          </button>
        )}
      </section>
      <section className="flex mt-2 justify-between relative">
        {showLogout && (
          <article className="flex gap-3 flex-col absolute top 0 right-0 text-[#ffffffe6] bg-gray-900 p-10 rounded z-20 text-md">
            <div className="flex justify-between gap-5 cursor-pointer text-lg font-semibold">
              <p>Account</p>
              <RiExternalLinkLine className="w-5 h-5" />
            </div>
            <p className="w-max cursor-pointer text-lg font-semibold">
              Profile
            </p>
            <div className="flex justify-between gap-5 cursor-pointer text-lg font-semibold">
              <p>Find More</p>
              <RiExternalLinkLine className="w-5 h-5" />
            </div>
            <p className="w-max cursor-pointer text-lg font-semibold">
              Settings
            </p>
            <hr className="h-[1px] border-none bg-gray-700 px-0" />
            <p
              onClick={logoutHandler}
              className="w-max cursor-pointer text-lg font-semibold"
            >
              Log out
            </p>
          </article>
        )}
      </section>
    </nav>
  );
};

export default Navbar;
