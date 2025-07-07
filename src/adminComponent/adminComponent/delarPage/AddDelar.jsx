import React, { useState } from "react";
import Swal from "sweetalert2";
import { MDBBtn } from "mdb-react-ui-kit";
import { UserRegApi } from "../../../services/authServices"; // Ensure this is pointing to the correct service
import { useNavigate } from "react-router-dom";
import { addDelar } from "../../../services/delarServices";

const AddDelarPage = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  

  const [errors, setErrors] = useState({});
const navigate = useNavigate()


const handleInputChange = (e) => {
  const { name, value, files } = e.target;
  const newValue = name === "Avtar" ? files[0] : value;

  setFormData((prev) => ({
    ...prev,
    [name]: newValue,
  }));
};


  const validateForm = () => {
    let validationErrors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!formData.email) validationErrors.email = "Email is required.";
    else if (!emailRegex.test(formData.email)) validationErrors.email = "Invalid email format.";
  
    setErrors(validationErrors);

    return Object.keys(validationErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;
    try {
    
  
      const response = await addDelar(formData); // this function must support FormData
      if (response.status === 201) {
        Swal.fire({
          icon: "success",
          title: "Success",
          text: "Form submitted successfully!",
          timer: 2000, // Auto close after 2 seconds
          showConfirmButton: false,
        });
  
        setTimeout(() => {
          setFormData({
            email: "",
            password: "",
          });
          navigate("/admin/viewDelarData");
        }, 2000); // Delay navigation for 2 seconds
      } else {
        Swal.fire("Error", "Something went wrong. Please try again.", "error");
      }
    } catch (error) {
        const errormessage = error.response.data.error
      Swal.fire("Error", errormessage, "error");
    }
  };
  

  return (
 
          <div className="card shadow-lg rounded-4 border-0">
            <div className="card-body p-5">
              <h3 className="text-center text-primary fw-bold mb-4">Become a Delar</h3>
              <p className="text-center text-muted mb-4">Join us as a Delar and grow together!</p>

              {/* Form Fields */}
              {[
                { label: "Email ID", name: "email", type: "email", placeholder: "Enter email" },
                { label: "Password", name: "password", type: "password", placeholder: "Enter password" },
                 
                ].map((field) => (
                  <div className="form-group mb-4" key={field.name}>
                    <label className="form-label">{field.label}</label>
                
                    {field.type === "Img" ? (
                      <input
                        type="file"
                        accept="image/*"
                        className={`form-control ${errors[field.name] ? "is-invalid" : ""}`}
                        name={field.name}
                        onChange={handleInputChange}
                      />
                    ) : field.type === "textarea" ? (
                      <textarea
                        className={`form-control ${errors[field.name] ? "is-invalid" : ""}`}
                        placeholder={field.placeholder}
                        name={field.name}
                        value={formData[field.name]}
                        onChange={handleInputChange}
                      ></textarea>
                    ) : (
                      <input
                        type={field.type}
                        className={`form-control ${errors[field.name] ? "is-invalid" : ""}`}
                        placeholder={field.placeholder}
                        name={field.name}
                        value={formData[field.name]}
                        onChange={handleInputChange}
                      />
                    )}
                
                    {errors[field.name] && (
                      <div className="invalid-feedback">{errors[field.name]}</div>
                    )}
                  </div>
                ))}
                

              {/* Submit Button */}
              <div className="text-center">
                <MDBBtn outline color="primary" size="lg" className="rounded-pill px-5" onClick={handleSubmit}>
                  Submit →
                </MDBBtn>
              </div>
            </div>
          </div>
       
  );
};

export default AddDelarPage;
