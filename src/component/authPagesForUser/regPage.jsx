import React, { useState } from "react";
import {
  MDBBtn,
  MDBContainer,
  MDBCard,
  MDBCardBody,
  MDBCardImage,
  MDBRow,
  MDBCol,
  MDBInput,
  MDBRadio,
} from "mdb-react-ui-kit";
import Select from "react-select";
import { UserRegApi } from "../../services/authServices";
import Swal from "sweetalert2"; // Import SweetAlert
import { Link, useNavigate } from "react-router-dom";

const RegUserPage = () => {
  const stateOptions = [
    { label: "State", value: 1 },
    { label: "Option 1", value: 2 },
    { label: "Option 2", value: 3 },
    { label: "Option 3", value: 4 },
  ];

  const cityOptions = [
    { label: "City", value: 1 },
    { label: "Option 1", value: 2 },
    { label: "Option 2", value: 3 },
    { label: "Option 3", value: 4 },
  ];

  // Local state for form data
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    birthday: "",
    phone: "",
    email: "",
    gender: "",
    state: "",
    city: "",
    address: "",
    password: "",
  });
const navigate = useNavigate()
 


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value, // Store the date as a string
    });
  };
  
  // Handle select change
  const handleSelectChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Form validation function
  const validateForm = () => {
    const { firstName, lastName, phone, email, birthday, gender, state, city, address, password } = formData;
    if (!firstName || !lastName || !phone || !email || !birthday || !gender || !state || !city || !address || !password) {
      Swal.fire("Error", "All fields are required.", "error");
      return false;
    }
    return true;
  };
 


  const AddNewCustomer = async () => {
    if (!validateForm()) return; // If form is invalid, stop here
  
    try {
      const response = await UserRegApi(formData); // Pass formData to API
      console.log(response, "response");
      
      if (response.status === 201) {
        Swal.fire("Success", "User registered successfully!", "success");
        navigate("/login-User")
        resetForm(); // Optionally reset form after success
      } else {
        Swal.fire("Error", "Something went wrong. Please try again.", "error");
      }
    } catch (error) {
      // Extract the error message from the response
      const errorMessage = error.response?.data?.error || "Something went wrong. Please try again.";
      Swal.fire("Error", errorMessage, "error");
    }
  };
  

  // Reset form
  const resetForm = () => {
    setFormData({
      firstName: "",
      lastName: "",
      birthday: "",
      phone: "",
      email: "",
      gender: "",
      state: "",
      city: "",
      address: "",
      password: "",
    });
  };

  return (
    <MDBContainer fluid className="bg-dark">
      <MDBRow className="d-flex justify-content-center align-items-center h-100">
        <MDBCol>
          <MDBCard className="my-4">
            <MDBRow className="g-0">
              <MDBCol md="6" className="d-none d-md-block">
                <MDBCardImage
                  src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-registration/img4.webp"
                  alt="Sample photo"
                  className="rounded-start"
                  fluid
                />
              </MDBCol>

              <MDBCol md="6">
                <MDBCardBody className="text-black d-flex flex-column justify-content-center">
                  <h3 className="mb-5 text-uppercase fw-bold">
                    Customer Registration Form
                  </h3>

                  <MDBRow>
                    <MDBCol md="6">
                      <MDBInput
                        wrapperClass="mb-4"
                        label="First Name"
                        size="lg"
                        id="form1"
                        type="text"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                      />
                    </MDBCol>

                    <MDBCol md="6">
                      <MDBInput
                        wrapperClass="mb-4"
                        label="Last Name"
                        size="lg"
                        id="form2"
                        type="text"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                      />
                    </MDBCol>
                  </MDBRow>

                  <MDBInput
                    wrapperClass="mb-4"
                    label="Birthday"
                    size="lg"
                    id="form3"
                    type="date"
                    name="birthday"
                    value={formData.birthday}
                    onChange={handleInputChange}
                  />

                  <MDBInput
                    wrapperClass="mb-4"
                    label="Phone No"
                    size="lg"
                    id="form5"
                    type="text"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                  />
                  <MDBInput
                    wrapperClass="mb-4"
                    label="Email ID"
                    size="lg"
                    id="form6"
                    type="text"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                  />
                  <MDBInput
                    wrapperClass="mb-4"
                    label="Password"
                    size="lg"
                    id="form7"
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                  />
                  <div className="d-md-flex justify-content-start align-items-center mb-4">
                    <h6 className="fw-bold mb-0 me-4">Gender: </h6>
                    <MDBRadio
                      name="gender"
                      id="inlineRadio1"
                      value="Female"
                      label="Female"
                      inline
                      checked={formData.gender === "Female"}
                      onChange={handleInputChange}
                    />
                    <MDBRadio
                      name="gender"
                      id="inlineRadio2"
                      value="Male"
                      label="Male"
                      inline
                      checked={formData.gender === "Male"}
                      onChange={handleInputChange}
                    />
                    <MDBRadio
                      name="gender"
                      id="inlineRadio3"
                      value="Other"
                      label="Other"
                      inline
                      checked={formData.gender === "Other"}
                      onChange={handleInputChange}
                    />
                  </div>

                  <MDBRow>
                    <MDBCol md="6">
                      <Select
                        className="mb-4"
                        options={stateOptions}
                        placeholder="Select State"
                        value={stateOptions.find((option) => option.value === formData.state)}
                        onChange={(selectedOption) => handleSelectChange("state", selectedOption?.value)}
                      />
                    </MDBCol>

                    <MDBCol md="6">
                      <Select
                        className="mb-4"
                        options={cityOptions}
                        placeholder="Select City"
                        value={cityOptions.find((option) => option.value === formData.city)}
                        onChange={(selectedOption) => handleSelectChange("city", selectedOption?.value)}
                      />
                    </MDBCol>
                  </MDBRow>

                  <MDBInput
                    wrapperClass="mb-4"
                    label="Full Address"
                    size="lg"
                    id="form4"
                    type="textarea"
                    name="address"
                    value={formData.address}
                    onChange={handleInputChange}
                  />

                  <div className="d-flex justify-content-end pt-3">
                    <MDBBtn color="light" size="lg" onClick={resetForm}>
                      Reset all
                    </MDBBtn>
                    <MDBBtn className="ms-2" color="warning" size="lg" onClick={AddNewCustomer}>
                      Submit form
                    </MDBBtn>
                  </div>
                </MDBCardBody>
               Have an account? <Link to="/login-User"> Login here </Link> 
              </MDBCol>
            </MDBRow>
          </MDBCard>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
};

export default RegUserPage;
