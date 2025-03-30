import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { AddnewUserApplyForm } from "../../services/applyNewUserForm";
import {  useLocation, useNavigate } from "react-router-dom";
import { useAuthUser } from "../authPagesForUser/contexUser";

const UserFormFillPage = () => {
  const [statesData, setStatesData] = useState([]);
  const [selectedState, setSelectedState] = useState("");
  const [districts, setDistricts] = useState([]);
  const [receiptData, setReceiptData] = useState(null);
  const navigate = useNavigate();
  const location = useLocation();
  const {setuserBalance} = useAuthUser();
 
  const partnerEmail = JSON.parse(localStorage.getItem("partnerEmail") || '""');

  const [formData, setFormData] = useState({
    partnerEmail,
    fullName: "",
    email: "",
    phone: "",
    panCard: "",
    state: "",
    district: "",
    fullAddress: "",
  category: location.state?.category || "",
    subCategory: location.state?.subcategory || "",
    amount: location.state?.amount || 0,
    document1: null,
    document2: null,
    document3: null,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    if (files.length > 0) {
      setFormData((prev) => ({
        ...prev,
        [name]: files[0],
      }));
    }
  };

  useEffect(() => {
    const fetchStatesData = async () => {
      try {
        const response = await fetch("/assets/json/states-and-districts.json");
        const data = await response.json();
        setStatesData(data.states);
      } catch (error) {
        Swal.fire(
          "Error!",
          "Failed to load states and districts data.",
          "error"
        );
      }
    };
    fetchStatesData();
  }, []);

  const handleStateChange = (e) => {
    const selectedState = e.target.value;
    setSelectedState(selectedState);
    const stateData = statesData.find((state) => state.state === selectedState);
    setDistricts(stateData ? stateData.districts : []);
    setFormData((prev) => ({ ...prev, state: selectedState, district: "" }));
  };

  const handleCategoryChange = (e) => {
    const [category, subCategory] = e.target.value.split("||");
    setFormData((prev) => ({
      ...prev,
      category,
      subCategory,
    }));
  };


  useEffect(() => {
    if (receiptData) {
      handlePrint()
    }
  }, [receiptData]);


  
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formDataToSubmit = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (value) {
        formDataToSubmit.append(key, value);
      }
    });
 

    try {
      const response = await AddnewUserApplyForm(formDataToSubmit);
      if (response.status === 201) {
        setReceiptData({
          companyName: "JASNATH FINANCE",
          customerName: formData.fullName,
          category: formData.subCategory,
          price: formData.amount,
          orderDate: new Date().toLocaleDateString(),
          userId: response.data.form_user_id,
          paymentStatus: "PAID",
        });
        setFormData({
          fullName: "",
          email: "",
          phone: "",
          panCard: "",
          state: "",
          district: "",
          fullAddress: "",
          category: "",
          subCategory: "",
          document1: null,
          document2: null,
          document3: null,
        });
        setSelectedState("");
        setDistricts([]);
        setuserBalance(response.data.user_balance);
      } else {
        throw new Error("Failed to submit form");
      }
    } catch (error) {
      console.log(error.response.data.err)
      const errMessage = error.response.data.err
      Swal.fire("Error!", errMessage, "error");
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <>
      <div className="container mt-5">
      {receiptData ? (
      <div className="receipt card shadow-lg p-4 mt-4" style={{ maxWidth: '600px', margin: 'auto' }}>
      {/* Data Table with Logo */}
      <table className="table table-bordered" border={2}>
        <thead>
          <tr>
            <th colSpan={2} className="text-center">
              <img src="./img/jasnathNewPrintIcon.png" alt="JASNATH FINANCE Logo" style={{ height: '320px' }} />
            </th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th>Customer Name</th>
            <td>{receiptData.customerName}</td>
          </tr>
          <tr>
            <th>User Id</th>
            <td>{partnerEmail}</td>
          </tr>
          <tr>
            <th>Category</th>
            <td>{receiptData.category}</td>
          </tr>
          <tr>
            <th>Price</th>
            <td>₹{receiptData.price}</td>
          </tr>
          <tr>
            <th>Order Date</th>
            <td>{receiptData.orderDate}</td>
          </tr>
          <tr>
            <th>Order Id</th>
            <td>{receiptData.userId}</td>
          </tr>
          <tr>
            <th>Payment Status</th>
            <td className={receiptData.paymentStatus === 'PAID' ? 'text-success fw-bold' : 'text-danger fw-bold'}>
              {receiptData.paymentStatus}
            </td>
          </tr>
        </tbody>
      </table>

      {/* Action Buttons (Hide During Print) */}
      <div className="d-flex justify-content-center gap-3 mt-4 d-print-none">
        <button className="btn btn-primary" onClick={handlePrint}>🖨️ Print Receipt</button>
        <button className="btn btn-danger" onClick={() => navigate('/dashboard')}>❌ Cancel</button>
      </div>
    </div>
      ) : (
        <>
        <h2 className="text-center mb-4">User Form</h2>
        <form onSubmit={handleSubmit}>
          {/* Full Name */}
          <div className="form-group mb-3">
            <label htmlFor="fullName">Full Name</label>
            <input
              type="text"
              className="form-control"
              id="fullName"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              placeholder="Enter your full name"
              required
            />
          </div>

          {/* Email */}
          <div className="form-group mb-3">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              className="form-control"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              required
            />
          </div>

          {/* Phone */}
          <div className="form-group mb-3">
            <label htmlFor="phone">Phone Number</label>
            <input
              type="tel"
              className="form-control"
              id="phone"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Enter your phone number"
              required
            />
          </div>

          {/* PAN Card */}
          <div className="form-group mb-3">
            <label htmlFor="panCard">PAN Card Number</label>
            <input
              type="text"
              className="form-control"
              id="panCard"
              name="panCard"
              value={formData.panCard}
              onChange={handleChange}
              placeholder="Enter your PAN card number"
              required
            />
          </div>

          {/* State */}
          <div className="form-group mb-3">
            <label htmlFor="state">State</label>
            <select
              className="form-control"
              id="state"
              name="state"
              value={formData.state}
              onChange={handleStateChange}
              required
            >
              <option value="" disabled>
                Choose your state...
              </option>
              {statesData.map((state, index) => (
                <option key={index} value={state.state}>
                  {state.state}
                </option>
              ))}
            </select>
          </div>

          {/* District */}
          <div className="form-group mb-3">
            <label htmlFor="district">District</label>
            <select
              className="form-control"
              id="district"
              name="district"
              value={formData.district}
              onChange={handleChange}
              required
            >
              <option value="" disabled>
                Choose your district...
              </option>
              {districts.map((district, index) => (
                <option key={index} value={district}>
                  {district}
                </option>
              ))}
            </select>
          </div>

          {/* Full Address */}
          <div className="form-group mb-3">
            <label htmlFor="fullAddress">Full Address</label>
            <textarea
              className="form-control"
              id="fullAddress"
              name="fullAddress"
              rows="3"
              value={formData.fullAddress}
              onChange={handleChange}
              placeholder="Enter your full address here"
              required
            ></textarea>
          </div>

          
              {/* Category Auto-Fill */}
        <div className="form-group mb-3">
          <label htmlFor="category">Category</label>
          <input type="text" className="form-control" id="category" name="category" value={formData.category} readOnly />
        </div>

        {/* SubCategory Auto-Fill */}
        <div className="form-group mb-3">
          <label htmlFor="subCategory">SubCategory</label>
          <input type="text" className="form-control" id="subCategory" name="subCategory" value={formData.subCategory} readOnly />
        </div>
          <div className="form-group mb-3">
            <label htmlFor="document1">Upload Document 1 (Optional)</label>
            <input
              type="file"
              className="form-control"
              id="document1"
              name="document1"
              onChange={handleFileChange}
              accept="image/*,.pdf,.doc,.docx"
            />
          </div>
          <div className="form-group mb-3">
            <label htmlFor="document2">Upload Document 2 (Optional)</label>
            <input
              type="file"
              className="form-control"
              id="document2"
              name="document2"
              onChange={handleFileChange}
              accept="image/*,.pdf,.doc,.docx"
            />
          </div>
          <div className="form-group mb-3">
            <label htmlFor="document3">Upload Document 3 (Optional)</label>
            <input
              type="file"
              className="form-control"
              id="document3"
              name="document3"
              onChange={handleFileChange}
              accept="image/*,.pdf,.doc,.docx"
            />
          </div>

          {/* Submit */}
          <button type="submit" className="btn btn-primary w-100">
            Submit
          </button>
        </form>

        </>
      )}
      </div>
    </>
  );
};

export default UserFormFillPage;
 
