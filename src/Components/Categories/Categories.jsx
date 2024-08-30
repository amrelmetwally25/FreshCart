import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom';

export default function Categories() {

  const [categories, setCategories] = useState([]);


  function getCategories(){

    axios.get(`https://ecommerce.routemisr.com/api/v1/categories`)
    .then(({data})=>{
      setCategories(data.data);
    })
    .catch((error)=>{
      console.log(error);
    })

  }

  useEffect(()=>{
    getCategories();
  },[])


  return <>

  
<div className="row">

{categories.length > 0?categories.map((category)=>
  <div key={category._id} className='md:w-1/2 lg:w-1/3 py-3 px-3 box-border'>
  <div className="overflow-hidden box rounded p-3">
      <Link >
      
      <img className='w-full aspect-[4/3] object-cover h-[25rem]' src={category.image} alt={category.title} />
      <h2 className='text-center text-3xl text-red-600 p-2'>{category.name}</h2>

      
      </Link>
  </div>
</div>  
  
) : 
    <div className="spinner">
<div className="bounce1"></div>
<div className="bounce2"></div>
<div className="bounce3"></div>
</div>
}


</div> 



  
  
  
  
  </>
}
