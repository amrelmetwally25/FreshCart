import axios from "axios";
import { createContext, useContext } from "react";
import { CartContext } from "./CartContext";

 export let whishListContext = createContext();


 export default function WhishListContextProvider(props) {

    let headers = {
        token:localStorage.getItem('userToken')
    }


    async function addProductToWhishList(productId){
        try {
            const response = await axios.post(`https://ecommerce.routemisr.com/api/v1/wishlist`, {
                productId: productId
            }, {
                headers
            });
            return response;
        } catch (error) {
            return error;
        }
    }


    async function RemoveProductFromWishlist(productId){

        return axios.delete(`https://ecommerce.routemisr.com/api/v1/wishlist/${productId}`,{
            headers
        }).then((response)=>response)
        .catch((error)=> error)

    }


    async function GetLoggedUserWishlist(){
        return axios.get(`https://ecommerce.routemisr.com/api/v1/wishlist`,{
            headers
        }).then((response)=> response)
        .catch((error)=>error);
    }



    return <whishListContext.Provider value={{addProductToWhishList , GetLoggedUserWishlist,RemoveProductFromWishlist}}>
        {props.children}
    </whishListContext.Provider>
 }
