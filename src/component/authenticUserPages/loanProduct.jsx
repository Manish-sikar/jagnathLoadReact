import { useNavigate } from "react-router-dom";

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
    return <p className="text-center mt-3">No products available. Please select a category.</p>;
  }

  return (
    <div className="row">
      {products.map((product, index) => (
        <div className="col-md-4" key={index}>
          <div 
            className="card shadow-sm p-3 mb-4"
            onClick={() => handleClick(product.link)} 
            style={{ cursor: product.link ? "pointer" : "default" }} // Disable pointer if no link
          >
            <img
              src={product.icon_pic}
              alt={product.category_name}
              className="card-img-top"
              style={{ height: "150px", objectFit: "cover" }}
            />
            <div className="card-body">
              <h5 className="card-title">{product.category_name}</h5>
              <p className="card-text">{product.sub_category_name}</p>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default LoanProductList;
