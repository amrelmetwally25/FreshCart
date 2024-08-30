import axios from "axios";
import { createContext, useEffect, useState } from "react";

export let UserContext = createContext(0);


export function UserContextProvider(props){

    const [userLogin, setUserLogin] = useState(null);


    useEffect(()=>{
        if(localStorage.getItem('userToken')!== null){
            setUserLogin(localStorage.getItem('userToken'));
        }
    },[])


    return <UserContext.Provider value={{ setUserLogin , userLogin }}>
                {props.children}
            </UserContext.Provider>
}