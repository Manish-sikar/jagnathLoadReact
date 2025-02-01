import { useNavigate } from "react-router-dom";
import LoginBanner from "../bannerPages/loginBanner";
import Service from "../Service";

const LoanProductList = ({ products }) => {
  const navigate = useNavigate();

  const handleClick = (link) => {
    if (!link) return; // Prevent errors if link is undefined

    if (typeof link === "string" && link.startsWith("http")) {
      window.location.href = link; // Redirect to external site
    } else {
      navigate(link); // Navigate within the app
    }
  };

  if (products.length === 0) {
    return <p className="text-center mt-3">
      <LoginBanner></LoginBanner>
      <Service></Service>
    </p>;
  }

  return (
    <div className="d-flex justify-content-center" style={{ width: "100%" }}>
    <div className="d-flex" style={{ width: "100%", justifyContent: "space-between" }}>
      {/* Empty 10% */}
      <div style={{ width: "10%" }}></div>
  
      {/* First Image Card - 20% */}
      <div style={{ width: "20%" }}>
        <div 
          className="card shadow-sm p-2 mb-4"
          onClick={() => products[0]?.link && handleClick(products[0].link)}
          style={{ cursor: products[0]?.link ? "pointer" : "default" }}
        >
          <div className="d-flex justify-content-center align-items-center" style={{ height: "50px" }}>
            <img
              src={products[0]?.icon_pic}
              alt={products[0]?.category_name}
              className="card-img-top"
              style={{ maxWidth: "100%", maxHeight: "100%", objectFit: "contain" }}
            />
          </div>
          <div className="card-body text-center">
            <h5 className="card-title">{products[0]?.category_name}</h5>
            <p className="card-text">{products[0]?.sub_category_name}</p>
          </div>
        </div>
      </div>
  
      {/* Empty 40% */}
      <div style={{ width: "40%" }}></div>
  
      {/* Second Image Card - 20% */}
      <div style={{ width: "20%" }}>
        <div 
          className="card shadow-sm p-2 mb-4"
          onClick={() => products[1]?.link && handleClick(products[1].link)}
          style={{ cursor: products[1]?.link ? "pointer" : "default" }}
        >
          <div className="d-flex justify-content-center align-items-center" style={{ height: "50px" }}>
            <img
              src={products[1]?.icon_pic}
              alt={products[1]?.category_name}
              className="card-img-top"
              style={{ maxWidth: "100%", maxHeight: "100%", objectFit: "contain" }}
            />
          </div>
          <div className="card-body text-center">
            <h5 className="card-title">{products[1]?.category_name}</h5>
            <p className="card-text">{products[1]?.sub_category_name}</p>
          </div>
        </div>
      </div>
  
      {/* Empty 10% */}
      <div style={{ width: "10%" }}></div>
    </div>
  </div>
  
  
  
  );
};

export default LoanProductList;
