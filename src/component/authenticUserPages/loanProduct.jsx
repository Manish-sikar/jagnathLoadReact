import { useNavigate } from "react-router-dom";
import LoginBanner from "../bannerPages/loginBanner";
import Service from "../Service";

const LoanProductList = ({ products }) => {
  const navigate = useNavigate();

  const handleClick = (link, category, subcategory, amount) => {
    if (!link) return;

    if (typeof link === "string" && link.startsWith("http")) {
      window.location.href = link;
    } else {
      navigate(link, { state: { subcategory, category, amount } });
    }
  };

  if (!products || products.length === 0) {
    return (
      <div className="text-center mt-3">
        <LoginBanner />
        <Service />
      </div>
    );
  }

  return (
    <div className="container">
      <style>
        {`
          /* Default for larger screens (Desktop and Tablets) */
          .card-container {
            width: 18%; /* 5 cards in a row */
            margin: 0 1%; /* Margin between cards */
          }

          /* For screens smaller than 1200px (Laptops) */
          @media (max-width: 1200px) {
            .card-container {
              width: 22%; /* 4 cards in a row */
            }
          }

          /* For screens smaller than 992px (Tablets) */
          @media (max-width: 992px) {
            .card-container {
              width: 30%; /* 3 cards in a row */
            }
          }

          /* For screens smaller than 768px (Mobile Landscape) */
          @media (max-width: 768px) {
            .card-container {
              width: 48%; /* 2 cards in a row */
            }
          }

          /* For screens smaller than 576px (Mobile Portrait) */
          @media (max-width: 576px) {
            .card-container {
              width: 48%; /* 2 cards in a row */
              margin: 10px 0; /* Margin between cards */
            }

            /* Reduce font size for mobile screens */
            .card-title {
              font-size: 14px; /* Smaller font size for card title */
            }

            .card-text {
              font-size: 12px; /* Smaller font size for card text */
            }
          }

          /* Centering the cards in the row */
          .row {
            display: flex;
            flex-wrap: wrap;
            justify-content: center; /* Centers the cards */
            gap: 10px; /* Adds space between cards */
          }

          .card {
            display: flex;
            flex-direction: column;
            align-items: center;
          }

          .card-body {
            display: flex;
            flex-direction: column;
            align-items: center;
          }
        `}
      </style>
      <div className="row">
        {products.map((product, index) => (
          <div key={index} className="card-container">
            <div
              className="card shadow-sm p-2"
              onClick={() =>
                product.link && handleClick(product.link, product.category, product.category_name, product.amount)
              }
              style={{ cursor: product.link ? "pointer" : "default", width: "100%" }}
            >
              <div className="d-flex justify-content-center align-items-center" style={{ height: "50px" }}>
                <img
                  src={product.icon_pic}
                  alt={product.category_name}
                  className="card-img-top"
                  style={{ maxWidth: "100%", maxHeight: "100%", objectFit: "contain" }}
                />
              </div>
              <div className="card-body text-center">
                <h5 className="card-title">{product.category_name}</h5>
                <p className="card-text">{product.sub_category_name}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default LoanProductList;
