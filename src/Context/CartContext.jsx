import axios from "axios";
import { createContext, useEffect, useState } from "react";


export let CartContext = createContext();

export default function CartContextProvider(props){

    const [cart, setCart] = useState(null);

    let headers = {
        token:localStorage.getItem('userToken')
    }



    function addProductToCart(productId){
        return axios.post(`https://ecommerce.routemisr.com/api/v1/cart`,{
            productId:productId
        },{
            headers
        }).then((response)=> response)
        .catch((error)=>error)
    }

    function updateCartProductQuantity(productId,count){
        return axios.put(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`,{
            count:count
        },{
            headers,
        }).then((response)=>response)
        .catch((error)=> error);
    }


    function getLoggedUserCart(){
        return axios.get(`https://ecommerce.routemisr.com/api/v1/cart`,{
            headers
        }).then((response)=> response)
        .catch((error)=> error)
    }

    function removeSpecificCartItem(productId){
        return axios.delete(`https://ecommerce.routemisr.com/api/v1/cart/${productId}`,{
            headers
        }).then((response)=> response)
        .catch((error)=> error);
    }


    function clearUserCart(){
        return axios.delete(`https://ecommerce.routemisr.com/api/v1/cart`,{
            headers
        }).then((response)=> response)
        .catch((error)=> error);
    }


    async function getCart(){
       let response = await getLoggedUserCart();
       setCart(response.data);
       
    }


    async function ChickOut(cartId,url,formValue){
        return axios.post(`https://ecommerce.routemisr.com/api/v1/orders/checkout-session/${cartId}?url=${url}`,{
            shippingAddress:formValue
        },{
            headers
        }).then((response)=>response)
        .catch((error)=> error)
    }


    useEffect(()=>{
        getCart();
    } , [])

    


    return  <CartContext.Provider value={{ getLoggedUserCart , addProductToCart , updateCartProductQuantity ,removeSpecificCartItem , clearUserCart , setCart , cart , ChickOut}}>
        {props.children}
    </CartContext.Provider>

}