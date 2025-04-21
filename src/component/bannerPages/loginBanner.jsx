import { useEffect, useState } from "react";
import { GetBannerData } from "../../services/bannerService";

const LoginBanner = () => {
  const [bannerData, setBannerData] = useState([]);

  const fetchBannerData = async () => {
    const response = await GetBannerData();
    const bannerData = response.banner_Data;
    setBannerData(bannerData.filter((slides) => slides.status === "1"));
  };

  useEffect(() => {
    fetchBannerData();
  }, []);

  return (
    <div className="container-fluid px-0">
      <div id="carouselId" className="carousel slide" data-bs-ride="carousel">
        {/* Carousel Indicators */}
        <ol className="carousel-indicators">
          {bannerData?.map((_, index) => (
            <li
              key={index}
              data-bs-target="#carouselId"
              data-bs-slide-to={index}
              className={index === 0 ? "active" : ""}
              aria-current={index === 0 ? "true" : undefined}
              aria-label={`Slide ${index + 1}`}
            ></li>
          ))}
        </ol>

        {/* Carousel Items */}
        <div className="carousel-inner">
          {bannerData.map((item, index) => (
            <div key={index} className={`carousel-item ${index === 0 ? "active" : ""}`}>
             <img
  src={item.banner_img}
  className="d-block w-100 img-fluid banner-image"
  alt={`Slide ${index + 1}`}
/>
              <div className="carousel-caption d-none d-md-block">
                {/* Add any text or buttons here if needed */}
              </div>
            </div>
          ))}
        </div>

        {/* Carousel Controls */}
        <button className="carousel-control-prev" type="button" data-bs-target="#carouselId" data-bs-slide="prev">
          <span className="carousel-control-prev-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button className="carousel-control-next" type="button" data-bs-target="#carouselId" data-bs-slide="next">
          <span className="carousel-control-next-icon" aria-hidden="true"></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
    </div>
  );
};

export default LoginBanner;
