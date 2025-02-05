import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules"; // Import Autoplay module
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

const BankServices = () => {
  const [servicesData, setServicesData] = useState([]);

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      // const response = await GetServiceData();
      // const serviceData = response.services_Data;
      setServicesData(dummyProductData); // Dummy data for testing
    } catch (error) {
      console.error("Error fetching services:", error);
    }
  };

  const dummyProductData = [
    { card_logo: "../img/download (3).jpg", title: "nammwhjjb" },
    { card_logo: "../img/download__2_-removebg-preview (1).png", title: "nammwhjjb" },
    { card_logo: "../img/download__2_-removebg-preview.png", title: "nammwhjjb" },
    { card_logo: "../img/download__3_-removebg-preview (1).png", title: "nammwhjjb" },
    { card_logo: "../img/download__3_-removebg-preview.png", title: "nammwhjjb" },
    { card_logo: "../img/download__4_-removebg-preview (1).png", title: "Loan" },
    { card_logo: "../img/download__4_-removebg-preview.png", title: "nammwhjjb" },
    { card_logo: "../img/download__5_-removebg-preview.png", title: "nammwhjjb" },
    { card_logo: "../img/download__6_-removebg-preview.png", title: "nammwhjjb" },
    { card_logo: "../img/download__7_-removebg-preview.pngg", title: "nammwhjjb" },
    { card_logo: "../img/download__8_-removebg-preview.png", title: "nammwhjjb" },
    { card_logo: "../img/download__9_-removebg-preview.png", title: "nammwhjjb" },
    { card_logo: "../img/download (4).jpg", title: "nammwhjjb" },
  ];

  return (
    <div className="service-page-container">
      {servicesData.length === 0 ? (
        <p className="text-center">No services available at the moment.</p>
      ) : (
        <div
          className="carousel-container"
          style={{
            border: "3px solid #000", // Add a border around the entire carousel
            borderRadius: "12px", // Optional: Round corners for the carousel
            padding: "10px", // Optional: Add some padding inside the border
            backgroundColor: "#fff", // Optional: Background color for the carousel
            boxShadow: "0 4px 6px rgba(32, 54, 215, 0.1)", // Optional: Soft shadow for depth
          }}
        >
          <Swiper
            modules={[Navigation, Pagination, Autoplay]} // Include Autoplay module
            spaceBetween={5}
            slidesPerView={10}
            loop={true} // Enables looping
            autoplay={{
              delay: 2000, // Delay in milliseconds between transitions
              disableOnInteraction: false, // Keeps autoplay running even after user interaction
            }}
            navigation={{
              nextEl: ".swiper-button-next",
              prevEl: ".swiper-button-prev",
            }}
            pagination={{ clickable: true }}
            breakpoints={{
              320: { slidesPerView: 1, spaceBetween: 10 }, // Mobile view
              640: { slidesPerView: 3, spaceBetween: 15 }, // Small tablets
              1024: { slidesPerView: 4, spaceBetween: 20 }, // Laptops
              1280: { slidesPerView: 4, spaceBetween: 30 }, // Desktops
            }}
          >
            {servicesData.map((item, idx) => (
              <SwiperSlide
                key={idx}
                style={{
                  display: "flex",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <div
                  style={{
                    padding: "5px", // Padding around each image inside the slide
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                  }}
                >
                  <img
                    src={item.card_logo ? item.card_logo : "https://via.placeholder.com/150"}
                    alt={item.title || `Card ${idx + 1}`}
                    className="card__img img-fluid"
                    style={{
                      maxWidth: "50%", // Ensures the image fits within the box
                      borderRadius: "4px", // Optional: Round the corners of the image itself
                    }}
                  />
                </div>
              </SwiperSlide>
            ))}
            <div className="swiper-button-next" />
            <div className="swiper-button-prev" />
          </Swiper>
        </div>
      )}
    </div>
  );
};

export default BankServices;
