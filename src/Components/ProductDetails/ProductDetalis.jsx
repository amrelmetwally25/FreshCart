import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Slider from "react-slick";
import { CartContext } from "../../Context/CartContext";

export default function ProductDetalis() {
  let { id } = useParams();

  let {addProductToCart} =useContext(CartContext);


  const [productDetails, setProductDetails] = useState(null);


  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  function getproductDetails(id) {
    axios.get(`https://ecommerce.routemisr.com/api/v1/products/${id}`)
      .then(({ data }) => {
        setProductDetails(data.data);
        console.log(data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }


  async function addToCart(productId){
    let response = await addProductToCart(productId);  
  }

  useEffect(() => {
    getproductDetails(id);
  }, []);

  return (
    <>
      <div className="row">
        {productDetails?<>
          <div className="w-4/12">
          <div className="product">
            <Slider {...settings}>
              {productDetails?.images.map((image) => (
                <img className="h-full" src={image} alt={productDetails.title} />
              ))}
            </Slider>
          </div>
        </div>
        <div className="w-8/12 p-6">
          <h3 className="font-bold mb-3 text-lg text-gray-950">
            {productDetails?.title}
          </h3>
          <p className="text-gray-700 font-light">
            {productDetails?.description}
          </p>
          <div className="flex justify-between pt-4 items-center">
            <span className="font-bold">{productDetails?.price} EGP</span>
            <span>
              {productDetails?.ratingsAverage}
              <i className="fas fa-star text-yellow-400"></i>
            </span>
          </div>
          <button onClick={()=>{addToCart(productDetails.id)}} className="bg-red-500 w-full py-2 rounded-lg text-white mt-5">
            add to cart
          </button>
        </div>
        </>:<div className="spinner">
    <div className="bounce1"></div>
    <div className="bounce2"></div>
    <div className="bounce3"></div>
  </div>}
       
      </div>
    </>
  );
}
