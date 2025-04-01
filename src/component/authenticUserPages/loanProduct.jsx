// import { useNavigate } from "react-router-dom";
// import LoginBanner from "../bannerPages/loginBanner";
// import Service from "../Service";

// const LoanProductList = ({ products }) => {
//   const navigate = useNavigate();

//   const handleClick = (link,  category ,subcategory,amount) => {
//     if (!link) return;

//     if (typeof link === "string" && link.startsWith("http")) {
//       window.location.href = link;
//     } else {
//       navigate(link, { state: { subcategory, category ,amount } });
//     }
//   };

//   if (!products || products.length === 0) {
//     return (
//       <div className="text-center mt-3">
//         <LoginBanner />
//         <Service />
//       </div>
//     );
//   }

//   return (
//     <div className="container">
//       <div className="row justify-content-center">
//         {products.map((product, index) => {
//           if (index % 2 !== 0) return null;

//           return (
//             <div key={index} className="d-flex justify-content-center mb-4" style={{ width: "100%", display: "flex", justifyContent: "space-between" }}>
//               <div style={{ width: "10%" }}></div>

//               {/* First Image Card */}
//               <div style={{ width: "35%" }}>
//                 <div
//                   className="card shadow-sm p-2"
//                   onClick={() => product.link && handleClick(product.link, product.category, product.category_name , product.amount )}
//                   style={{ cursor: product.link ? "pointer" : "default", width: "100%" }}
//                 >
//                   <div className="d-flex justify-content-center align-items-center" style={{ height: "50px" }}>
//                     <img
//                       src={product.icon_pic}
//                       alt={product.category_name}
//                       className="card-img-top"
//                       style={{ maxWidth: "100%", maxHeight: "100%", objectFit: "contain" }}
//                     />
//                   </div>
//                   <div className="card-body text-center">
//                     <h5 className="card-title">{product.category_name}</h5>
//                     <p className="card-text">{product.sub_category_name}</p>
//                   </div>
//                 </div>
//               </div>

//               <div style={{ width: "10%" }}></div>

//               {/* Second Image Card */}
//               {products[index + 1] && (
//                 <div style={{ width: "35%" }}>
//                   <div
//                     className="card shadow-sm p-2"
//                     onClick={() => handleClick(products[index + 1].link, products[index + 1].sub_category_name, products[index + 1].category_name)}
//                     style={{ cursor: products[index + 1].link ? "pointer" : "default", width: "100%" }}
//                   >
//                     <div className="d-flex justify-content-center align-items-center" style={{ height: "50px" }}>
//                       <img
//                         src={products[index + 1].icon_pic}
//                         alt={products[index + 1].category_name}
//                         className="card-img-top"
//                         style={{ maxWidth: "100%", maxHeight: "100%", objectFit: "contain" }}
//                       />
//                     </div>
//                     <div className="card-body text-center">
//                       <h5 className="card-title">{products[index + 1].category_name}</h5>
//                       <p className="card-text">{products[index + 1].sub_category_name}</p>
//                     </div>
//                   </div>
//                 </div>
//               )}

//               <div style={{ width: "10%" }}></div>
//             </div>
//           );
//         })}
//       </div>
//     </div>
//   );
// };

// export default LoanProductList;


import { useNavigate } from "react-router-dom";
import LoginBanner from "../bannerPages/loginBanner";
import Service from "../Service";

const LoanProductList = ({ products, refreshBalance }) => {
  const navigate = useNavigate();

  const handleClick = (link, category, subcategory, amount) => {
    if (!link) return;

    if (typeof link === "string" && link.startsWith("http")) {
      window.location.href = link;
    } else {
      navigate(link, { state: { subcategory, category, amount, refreshBalance } });
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
                <h5
                  className="card-title"
                  style={{ fontSize: "1rem" }} // Default font size
                >
                  {product.category_name}
                </h5>
                <p
                  className="card-text"
                  style={{ fontSize: "0.9rem" }} // Slightly smaller
                >
                  {product.sub_category_name}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Responsive Font Size for Mobile */}
      <style>
        {`
          @media (max-width: 768px) {
            .card-title { font-size: 0.7rem !important; } /* Smaller on tablets */
            .card-text { font-size: 0.7rem !important; }
          }
          @media (max-width: 480px) {
            .card-title { font-size: 0.6rem !important; } /* Even smaller on mobile */
            .card-text { font-size: 0.6rem !important; }
          }
          @media (max-width: 360px) {
            .card-title { font-size: x-small !important; } /* Extra small for very small screens */
            .card-text { font-size: x-small !important; }
          }
        `}
      </style>
    </div>
  );
};

export default LoanProductList;

