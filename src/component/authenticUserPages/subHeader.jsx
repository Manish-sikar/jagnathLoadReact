

import React from "react";

const SubHeaderUser = ({ onCategorySelect }) => {
  const dropdownData = [
    { title: "Loan Products", category: "loan_product" },
    { title: "Our Services", category: "our_service" },
    { title: "Cards", category: "cards" },
    { title: "Account Opening", category: "account_opening" },
    { title: "Investment", category: "investment" },
    { title: "Insurance", category: "insurance" },
    { title: "E-Store", category: "e_store" },
    { title: "Report", category: "report" },
    { title: "Support", category: "support" },
  ];

  return (
   

    <nav class="navbar bg-body-tertiary">
  <form class="container-fluid justify-content-start">
  {dropdownData.map((dropdown, index) => (
            <div
              key={index}
              className="sub-header-item text-white text-center"
              onClick={() => onCategorySelect(dropdown.category)}
            >
    <button class="btn btn-outline-success me-2 bg-dark mx-1" type="button">{dropdown.title}</button>

    </div>
          ))}
  </form>
</nav>
  );
};

export default SubHeaderUser;

