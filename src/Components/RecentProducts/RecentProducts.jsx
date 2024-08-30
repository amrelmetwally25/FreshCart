import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { CartContext } from "../../Context/CartContext";
import toast from "react-hot-toast";
import { whishListContext } from "../../Context/WhishListContext";

export default function RecentProducts() {
  const [recentProducts, setRecentProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  function getRecentProducts() {
    axios
      .get(`https://ecommerce.routemisr.com/api/v1/products`)
      .then(({ data }) => {
        setRecentProducts(data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  let { addProductToWhishList } = useContext(whishListContext);

  const [whishList, setwhishList] = useState([]);
  let { addProductToCart, setCart } = useContext(CartContext);

  const [isLoding, setIsLoding] = useState(false);
  const [currentProductId, setCurrentProductId] = useState(null);

  async function addToWishList(productId) {
    setCurrentProductId(productId);
    let response = await addProductToWhishList(productId);
    if (response.data.status === "success") {
      setwhishList((prevWishList) => [...prevWishList, productId]);
      toast.success(response.data.message, {
        position: "top-right",
        duration: 2000,
      });
    } else {
      toast.error(response.data.message);
    }
  }

  async function addToCart(productId) {
    setIsLoding(true);
    setCurrentProductId(productId);
    let response = await addProductToCart(productId);
    if (response.data.status === "success") {
      setIsLoding(false);
      setCart(response.data);
      toast.success(response.data.message, {
        position: "top-right",
        duration: 2000,
      });
    } else {
      setIsLoding(false);
      toast.error(response.data.message);
    }
  }

  useEffect(() => {
    getRecentProducts();
  }, []);

  const filteredProducts = recentProducts.filter((product) =>
    product.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <div className="flex py-6">
        <input
          type="text"
          placeholder="search...."
          className="w-3/4 mx-auto"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </div>

      <div className="row">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <div
              key={product.id}
              className="sm:w-1/2 md:w-1/3 lg:w-1/4 py-3 px-3 box-border "
            >
              <div className="product overflow-hidden box rounded p-3">
                <Link to={`/productdetails/${product.id}`}>
                  <img
                    className="w-full"
                    src={product.imageCover}
                    alt={product.title}
                  />
                  <span className="text-red-500">{product.category.name}</span>
                  <h3>{product.title.split(" ").slice(0, 2).join(" ")}</h3>
                  <div className="flex items-center justify-between">
                    <span>{product.price} EG</span>
                    <span>
                      {product.ratingsAverage}
                      <i className="fas fa-star text-yellow-400"></i>
                    </span>
                  </div>
                </Link>
                <span
                  onClick={() => {
                    addToWishList(product.id);
                  }}
                >
                  {whishList.includes(product.id) ? (
                    <i className="fa-solid fa-heart text-3xl text-red-600 hover:cursor-pointer p-2"></i>
                  ) : (
                    <i className="fa-solid fa-heart text-3xl hover:cursor-pointer p-2"></i>
                  )}
                </span>
                <button
                  onClick={() => {
                    addToCart(product.id);
                  }}
                  className="btn"
                >
                  {currentProductId === product.id && isLoding ? (
                    <i className="fas fa-spinner fa-spin"></i>
                  ) : (
                    "add to cart"
                  )}
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="spinner">
            <div className="bounce1"></div>
            <div className="bounce2"></div>
            <div className="bounce3"></div>
          </div>
        )}
      </div>
    </>
  );
}
