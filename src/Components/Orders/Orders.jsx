import axios from "axios";
import React, { useContext, useEffect } from "react";
import { CartContext } from "../../Context/CartContext";

export default function Orders() {
  let { cart } = useContext(CartContext);

  function getUserOrders() {
    return axios
      .get(`https://ecommerce.routemisr.com/api/v1/orders`)
      .then((response) => response)
      .catch((error) => error);
  }

  async function getOrders() {
    let response = await getUserOrders();
    console.log(response);
  }

  useEffect(() => {
    getOrders();
  });
  return <div>orders</div>;
}
