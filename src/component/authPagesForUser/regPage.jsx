import React, { useState, useEffect } from "react";
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
import Swal from "sweetalert2";
import { Link, useNavigate } from "react-router-dom";
import { UserRegApi } from "../../services/authServices";

const RegUserPage = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    birthday: "",
    phone: "",
    email: "",
    gender: "",
    state: "",
    district: "",
    address: "",
    password: "",
  });

  const [statesData, setStatesData] = useState([]);
  const [districts, setDistricts] = useState([]);
  const [selectedState, setSelectedState] = useState("");

  const navigate = useNavigate();

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

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleStateChange = (e) => {
    const selectedState = e.target.value;
    setSelectedState(selectedState);

    // Find districts for the selected state
    const stateData = statesData.find((state) => state.state === selectedState);
    setDistricts(stateData ? stateData.districts : []); // Set districts
    setFormData((prev) => ({ ...prev, state: selectedState, district: "" })); // Reset district
  };

  const handleDistrictChange = (e) => {
    setFormData((prev) => ({ ...prev, district: e.target.value }));
  };

  const validateForm = () => {
    const { firstName, lastName, phone, email, birthday, gender, state, district, address, password } = formData;
    if (!firstName || !lastName || !phone || !email || !birthday || !gender || !state || !district || !address || !password) {
      Swal.fire("Error", "All fields are required.", "error");
      return false;
    }
    return true;
  };

  const AddNewCustomer = async () => {
    if (!validateForm()) return;

    try {
      const response = await UserRegApi(formData); // Pass formData to API
      if (response.status === 201) {
        Swal.fire("Success", "User registered successfully!", "success");
        navigate("/login-User");
        resetForm();
      } else {
        Swal.fire("Error", "Something went wrong. Please try again.", "error");
      }
    } catch (error) {
      const errorMessage = error.response?.data?.error || "Something went wrong. Please try again.";
      Swal.fire("Error", errorMessage, "error");
    }
  };

  const resetForm = () => {
    setFormData({
      firstName: "",
      lastName: "",
      birthday: "",
      phone: "",
      email: "",
      gender: "",
      state: "",
      district: "",
      address: "",
      password: "",
    });
    setSelectedState("");
    setDistricts([]);
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
                  <h3 className="mb-5 text-uppercase fw-bold">Customer Registration Form</h3>

                  <MDBInput
                    wrapperClass="mb-4"
                    label="First Name"
                    size="lg"
                    name="firstName"
                    value={formData.firstName}
                    onChange={handleInputChange}
                  />

                  <MDBInput
                    wrapperClass="mb-4"
                    label="Last Name"
                    size="lg"
                    name="lastName"
                    value={formData.lastName}
                    onChange={handleInputChange}
                  />

                  <MDBInput
                    wrapperClass="mb-4"
                    label="Birthday"
                    size="lg"
                    name="birthday"
                    type="date"
                    value={formData.birthday}
                    onChange={handleInputChange}
                  />

                  <MDBInput
                    wrapperClass="mb-4"
                    label="Phone No"
                    size="lg"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                  />

                  <MDBInput
                    wrapperClass="mb-4"
                    label="Email ID"
                    size="lg"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                  />

                  <MDBInput
                    wrapperClass="mb-4"
                    label="Password"
                    size="lg"
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                  />

                  <div className="mb-4">
                    <label htmlFor="state" className="form-label">
                      State
                    </label>
                    <select
                      className="form-select"
                      id="state"
                      value={selectedState}
                      onChange={handleStateChange}
                    >
                      <option value="">Select State</option>
                      {statesData.map((state) => (
                        <option key={state.state} value={state.state}>
                          {state.state}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div className="mb-4">
                    <label htmlFor="district" className="form-label">
                      District
                    </label>
                    <select
                      className="form-select"
                      id="district"
                      value={formData.district}
                      onChange={handleDistrictChange}
                      disabled={!districts.length}
                    >
                      <option value="">Select District</option>
                      {districts.map((district) => (
                        <option key={district} value={district}>
                          {district}
                        </option>
                      ))}
                    </select>
                  </div>

                  <MDBInput
                    wrapperClass="mb-4"
                    label="Full Address"
                    size="lg"
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
                Have an account? <Link to="/login-User">Login here</Link>
              </MDBCol>
            </MDBRow>
          </MDBCard>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
};

export default RegUserPage;
