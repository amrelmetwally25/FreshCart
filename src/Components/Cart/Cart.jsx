import React, { useContext, useEffect, useState } from "react";
import { CartContext } from "../../Context/CartContext";
import { NavLink } from "react-router-dom";

export default function Cart() {
  const [cartDetails, setCartDetails] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  let {
    getLoggedUserCart,
    updateCartProductQuantity,
    removeSpecificCartItem,
    clearUserCart,
    setCart,
  } = useContext(CartContext);

  async function getCartItems() {
    setLoading(true);
    try {
      let response = await getLoggedUserCart();
      setCartDetails(response.data.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching cart items:", error);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  }

  async function updateToCart(productId, count) {
    setLoading(true);
    try {
      let response = await updateCartProductQuantity(productId, count);
      setCartDetails(response.data.data);
      setCart(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error updating cart item:", error);
      setLoading(false);
    }
  }

  async function removeCartItem(productId) {
    setLoading(true);
    try {
      let response = await removeSpecificCartItem(productId);
      setCart(response.data);
      setCartDetails(response.data.data);
      setLoading(false);
    } catch (error) {
      console.error("Error removing cart item:", error);
      setLoading(false);
    }
  }

  async function clearCartItem() {
    setIsLoading(true);
    try {
      let response = await clearUserCart();
      setCart(response.data);
      setCartDetails(response.data.data);
      setIsLoading(false);
    } catch (error) {
      console.error("Error clearing cart:", error);
      setIsLoading(false);
    }
  }

  useEffect(() => {
    getCartItems();
  }, []);

  if (loading) {
    return (
      <div className="spinner">
        <div className="bounce1"></div>
        <div className="bounce2"></div>
        <div className="bounce3"></div>
      </div>
    );
  }

  return (
    <>
      {cartDetails?.products?.length > 0 ? (
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
          <h2 className="text-5xl text-center text-red-500 py-3 font-bold">
            Cart Shop
          </h2>

          <h3 className="text-center text-3xl py-4">
            Total Price:
            <span className="text-red-500">
              {" "}
              {cartDetails?.totalCartPrice}{" "}
            </span>
            EGP
          </h3>

          <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <tr>
                <th scope="col" className="px-16 py-3">
                  <span className="sr-only">Image</span>
                </th>
                <th scope="col" className="px-6 py-3">
                  Product
                </th>
                <th scope="col" className="px-6 py-3">
                  Qty
                </th>
                <th scope="col" className="px-6 py-3">
                  Price
                </th>
                <th scope="col" className="px-6 py-3">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {cartDetails?.products?.map((product) => (
                <tr
                  key={product.product.id}
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                >
                  <td className="p-4">
                    <img
                      src={product.product.imageCover}
                      className="w-16 md:w-32 max-w-full max-h-full"
                      alt={product.product.title}
                    />
                  </td>
                  <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                    {product.product.title}
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <button
                        onClick={() => {
                          updateToCart(product.product.id, product.count - 1);
                        }}
                        className="inline-flex items-center justify-center p-1 me-3 text-sm font-medium h-6 w-6 text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                        type="button"
                      >
                        <span className="sr-only">Decrease Quantity</span>
                        <svg
                          className="w-3 h-3"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 18 2"
                        >
                          <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M1 1h16"
                          />
                        </svg>
                      </button>
                      <span>{product.count}</span>
                      <button
                        onClick={() => {
                          updateToCart(product.product.id, product.count + 1);
                        }}
                        className="inline-flex items-center justify-center h-6 w-6 p-1 ms-3 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                        type="button"
                      >
                        <span className="sr-only">Increase Quantity</span>
                        <svg
                          className="w-3 h-3"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 18 18"
                        >
                          <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 1v16M1 9h16"
                          />
                        </svg>
                      </button>
                    </div>
                  </td>
                  <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                    {product.price}
                  </td>
                  <td className="px-6 py-4">
                    <span
                      onClick={() => {
                        removeCartItem(product.product.id);
                      }}
                      className="font-medium text-red-600 dark:text-red-500 hover:cursor-pointer hover:text-bold"
                    >
                      Remove
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className="text-center py-7 space-x-4">
            <button
              onClick={() => {
                clearCartItem();
              }}
              className="px-5 py-3 rounded-lg bg-gray-500 text-white"
            >
              {isLoading ? (
                <i className="fas fa-spinner fa-spin"></i>
              ) : (
                "clear cart item"
              )}
            </button>

            <NavLink
              to={"/chickout"}
              className="px-5 py-3 rounded-lg bg-blue-600 text-white"
            >
              Chick Out
            </NavLink>
          </div>
        </div>
      ) : (
        <div className="text-center py-7">
          <p className="text-4xl font-bold">Your cart is empty.</p>
        </div>
      )}
    </>
  );
}
