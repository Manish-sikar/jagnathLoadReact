import { getSiteData } from "../../services/siteService";
import { useEffect, useState } from "react";
import { getSocialData } from "../../services/socialService";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Modal, Button, Form } from "react-bootstrap";
import { useAuthUser } from "../authPagesForUser/contexUser";
import { PaytmPaynow } from "../../services/paytmService";
import { sambitPaymentDetails } from "../../services/billingService";
import Swal from "sweetalert2"; // make sure this is imported
import { useNavigate } from "react-router-dom";

const AuthUserHeader = () => {
  const [formData, setFormData] = useState({});
  const [socialLinks, setSocialLinks] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [addAmount, setAddAmount] = useState("");
  const { userDataUser, logoutUser, userBalance } = useAuthUser();

  const [showPaymentForm, setShowPaymentForm] = useState(false);
  const [paymentAmount, setPaymentAmount] = useState("");
  const [utrNo, setUtrNo] = useState("");
  const [showQRModal, setShowQRModal] = useState(false);
  const navigate = useNavigate();
const [partnerStatus, setPartnerStatus] = useState(false);


  useEffect(() => {
    fetchData();
    fetchSocialLinks();
  }, []);

  // Fetch site data
  const fetchData = async () => {
    try {
      const response = await getSiteData();
      const data = response.site_Data;
      setFormData(data);
    } catch (error) {
      console.error("Error fetching site settings: ", error);
    }
  };

  // Fetch social media data
  const fetchSocialLinks = async () => {
    try {
      const response = await getSocialData();
      const socialMediaLinks = response.social_Data;
      setSocialLinks(socialMediaLinks.filter((link) => link.status === "1"));
    } catch (error) {
      console.error("Error fetching social media links: ", error);
    }
  };
const partnerStatusForDelar = localStorage.getItem("userUserStatus")
if(partnerStatusForDelar == "2"){
  console.log("true")
  partnerStatusForDelar(true)
}

  const handlePaymentSubmit = async () => {
    if (!paymentAmount || !utrNo) {
      Swal.fire({
        icon: "warning",
        title: "Missing Fields",
        text: "Please fill in both the amount and UTR number.",
      });
      return;
    }

    const partnerEmail = JSON.parse(
      localStorage.getItem("partnerEmail") || '""'
    );

    const payload = {
      JN_ID: partnerEmail,
      amount: paymentAmount,
      utr: utrNo,
    };

    try {
      const response = await sambitPaymentDetails(payload);

      if (!response.status == 200) {
        throw new Error("Failed to submit payment");
      }
      const successMessage = response?.data.message;
      Swal.fire({
        icon: "success",
        title: "Payment Submitted",
        text: `✅ ${successMessage}`,
      });

      // Reset form
      setPaymentAmount("");
      setUtrNo("");
      setShowPaymentForm(false);
      handleClose();
    } catch (error) {
      console.error(error);
      const errorMessage = error.response.data.message;
      Swal.fire({
        icon: "error",
        title: "Submission Failed",
        text: `❌ ${errorMessage}`,
      });
    }
  };

  // Open/Close Wallet Modal
  const handleShow = () => setShowModal(true);
  const handleClose = () => setShowModal(false);

  return (
    <>
      {/* Main Navbar */}

      <div style={{ height: "40px", backgroundColor: "#EB5B00" }}>
        <marquee className="text-light p-2">
          FOR ANY INFORMATION OR DETAILS KINDLY MAIL US AT JASNATHFINANCE@GMAIL
          .COM
        </marquee>
      </div>

      {/* Navbar */}
      <Navbar collapseOnSelect expand="lg" style={style.navbar} variant="dark">
        <Container>
          <Navbar.Brand href="#home" style={style.navbarBrand}>
            <img
              src={"./img/Jasnathlogopdf_1.JPG" || formData?.site_logo}
              alt="Site Logo"
              className="rounded-circle"
              style={{ width: "auto", height: "80px" }}
            />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />

          <Nav className="me-auto"></Nav>
          { partnerStatus  && (
            <Nav className="ms-auto d-flex align-items-center gap-3">
              {/* Wallet Section */}
              <div className="wallet-section" style={style.wallet}>
                <button
                  className="btn btn-sm btn-primary"
                  onClick={() => navigate("/ViewTeamPage")}
                >
                  <span style={style.walletText}>
                    <i className="fas fa-users"></i> My Team
                  </span>
                </button>
              </div>
            </Nav>
          )}

          <Nav className="ms-auto d-flex align-items-center gap-3">
            {/* Wallet Section */}
            <div className="wallet-section" style={style.wallet}>
              <span style={style.walletText}>
                <i className="fas fa-wallet"></i> Wallet: ₹{userBalance || 0}
              </span>
              <button className="btn btn-sm btn-primary" onClick={handleShow}>
                Add Balance
              </button>
            </div>

            {/* Welcome Message */}
            <p className="welcome-text m-0" style={style.welcomeText}>
              <i
                className="fas fa-user-circle"
                style={{ fontSize: "1.5rem" }}
              ></i>
              Welcome, {userDataUser}!
            </p>

            {/* Logout Button */}
            <button
              className="btn btn-gradient p-2"
              style={style.btnGradient}
              onClick={logoutUser}
              onMouseOver={(e) => (e.target.style.transform = "scale(1.05)")}
              onMouseOut={(e) => (e.target.style.transform = "scale(1)")}
            >
              <i className="fas fa-sign-out-alt me-2"></i> Logout
            </button>
          </Nav>
        </Container>
      </Navbar>

      {/* Wallet Modal */}
      <Modal show={showModal} onHide={handleClose} centered>
        <Modal.Header closeButton style={{ backgroundColor: "#f8f9fa" }}>
          <Modal.Title className="w-100 text-center fw-bold">
            💰 Add Wallet Balance
          </Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <div className="d-flex flex-column gap-4">
            <div className="p-3 rounded shadow-sm bg-light text-center">
              <h5 className="fw-bold text-primary mb-3">
                📷 Scan & Pay (QR Code)
              </h5>
              <img
                src="./img/jasnathQRCode.jpg"
                alt="QR Code"
                onClick={() => setShowQRModal(!showQRModal)}
                style={{
                  width: "200px",
                  height: "200px",
                  borderRadius: "8px",
                  border: "2px solid #eee",
                  cursor: "pointer",
                  objectFit: "cover",
                }}
              />
              <p className="text-muted mt-2" style={{ fontSize: "0.9rem" }}>
                Click the QR code to enlarge
              </p>
            </div>

            <div className="p-3 rounded shadow-sm bg-light">
              <h5 className="fw-bold text-success mb-3">
                🏦 Bank Transfer Details
              </h5>
              <p>
                <strong>Account Name:</strong> PEMA RAM
              </p>
              <p>
                <strong>Account Number:</strong> 153101512494
              </p>
              <p>
                <strong>IFSC Code:</strong> ICIC0001531
              </p>
              <p>
                <strong>Bank Name:</strong> ICICI BANK
              </p>
            </div>

            <div className="p-3 rounded shadow-sm bg-light">
              <h5 className="fw-bold text-success mb-3">💸 UPI Payment</h5>
              <p>
                <strong>UPI ID:</strong> Jasnathfinance@ybl
              </p>
            </div>

            {!showPaymentForm ? (
              <div className="text-center">
                <Button
                  variant="success"
                  onClick={() => setShowPaymentForm(true)}
                >
                  ✅ I’ve Paid - Submit Payment Info
                </Button>
              </div>
            ) : (
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  handlePaymentSubmit();
                }}
              >
                <h5 className="fw-bold text-dark mb-3">
                  📝 Submit Payment Details
                </h5>

                <div className="mb-3">
                  <label className="form-label">Amount Paid</label>
                  <input
                    type="number"
                    className="form-control"
                    value={paymentAmount}
                    onChange={(e) => setPaymentAmount(e.target.value)}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">UTR / Transaction ID</label>
                  <input
                    type="text"
                    className="form-control"
                    value={utrNo}
                    onChange={(e) => setUtrNo(e.target.value)}
                    required
                  />
                </div>

                <div className="text-center">
                  <Button type="submit" variant="primary">
                    📤 Submit Payment
                  </Button>
                </div>
              </form>
            )}
          </div>
        </Modal.Body>

        {/* Fullscreen QR Modal */}
        <Modal
          show={showQRModal}
          onHide={() => setShowQRModal(false)}
          centered
          size="lg"
          backdrop="static"
        >
          <Modal.Body className="p-0 bg-dark text-center">
            <img
              src="./img/jasnathQRCode.jpg"
              alt="Full QR Code"
              style={{
                width: "100%",
                maxHeight: "90vh",
                objectFit: "contain",
                cursor: "pointer",
              }}
              onClick={() => setShowQRModal(false)}
            />
          </Modal.Body>
        </Modal>

        <Modal.Footer className="d-flex justify-content-center">
          <Button variant="outline-secondary" onClick={handleClose}>
            ❌ Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default AuthUserHeader;
