
import { useEffect, useState } from "react";
import AuthUserHeader from "./headerUser";
import SubHeaderUser from "./subHeader";
import LoanProductList from "./loanProduct";
import { GetLoanData } from "../../services/loanDataServices";
import ReportPage from "./reportPage";

const Dashboard = () => {
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const fetchProductsByCategory = async (category) => {
    if (category === "report") {
      setSelectedCategory("report");
      return;
    }
    const response = await GetLoanData();
    const productsData = response?.loan_Data || [];
    const filteredData = productsData.filter((product) => product.category === category);
    setFilteredProducts(filteredData);
    setSelectedCategory(category);
  };

  useEffect(() => {
    if (selectedCategory && selectedCategory !== "report") {
      fetchProductsByCategory(selectedCategory);
    }
  }, [selectedCategory]);

  return (
    <>
      <AuthUserHeader />
      <SubHeaderUser onCategorySelect={fetchProductsByCategory} />
      <div className="container mt-4">
        {selectedCategory === "report" ? (
          <ReportPage />
        ) : (
          <LoanProductList products={filteredProducts} />
        )}
      </div>
    </>
  );
};

export default Dashboard;

