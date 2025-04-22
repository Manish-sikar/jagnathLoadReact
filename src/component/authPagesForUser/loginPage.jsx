import React, { useEffect, useState } from "react";
import {
  MDBContainer,
  MDBCol,
  MDBRow,
  MDBBtn,
  MDBIcon,
  MDBInput,
  MDBCheckbox,
  MDBModal,
  MDBModalBody,
  MDBModalHeader,
} from "mdb-react-ui-kit";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import {
  UserLoginApi,
  ForgotPasswordApi,
  VerifyOtpApi,
  ResetPasswordApi,
} from "../../services/authServices";
import { useAuthUser } from "./contexUser";
import Loading from "../../loadingFile";

const LoginUser = () => {
  const [emailORphone, setEmailORPhone] = useState("");
  const [password, setPassword] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [step, setStep] = useState(1);
  const [pageLoading, setPageLoading] = useState(true);   // Initial screen
  const [loginLoading, setLoginLoading] = useState(false); // On form submit
  

  useEffect(() => {
    const timeout = setTimeout(() => {
      setPageLoading(false);
    }, 1500);
    return () => clearTimeout(timeout);
  }, []);
  

  const navigate = useNavigate();
  const { setTokenUser, setDataUser, setuserEmail, setuserBalance } =
    useAuthUser();

    const handleLogin = async (e) => {
      e.preventDefault();
      setLoginLoading(true);
      if (!emailORphone || !password) {
        Swal.fire("Error", "All fields are required!", "error");
        setLoginLoading(false);
        return;
      }
      try {
        const response = await UserLoginApi({ emailORphone, password });
        if (response.token) {
          localStorage.setItem("authTokenUser", response.token);
          setTokenUser(response.token);
          setDataUser(response.user_name);
          setuserBalance(response.user_balance);
          setuserEmail(response.email);
          Swal.fire("Success", "Login successful!", "success");
          navigate("/dashboard");
        }
      } catch (error) {
        Swal.fire("Error", "Login failed. Please try again.", "error");
      } finally {
        setLoginLoading(false);
      }
    };
    

  const handleForgotPassword = async () => {
    try {
      await ForgotPasswordApi({ email });
      Swal.fire("Success", "OTP sent to your email!", "success");
      setStep(2);
    } catch (error) {
      Swal.fire("Error", "Failed to send OTP.", "error");
    }
  };

  const handleVerifyOtp = async () => {
    try {
      await VerifyOtpApi({ email, otp });
      setStep(3);
    } catch (error) {
      Swal.fire("Error", "Invalid OTP.", "error");
    }
  };

  const handleResetPassword = async () => {
    if (newPassword !== confirmPassword) {
      Swal.fire("Error", "Passwords do not match!", "error");
      return;
    }
    try {
      await ResetPasswordApi({ email, newPassword });
      Swal.fire("Success", "Password changed successfully!", "success");
      setModalOpen(false);
    } catch (error) {
      Swal.fire("Error", "Failed to reset password.", "error");
    }
  };

  if (pageLoading) return <Loading />;


  return (
    <MDBContainer fluid className="p-3 my-5">
      <MDBRow>
        <MDBCol col="10" md="6">
          <img
            src="./img/jsnathPdfIcon.png"
            className="img-fluid"
            alt="Phone illustration"
          />
        </MDBCol>

        <MDBCol col="4" md="6" className="border-2">
          <span style={{ fontFamily: "ui-monospace !important" }}>
            {" "}
            <h1>Partner Login</h1>
          </span>
          <form onSubmit={handleLogin}>
            {/* <MDBInput label="Email or Phone" id="emailORphone" type="text" size="lg" value={emailORphone} onChange={(e) => setEmailORPhone(e.target.value)} className="mb-4"  labelPlacement="top" /> */}
            <div className="mb-4 mt-5">
              <label htmlFor="User Name" className="form-label">
                User Name
              </label>
              <MDBInput
                id="emailORphone"
                type="text"
                size="lg"
                value={emailORphone}
                onChange={(e) => setEmailORPhone(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label htmlFor="Password" className="form-label">
                Password
              </label>
              <MDBInput
                id="password"
                type="password"
                size="lg"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            {/* <MDBInput label="Password" id="password" type="password" size="lg" value={password} onChange={(e) => setPassword(e.target.value)} className="mb-4" /> */}

            <div className="d-flex justify-content-between mx-4 mb-4">
              <MDBCheckbox
                name="flexCheck"
                id="flexCheckDefault"
                label="Remember me"
              />
              <a href="#!" onClick={() => setModalOpen(true)}>
                Forgot password?
              </a>
            </div>

            {/* <MDBBtn className="mb-4 w-100" size="lg" type="submit">
              Sign in
            </MDBBtn> */}
            <button
              className="mb-4 w-100 btn btn-success"
              size="lg"
              type="submit"
            >
              {" "}
              {loginLoading ? "Signing in..." : "Sign in"}{" "}
            </button>
          </form>

          <MDBModal open={modalOpen} tabIndex="-1" setOpen={setModalOpen}>
            <MDBModalHeader>Forgot Password</MDBModalHeader>
            <MDBModalBody>
              {step === 1 && (
                <>
                  <MDBInput
                    label="Enter your email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="mb-3"
                  />
                  <MDBBtn onClick={handleForgotPassword}>Send OTP</MDBBtn>
                </>
              )}
              {step === 2 && (
                <>
                  <MDBInput
                    label="Enter OTP"
                    type="text"
                    value={otp}
                    onChange={(e) => setOtp(e.target.value)}
                    className="mb-3"
                  />
                  <MDBBtn onClick={handleVerifyOtp}>Verify OTP</MDBBtn>
                </>
              )}
              {step === 3 && (
                <>
                  <MDBInput
                    label="New Password"
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="mb-3"
                  />
                  <MDBInput
                    label="Confirm Password"
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="mb-3"
                  />
                  <MDBBtn onClick={handleResetPassword}>Reset Password</MDBBtn>
                </>
              )}
            </MDBModalBody>
          </MDBModal>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  );
};

export default LoginUser;
