
import React, { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules"; // Import Autoplay module
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { baseURL } from "../services/apiService";
import { GetServiceData } from "../services/serviceAdmin";

const BankServices = () => {
  const [servicesData, setServicesData] = useState([]);

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
    //   const response = await GetServiceData();
    //   const serviceData = response.services_Data;
      setServicesData(dummyProductData);
    } catch (error) {
      console.error("Error fetching services:", error);
    }
  };

const dummyProductData = [
    {"card_logo":"../img/download (2).jpg",
        "title":"nammwhjjb"
    },
    {"card_logo":"../img/download (3).jpg",
        "title":"nammwhjjb"
    },
    {"card_logo":"../img/download (4).png",
      "title":"nammwhjjb"
  },
  {"card_logo":"../img/download (5).png",
    "title":"nammwhjjb"
},
{"card_logo":"../img/download (6).png",
  "title":"nammwhjjb"
},
{"card_logo":"../img/download (7).png",
  "title":"Loan"
},
{"card_logo":"../img/download (8).png",
  "title":"nammwhjjb"
},
{"card_logo":"../img/download (9).png",
  "title":"nammwhjjb"
},
{"card_logo":"../img/download (10).png",
  "title":"nammwhjjb"
},
{"card_logo":"../img/download (11).png",
  "title":"nammwhjjb"
},
{"card_logo":"../img/download (12).png",
  "title":"nammwhjjb"
},
{"card_logo":"../img/download (13).png",
  "title":"nammwhjjb"
},
{"card_logo":"../img/download (4).jpg",
  "title":"nammwhjjb"
},
]




  return (
    <div className="service-page-container">

      {servicesData.length === 0 ? (
        <p className="text-center">No services available at the moment.</p>
      ) : (
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

export default BankServices;
