import React from "react";
import Slider from "react-slick";
import mainSlide from "../../assets/bag.jpg";
import Slide1 from "../../assets/chair.jpg";
import Slide2 from "../../assets/music.jpg";
import Slide3 from "../../assets/bags.jpg";

export default function MainSlider() {
  var settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
    autoplay: true,
    autoplaySpeed: 3000,
  };

  return (
    <div className="flex flex-col md:flex-row justify-center items-center mx-auto w-3/4 py-8">
      <div className="w-full md:w-2/6 mb-4 md:mb-0">
        <Slider {...settings}>
          <img
            className="w-full h-[500px] object-cover"
            src={mainSlide}
            alt="Main Slide"
          />
          <img
            className="w-full h-[500px] object-cover"
            src={Slide1}
            alt="Slide 1"
          />
        </Slider>
      </div>
      <div className="w-full md:w-2/6 flex flex-col ">
        <img
          className="w-full h-[250px] object-cover"
          src={Slide2}
          alt="Slide 2"
        />
        <img
          className="w-full h-[250px] object-cover"
          src={Slide3}
          alt="Slide 3"
        />
      </div>
    </div>
  );
}