const style = {
  navbar: {
    backgroundColor: "#fff",
    borderBottom: "3px solid #f1f1f1",
  },
  navbarBrand: {
    fontSize: "1.8rem",
    fontWeight: "bold",
    color: "#000000",
  },
  socialIcon: {
    fontSize: "1.5rem",
    marginRight: "10px",
    color: "#000000",
  },
  welcomeText: {
    fontSize: "1.2rem",
    fontWeight: "bold",
    color: "#000000",
    display: "flex",
    alignItems: "center",
    gap: "10px",
  },
  btnGradient: {
    background: "linear-gradient(90deg, #ff416c, #ff4b2b)",
    border: "none",
    color: "#000000",
    fontWeight: "bold",
    borderRadius: "8px",
    padding: "10px 20px",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    transition: "transform 0.2s ease-in-out",
  },
  wallet: {
    display: "flex",
    alignItems: "center",
    gap: "10px",
    background: "#4A2C50",
    padding: "8px 12px",
    borderRadius: "8px",
    color: "white",
    fontWeight: "bold",
  },
  walletText: {
    fontSize: "1rem",
  },
  marquee: {
    display: "inline-block",
    whiteSpace: "nowrap",
    color: "white",
    padding: "10px",
    animation: "marquee 5s linear infinite",
  },
};
