import { useEffect, useState } from "react";
import { GetBannerData } from "../../services/bannerService";
import { baseURL } from "../../services/apiService";
import { Link } from "react-router-dom";

const LoginBanner = ()=>{
  const [bannerData, setBannerData] = useState([]);

    const fetchBannerData = async () => {
        const response = await GetBannerData();
        const bannerData = response.banner_Data;
        setBannerData(bannerData.filter((slides) => slides.status === "1")); // Assuming response is an array of banner objects
      };


useEffect(()=>{
    fetchBannerData()
},[])

    return(<>
    
    <div className="container-fluid px-0">
        <div id="carouselId" className="carousel slide" data-bs-ride="carousel">
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
          <div className="carousel-inner" role="listbox">
            {bannerData.map((item, index) => (
              <div
                key={index}
                className={`carousel-item ${index === 0 ? "active" : ""}`}
              >
                <img
                  src={item.banner_img}
                  className="img-fluid"
                  alt={`Slide ${index + 1}`}
                />
                <div className="carousel-caption">
                  <div className="container carousel-content">
                    <h6 className="text-secondary h4 animated fadeInUp">
                      {item.title}
                    </h6>
                    <h1 className="text-white display-1 mb-4 animated fadeInRight">
                      {item.heading}
                    </h1>
                    <p className="mb-4 text-white fs-5 animated fadeInDown">
                      {item.desc_txt}
                    </p>
                    <Link to={item.btn_link} className="ms-2">
                      <button
                        type="button"
                        className="px-4 py-sm-3 px-sm-5 btn btn-primary rounded-pill carousel-content-btn2 animated fadeInRight"
                      >
                        {item.btn_txt}
                      </button>
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <button
            className="carousel-control-prev"
            type="button"
            data-bs-target="#carouselId"
            data-bs-slide="prev"
          >
            <span
              className="carousel-control-prev-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button
            className="carousel-control-next"
            type="button"
            data-bs-target="#carouselId"
            data-bs-slide="next"
          >
            <span
              className="carousel-control-next-icon"
              aria-hidden="true"
            ></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
      </div>
    </>)
}

export default LoginBanner;
