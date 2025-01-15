import React, { useState } from "react";
import {
  MDBContainer,
  MDBCol,
  MDBRow,
  MDBBtn,
  MDBIcon,
  MDBInput,
  MDBCheckbox,
} from "mdb-react-ui-kit";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2"; // Import Swal for alert messages
import { UserLoginApi } from "../../services/authServices"; // Import API function
import { useAuthUser } from "./contexUser";

const LoginUser = () => {
  const [emailORphone, setEmailORPhone] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { setTokenUser, setDataUser } = useAuthUser();
 
  const handleLogin = async (e) => {
    e.preventDefault();

    if (!emailORphone || !password) {
      Swal.fire("Error", "All fields are required!", "error");
      return;
    }

    try {
      const response = await UserLoginApi({ emailORphone, password });
      if (response.token) {
        // Save token and user data
        // console.log(response.token , "token" ,response.user_name )
        localStorage.setItem("authTokenUser", response.token);
        setTokenUser(response.token);
        setDataUser(response.user_name);

        Swal.fire("Success", "Login successful!", "success");
        navigate("/dashboard"); // Redirect to admin dashboard
      }
    } catch (error) {
      const errorMessage =
        error.response?.data?.error || "Login failed. Please try again.";
      Swal.fire("Error", errorMessage, "error");
    }
  };

  return (
    <MDBContainer fluid className="p-3 my-5">
      <MDBRow>
        <MDBCol col="10" md="6">
          <img
            src="https://mdbcdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.svg"
            className="img-fluid"
            alt="Phone illustration"
          />
        </MDBCol>

        <MDBCol col="4" md="6">
          <form onSubmit={handleLogin}>
            <MDBInput
              wrapperClass="mb-4"
              label="Email or Phone"
              id="emailORphone"
              type="text"
              size="lg"
              value={emailORphone}
              onChange={(e) => setEmailORPhone(e.target.value)}
            />
            <MDBInput
              wrapperClass="mb-4"
              label="Password"
              id="password"
              type="password"
              size="lg"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <div className="d-flex justify-content-between mx-4 mb-4">
              <MDBCheckbox
                name="flexCheck"
                value=""
                id="flexCheckDefault"
                label="Remember me"
              />
              <a href="!#">Forgot password?</a>
            </div>

            <MDBBtn className="mb-4 w-100" size="lg" type="submit">
              Sign in
            </MDBBtn>
          </form>

          <div className="divider d-flex align-items-center my-4">
            <p className="text-center fw-bold mx-3 mb-0">OR</p>
          </div>

          <MDBBtn
            className="mb-4 w-100"
            size="lg"
            style={{ backgroundColor: "#3b5998" }}
          >
            <MDBIcon fab icon="facebook-f" className="mx-2" />
            Continue with Facebook
          </MDBBtn>

          <MDBBtn
            className="mb-4 w-100"
            size="lg"
            style={{ backgroundColor: "#55acee" }}
          >
            <MDBIcon fab icon="twitter" className="mx-2" />
            Continue with Twitter
          </MDBBtn>

          <div className="d-flex justify-content-between mx-4 mb-4">
          Don't have an account? <Link to="/reg-User">Register Now</Link>
          </div>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
};

export default LoginUser;
