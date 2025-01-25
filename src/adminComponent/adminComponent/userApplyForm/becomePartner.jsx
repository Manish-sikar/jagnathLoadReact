import React, { useState } from "react";
import { MDBContainer, MDBCard, MDBCardBody, MDBInput, MDBBtn } from "mdb-react-ui-kit";
import Swal from "sweetalert2";
import { UserRegApi } from "../../../services/authServices";

const BecomePartnerForm = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    designation: "",
    email: "",
    mobile: "",
    institutionName: "",
    message: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const validateForm = () => {
    const { fullName, designation, email, mobile, institutionName, message } = formData;
    if (!fullName || !designation || !email || !mobile || !institutionName || !message) {
      Swal.fire("Error", "All fields are required.", "error");
      return false;
    }
    return true;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    try {
      const response = await UserRegApi(formData);
      if (response.status === 201) {
        Swal.fire("Success", "Form submitted successfully!", "success");
        setFormData({
          fullName: "",
          designation: "",
          email: "",
          mobile: "",
          institutionName: "",
          message: "",
        });
      } else {
        Swal.fire("Error", "Something went wrong. Please try again.", "error");
      }
    } catch (error) {
      Swal.fire("Error", "Failed to submit the form. Try again later.", "error");
    }
  };

  return (
    <MDBContainer fluid className="d-flex justify-content-center align-items-center vh-100" style={{ backgroundColor: "#f8f9fa" }}>
      <MDBCard className="p-5 shadow-lg rounded-4" style={{ maxWidth: "600px", border: "1px solid #007bff" }}>
        <MDBCardBody>
          <h3 className="text-center fw-bold text-primary mb-4">Become a Partner</h3>
          <p className="text-center text-muted mb-4">Only for new financial institutions.</p>

          <MDBInput
            label="Contact Person Full Name"
            required
            name="fullName"
            value={formData.fullName}
            onChange={handleInputChange}
            className="mb-4 border-primary"
          />

          <MDBInput
            label="Designation"
            required
            name="designation"
            value={formData.designation}
            onChange={handleInputChange}
            className="mb-4 border-primary"
          />

          <MDBInput
            label="Email ID"
            type="email"
            required
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            className="mb-4 border-primary"
          />

          <MDBInput
            label="Mobile"
            type="tel"
            required
            name="mobile"
            value={formData.mobile}
            onChange={handleInputChange}
            className="mb-4 border-primary"
          />

          <MDBInput
            label="Institution Name"
            required
            name="institutionName"
            value={formData.institutionName}
            onChange={handleInputChange}
            className="mb-4 border-primary"
          />

          <MDBInput
            label="Message"
            type="textarea"
            required
            name="message"
            value={formData.message}
            onChange={handleInputChange}
            className="mb-4 border-primary"
          />

          <div className="text-center">
            <MDBBtn outline color="danger" size="lg" className="rounded-pill px-5" onClick={handleSubmit}>
              Submit →
            </MDBBtn>
          </div>
        </MDBCardBody>
      </MDBCard>
    </MDBContainer>
  );
};

export default BecomePartnerForm;

