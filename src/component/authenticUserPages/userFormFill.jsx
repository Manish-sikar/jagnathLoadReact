import React, { useState, useEffect } from "react";
import Swal from "sweetalert2";
import { AddnewUserApplyForm } from "../../services/applyNewUserForm";

const UserFormFillPage = () => {
    const [statesData, setStatesData] = useState([]); // Store states and districts data
    const [selectedState, setSelectedState] = useState("");
    const [districts, setDistricts] = useState([]); // Districts of selected state
    const dropdownCategories = [
        { title: "Loan Products", items: loanProducts },
        { title: "Our Services", items: ourServices },
        { title: "Cards", items: cards },
        { title: "Account Opening", items: accountOpening },
        { title: "Investment", items: investment },
        { title: "Insurance", items: insurance },
        { title: "Book for New Vehicle", items: bookForVehicle },
        { title: "Report", items: report },
        { title: "Support", items: support },
      ];
    
      const [formData, setFormData] = useState({
        fullName: "",
        email: "",
        phone: "",
        panCard: "",
        state: "",
        district: "",
        fullAddress: "",
        category: "",
        subCategory: "",
      });
    
      const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
          ...prev,
          [name]: value,
        }));
      };
      useEffect(() => {
        // Fetch the JSON file
        const fetchStatesData = async () => {
          try {
            const response = await fetch("/assets/json/states-and-districts.json");
            const data = await response.json();
            setStatesData(data.states); // Set states data
          } catch (error) {
            Swal.fire("Error!", "Failed to load states and districts data.", "error");
          }
        };
    
        fetchStatesData();
      }, []);
    
      const handleStateChange = (e) => {
        const selectedState = e.target.value;
        setSelectedState(selectedState);
    
        // Find districts for the selected state
        const stateData = statesData.find((state) => state.state === selectedState);
        setDistricts(stateData ? stateData.districts : []); // Set districts
        setFormData((prev) => ({ ...prev, state: selectedState, district: "" })); // Reset district
      };

      const handleCategoryChange = (e) => {
        const [category, subCategory] = e.target.value.split("||");
        setFormData((prev) => ({
          ...prev,
          category,
          subCategory,
        }));
      };
    
      const handleSubmit = async (e) => {
        e.preventDefault();
        console.log(formData);
    
        try {
        //   const response = await fetch("API_URL", {
        //     method: "POST",
        //     headers: { "Content-Type": "application/json" },
        //     body: JSON.stringify(formData),
        //   });

          const response = await AddnewUserApplyForm(formData)
    console.log(response)
          if (response.status===201) {
            Swal.fire("Success!", "Form submitted successfully!", "success");
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
            });
            setSelectedState("");
            setDistricts([]);
          } else {
            throw new Error("Failed to submit form");
          }
        } catch (error) {
          Swal.fire("Error!", "Failed to submit the form. Try again.", "error");
        }
      };
    

  return (
    <>
      <div className="container mt-5">
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

          {/* Category */}
          <div className="form-group mb-3">
          <label htmlFor="category">Select a Category</label>
          <select
            className="form-control"
            id="category"
            name="category"
            onChange={handleCategoryChange}
            required
          >
            <option value="" disabled>
              Choose a category...
            </option>
            {dropdownCategories.map((category, index) => (
              <optgroup key={index} label={category.title}>
                {category.items.map((item, i) => (
                  <option key={i} value={`${category.title}||${item}`}>
                    {item}
                  </option>
                ))}
              </optgroup>
            ))}
          </select>
        </div>


          {/* Submit */}
          <button type="submit" className="btn btn-primary w-100">
            Submit
          </button>
        </form>
      </div>
    </>
  );
};

export default UserFormFillPage;

// Dropdown Data
const loanProducts = ["Agri loan", "Home loan", "Auto loan", "Two-wheeler loan", "Three-wheeler loan"];
const ourServices = ["ITR", "GST registration", "GST return", "New PAN card", "PAN card correction"];
const cards = ["AU Bank credit card", "IndusInd Bank credit card", "Axis Bank credit card"];
const accountOpening = ["AU Bank", "IndusInd Bank", "Axis Bank"];
const investment = ["RD", "FD"];
const insurance = ["Car insurance", "Two-wheeler insurance", "Commercial insurance"];
const bookForVehicle = ["Mahindra", "Kia", "Maruti Suzuki", "Tata"];
const report = ["Lead data", "Lead commission"];
const support = ["Contact number", "Gmail"];
