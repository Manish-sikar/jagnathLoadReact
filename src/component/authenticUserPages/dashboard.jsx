import { useEffect, useState } from "react";
import AuthUserHeader from "./headerUser";
import SubHeaderUser from "./subHeader";
import LoanProductList from "./loanProduct";
import { GetLoanData } from "../../services/loanDataServices";

const Dashboard = () => {
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);

  const fetchProductsByCategory = async(category) => {
const response = await GetLoanData()
const productsData = response?.loan_Data || []
    const filteredData = productsData.filter((product) => product.category === category);
    setFilteredProducts(filteredData);
    setSelectedCategory(category);
  };

  useEffect(()=>{
    fetchProductsByCategory()
  },[])

  return (
    <>
      <AuthUserHeader />
      <SubHeaderUser onCategorySelect={fetchProductsByCategory} />
      <div className="container mt-4">
        <h4>{selectedCategory ? selectedCategory.replace("_", " ").toUpperCase() : "Select a Category"}</h4>
        <LoanProductList products={filteredProducts} />
      </div>
    </>
  );
};

export default Dashboard;

 
