import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Prands() {
  const [allPrands, setAllPrands] = useState([]);

  function getAllPrands() {
    axios
      .get(`https://ecommerce.routemisr.com/api/v1/brands`)
      .then(({ data }) => {
        setAllPrands(data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  useEffect(() => {
    getAllPrands();
  }, []);

  return (
    <>
      <h2 className="text-center text-5xl pt-2 font-bold text-red-500">
        All Brands
      </h2>
      <div className="row">
        {allPrands.length > 0 ? (
          allPrands.map((prand) => (
            <div
              key={prand._id}
              className="sm:w-1/2 md:w-1/3 lg:w-1/4 py-2 px-2 box-border "
            >
              <div className="product overflow-hidden box border-2 rounded p-3">
                <Link
                  onClick={() => {
                    getSpecificPrand(prand._id);
                  }}
                >
                  <img className="w-full" src={prand.image} alt={prand.title} />
                  <h2 className="text-center">{prand.name}</h2>
                </Link>
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
