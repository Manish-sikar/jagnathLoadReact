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
      <div className="row justify-content-center">
        {products.map((product, index) => (
          <div key={index} className="col-md-2 col-sm-6 mb-3 d-flex justify-content-center">
            <div
              className="card shadow-sm p-2"
              onClick={() =>
                handleClick(product.link, product.category, product.category_name, product.amount)
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
