import React, { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules"; // Import Autoplay module
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { GetServiceData } from "../services/serviceAdmin";
import { baseURL } from "../services/apiService";

const Service = () => {
  const [servicesData, setServicesData] = useState([]);

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const response = await GetServiceData();
      const serviceData = response.services_Data;
      setServicesData(serviceData.filter((service) => service.status === "1"));
    } catch (error) {
      console.error("Error fetching services:", error);
    }
  };

  return (
    <div className="service-page-container">

      {servicesData.length === 0 ? (
        <p className="text-center">No services available at the moment.</p>
      ) : (
        <Swiper
          modules={[Navigation, Pagination, Autoplay]} // Include Autoplay module
          spaceBetween={20}
          slidesPerView={4}
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
              <Card
                style={{ width: "100%", maxWidth: "150px" }}
                className="p-3 shadow-sm border-0 rounded-3"
              >
                <Card.Img
                  variant="top"
                  src={
                    item.card_logo
                      ? item.card_logo
                      : "https://via.placeholder.com/150"
                  }
                  alt={item.card_title || `Card ${idx + 1}`}
                  className="card__img rounded-3 img-fluid"
               
                />
                <Card.Body className="text-center">
                  <Card.Title className="h6">
                    {item.card_title || `Card ${idx + 1}`}
                  </Card.Title>
                </Card.Body>
              </Card>
            </SwiperSlide>
          ))}

          <div className="swiper-button-next " />
          <div className="swiper-button-prev" />
        </Swiper>
      )}

      {/* Custom Styles */}
    
    </div>
  );
};

export default Service;
