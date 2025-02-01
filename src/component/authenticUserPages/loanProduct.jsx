import { useNavigate } from "react-router-dom";
import LoginBanner from "../bannerPages/loginBanner";
import Service from "../Service";

const LoanProductList = ({ products }) => {
  const navigate = useNavigate();

  const handleClick = (link) => {
    if (!link) return;
    if (typeof link === "string" && link.startsWith("http")) {
      window.location.href = link;
    } else {
      navigate(link);
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
        {products.map((product, index) => {
          // Skip odd indices to avoid repetition
          if (index % 2 !== 0) return null;

          return (
            <div
              key={index}
              className="d-flex justify-content-center mb-4"
              style={{
                width: "100%",
                display: "flex",
                justifyContent: "space-between",
              }}
            >
              {/* Empty Space - 10% */}
              <div style={{ width: "10%" }}></div>

              {/* First Image Card - 35% */}
              <div style={{ width: "35%" }}>
                <div
                  className="card shadow-sm p-2"
                  onClick={() => product.link && handleClick(product.link)}
                  style={{
                    cursor: product.link ? "pointer" : "default",
                    width: "100%",
                  }}
                >
                  <div
                    className="d-flex justify-content-center align-items-center"
                    style={{ height: "50px" }}
                  >
                    <img
                      src={product.icon_pic}
                      alt={product.category_name}
                      className="card-img-top"
                      style={{
                        maxWidth: "100%",
                        maxHeight: "100%",
                        objectFit: "contain",
                      }}
                    />
                  </div>
                  <div className="card-body text-center">
                    <h5 className="card-title">{product.category_name}</h5>
                    <p className="card-text">{product.sub_category_name}</p>
                  </div>
                </div>
              </div>

              {/* Empty Space - 10% */}
              <div style={{ width: "10%" }}></div>

              {/* Second Image Card - 35% */}
              {products[index + 1] && (
                <div style={{ width: "35%" }}>
                  <div
                    className="card shadow-sm p-2"
                    onClick={() => products[index + 1].link && handleClick(products[index + 1].link)}
                    style={{
                      cursor: products[index + 1].link ? "pointer" : "default",
                      width: "100%",
                    }}
                  >
                    <div
                      className="d-flex justify-content-center align-items-center"
                      style={{ height: "50px" }}
                    >
                      <img
                        src={products[index + 1].icon_pic}
                        alt={products[index + 1].category_name}
                        className="card-img-top"
                        style={{
                          maxWidth: "100%",
                          maxHeight: "100%",
                          objectFit: "contain",
                        }}
                      />
                    </div>
                    <div className="card-body text-center">
                      <h5 className="card-title">{products[index + 1].category_name}</h5>
                      <p className="card-text">{products[index + 1].sub_category_name}</p>
                    </div>
                  </div>
                </div>
              )}

              {/* Empty Space - 10% */}
              <div style={{ width: "10%" }}></div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default LoanProductList;
