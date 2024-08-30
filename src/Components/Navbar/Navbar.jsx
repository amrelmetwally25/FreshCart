import React, { useContext, useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { UserContext } from "../../Context/UserContext";
import logo from "../../assets/shopping-logo.jpg";
import { CartContext } from "../../Context/CartContext";

export default function Navbar() {
  let { userLogin, setUserLogin } = useContext(UserContext);
  let { cart } = useContext(CartContext);
  let navigate = useNavigate();
  const [isToggleVisible, setIsToggleVisible] = useState(false);

  function logOut() {
    localStorage.removeItem("userToken");
    setUserLogin(null);
    navigate("/login");
  }

  useEffect(() => {
    const handleResize = () => {
      setIsToggleVisible(window.innerWidth < 768);
    };
    window.addEventListener("resize", handleResize);
    handleResize(); // Set initial state
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <nav className="bg-[#f8f9fb] dark:bg-gray-900 fixed w-full z-20 top-0 start-0 border-b border-gray-200 dark:border-gray-600">
      <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
        <div className="flex items-center space-x-3 rtl:space-x-reverse">
          <img src={logo} className="h-12" alt="Flowbite Logo" />
          <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
            FreshCart
          </span>
        </div>
        <div className="flex md:order-2">
          <ul className="flex items-center space-x-3 rtl:space-x-reverse">
            {userLogin ? (
              <>
                <li>
                  <NavLink
                    to="/cart"
                    className="cursor-pointer block py-2 px-3 relative  text-gray-900 rounded hover:bg-gray-100 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white"
                  >
                    <i className="fa-solid fa-cart-shopping text-3xl">
                      <span className="bg-red-600 text-white py-1 px-2 rounded-3xl text-xs absolute top-0 right-1">
                        {cart?.numOfCartItems == null
                          ? "0"
                          : cart?.numOfCartItems}
                      </span>
                    </i>
                  </NavLink>
                </li>
                <li className="hidden md:block">
                  <span
                    onClick={logOut}
                    className="cursor-pointer block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white"
                  >
                    Logout
                  </span>
                </li>
              </>
            ) : (
              <>
                <li>
                  <NavLink
                    className="block py-2 px-3 bg-[#f8f9fb] text-gray-900 rounded hover:bg-gray-100 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white"
                    to="/login"
                  >
                    Login
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    className="block py-2 px-3 bg-[#f8f9fb] text-gray-900 rounded hover:bg-gray-100 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white"
                    to="/register"
                  >
                    Register
                  </NavLink>
                </li>
              </>
            )}
          </ul>
          {isToggleVisible && (
            <button
              data-collapse-toggle="navbar-sticky"
              type="button"
              className="inline-flex items-center p-2 w-10 h-10 justify-center text-sm text-gray-500 rounded-lg md:hidden hover:bg-gray-100 dark:text-gray-400 dark:hover:bg-gray-700"
              aria-controls="navbar-sticky"
              aria-expanded="false"
            >
              <span className="sr-only">Open main menu</span>
              <svg
                className="w-5 h-5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 17 14"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M1 1h15M1 7h15M1 13h15"
                />
              </svg>
            </button>
          )}
        </div>
        <div
          className="items-center justify-between hidden w-full md:flex md:w-auto"
          id="navbar-sticky"
        >
          <ul className="flex flex-col p-4 md:p-0 mt-4 font-medium border border-gray-100 rounded-lg bg-gray-50 md:space-x-2 rtl:space-x-reverse md:flex-row md:mt-0 dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700 ml-auto">
            {userLogin ? (
              <>
                <li>
                  <NavLink
                    className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white"
                    to="/"
                    aria-current="page"
                  >
                    Home
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white"
                    to="/cart"
                    aria-current="page"
                  >
                    Cart
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white"
                    to="/whishlist"
                    aria-current="page"
                  >
                    Wish List
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white"
                    to="/products"
                  >
                    Products
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white"
                    to="/categories"
                  >
                    Categories
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    className="block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white"
                    to="/prands"
                  >
                    Brands
                  </NavLink>
                </li>
                <li className="block md:hidden">
                  <span
                    onClick={logOut}
                    className="cursor-pointer block py-2 px-3 text-gray-900 rounded hover:bg-gray-100 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white"
                  >
                    Logout
                  </span>
                </li>
              </>
            ) : null}
          </ul>
        </div>
      </div>
    </nav>
  );
}


