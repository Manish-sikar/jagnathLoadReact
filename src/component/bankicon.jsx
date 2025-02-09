import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Autoplay } from "swiper/modules"; 
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
      setServicesData(dummyProductData); // Using dummy data
    } catch (error) {
      console.error("Error fetching services:", error);
    }
  };

  // Dummy Data (Replace with API data if available)
  const dummyProductData = [
    { card_logo: "/img/download (1).jpg", title: "Muthoot Finance" },
    { card_logo: "/img/download (2).jpg", title: "Northern Arc" },
    { card_logo: "/img/download (3).jpg", title: "PNB Housing" },
    { card_logo: "/img/download (3).png", title: "Tyger Home Finance" },
    { card_logo: "/img/download (4).jpg", title: "Piramal Finance" },
    { card_logo: "/img/download (5).jpg", title: "TATA Motors Finance" },
    { card_logo: "/img/download (5).png", title: "TVS Credit" },
    { card_logo: "/img/download (6).png", title: "Aavas Financiers" },
    { card_logo: "/img/download (7).png", title: "Aavas Financiers" },
    { card_logo: "/img/download (8).png", title: "Aavas Financiers" },
    { card_logo: "/img/download (9).png", title: "Aavas Financiers" },
    { card_logo: "/img/download (10).png", title: "Aavas Financiers" },
    { card_logo: "/img/download (11).png", title: "Aavas Financiers" },
    { card_logo: "/img/download (13).png", title: "Aavas Financiers" },
    { card_logo: "/img/download__14_-removebg-preview.png", title: "Aavas Financiers" },
  ];

  return (
    <div className="bank-logos-carousel" style={{ width: "100%", background: "#fff", padding: "20px 0 " }}>
      {servicesData.length === 0 ? (
        <p className="text-center">No services available at the moment.</p>
      ) : (
        <Swiper
          modules={[Navigation, Autoplay]}
          spaceBetween={10}
          slidesPerView={8} 
          loop={true}
          autoplay={{ delay: 2000, disableOnInteraction: false }}
          navigation
          breakpoints={{
            320: { slidesPerView: 1, spaceBetween: 10 }, 
            640: { slidesPerView: 3, spaceBetween: 15 },
            1024: { slidesPerView: 6, spaceBetween: 20 },
            1280: { slidesPerView: 8, spaceBetween: 30 },
          }}
          style={{ width: "100%" }}
        >
          {servicesData.map((item, idx) => (
            <SwiperSlide key={idx} style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
              <img
                src={item.card_logo}
                alt={item.title}
                title={item.title}
                className="bank-logo"
                style={{
                  maxWidth: "100px",
                  height: "auto",
                  objectFit: "contain",
                }}
              />
            </SwiperSlide>
          ))}
        </Swiper>
      )}
    </div>
  );
};

export default BankServices;
