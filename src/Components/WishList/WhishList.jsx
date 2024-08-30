import { useContext, useEffect, useState } from "react";
import { whishListContext } from "../../Context/WhishListContext";
import { CartContext } from "../../Context/CartContext";
import toast from "react-hot-toast";

export default function WhishList() {
  let { GetLoggedUserWishlist, RemoveProductFromWishlist } =
    useContext(whishListContext);
  let { addProductToCart } = useContext(CartContext);

  const [whishListDetails, setWishListDetails] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [currentProductId, setCurrentProductId] = useState(null);
  const [isRemovingFromWishlist, setIsRemovingFromWishlist] = useState(false);
  const [isAddingToCart, setIsAddingToCart] = useState(false);

  async function getWishlistItems() {
    setIsLoading(true);
    let response = await GetLoggedUserWishlist();
    if (response.data.status === "success") {
      setIsLoading(false);
      setWishListDetails(response.data.data);
    } else {
      setIsLoading(false);
      alert(response.data.message);
    }
  }

  async function addToCart(productId) {
    setCurrentProductId(productId);
    setIsAddingToCart(true);
    let response = await addProductToCart(productId);
    if (response.data.status === "success") {
      setIsAddingToCart(false);
      toast.success(response.data.message, {
        position: "top-right",
        duration: 4000,
      });
    } else {
      setIsAddingToCart(false);
      toast.error(response.data.message);
    }
  }

  async function removeItem(productId) {
    setCurrentProductId(productId);
    setIsRemovingFromWishlist(true);
    let response = await RemoveProductFromWishlist(productId);
    if (response.data.status === "success") {
      setIsRemovingFromWishlist(false);
      toast.success(response.data.message, {
        position: "top-right",
        duration: 4000,
      });
      setWishListDetails((prevWishListDetails) =>
        prevWishListDetails.filter((product) => product.id !== productId)
      );
    } else {
      setIsRemovingFromWishlist(false);
      toast.error(response.data.message);
    }
  }

  useEffect(() => {
    getWishlistItems();
  }, []);

  return (
    <>
      {isLoading ? (
        <div className="spinner">
          <div className="bounce1"></div>
          <div className="bounce2"></div>
          <div className="bounce3"></div>
        </div>
      ) : whishListDetails?.length > 0 ? (
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
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
                  Price
                </th>
                <th scope="col" className="px-6 py-3">
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {whishListDetails?.map((product) => (
                <tr
                  key={product.id}
                  className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                >
                  <td className="p-4">
                    <img
                      src={product.imageCover}
                      className="w-16 md:w-32 max-w-full max-h-full"
                      alt={product.title}
                    />
                  </td>
                  <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                    {product.title}
                  </td>
                  <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                    {product.price} EGP
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex-col-reverse">
                      <div className="p-2">
                        <button
                          onClick={() => addToCart(product.id)}
                          className="py-3 px-5 bg-yellow-500 rounded-lg text-white whitespace-nowrap"
                        >
                          {currentProductId === product.id && isAddingToCart ? (
                            <i className="fas fa-spinner fa-spin"></i>
                          ) : (
                            "Add To Cart"
                          )}
                        </button>
                      </div>
                      <div className="p-2">
                        <button
                          onClick={() => removeItem(product.id)}
                          className="py-3 px-5 bg-gray-600 rounded-lg text-white"
                        >
                          {currentProductId === product.id &&
                          isRemovingFromWishlist ? (
                            <i className="fas fa-spinner fa-spin"></i>
                          ) : (
                            "Remove"
                          )}
                        </button>
                      </div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div>
          <h2 className="py-8 text-3xl font-bold text-center">
            The list is empty
          </h2>
        </div>
      )}
    </>
  );
}
