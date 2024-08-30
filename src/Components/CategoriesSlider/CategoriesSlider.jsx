import axios from 'axios';
import React, { useEffect, useState } from 'react';
import Slider from "react-slick";

export default function CategoriesSlider() {
  const [categories, setCategories] = useState([]);

  var settings = {
    dots: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 7, 
    slidesToScroll: 1,
    autoplay: true,
    arrows: false,
    autoplaySpeed: 2000,
    responsive: [
      {
        breakpoint: 1024, 
        settings: {
          slidesToShow: 5,
          slidesToScroll: 1,
          dots: true
        }
      },
      {
        breakpoint: 768, 
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          dots: true
        }
      },
      {
        breakpoint: 480, 
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          dots: true
        }
      }
    ]
  };

  function getCategories() {
    axios.get(`https://ecommerce.routemisr.com/api/v1/categories`)
      .then(({ data }) => {
        setCategories(data.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <div className='mb-10'>
      <Slider {...settings}>
        {categories.map((category) => (
          <div key={category._id} className='pt-4'>
            <img className='imgCategrySize w-full object-cover' src={category.image} alt={category.title} />
            <h3 className='text-center'>{category.name}</h3>
          </div>
        ))}
      </Slider>
    </div>
  );
}
