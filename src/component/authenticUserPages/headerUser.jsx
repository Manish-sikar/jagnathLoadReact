import { getSiteData } from "../../services/siteService";
import { useEffect, useState } from "react";
import { getSocialData } from "../../services/socialService";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { Modal, Button, Form } from "react-bootstrap";
import { useAuthUser } from "../authPagesForUser/contexUser";
import { PaytmPaynow } from "../../services/paytmService";
 import { GetSpecialpartnerData } from "../../services/applyNewUserForm";
 

const AuthUserHeader = () => {
  const [formData, setFormData] = useState({});
  const [socialLinks, setSocialLinks] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [addAmount, setAddAmount] = useState("");
  const { userDataUser, logoutUser , userBalance  } = useAuthUser();
  const [JN_Id, setJN_Id] = useState(JSON.parse(localStorage.getItem("partnerEmail") || '""'))


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

  // Open/Close Wallet Modal
  const handleShow = () => setShowModal(true);
  const handleClose = () => setShowModal(false);

 

  // 1️⃣ Initiate Paytm Payment
  const handleAddBalance = async () => {
    const amount = parseFloat(addAmount);
    if (isNaN(amount) || amount <= 0) {
      alert("Enter a valid amount");
      return;
    }

    try {
      const option = {
        amount: amount.toString(),
        customerId: "CUST1234", // Replace with actual user ID
        customerEmail: "user@example.com", // Replace with actual email
        customerPhone: "9876543210", // Replace with actual phone number
      };
      const { data } = await PaytmPaynow(option);

      // Redirect to Paytm Payment Page
      const paytmForm = document.createElement("form");
      paytmForm.method = "POST";
      paytmForm.action = "https://securegw.paytm.in/order/process"; // Paytm Payment URL

      Object.keys(data.paytmParams).forEach((key) => {
        const input = document.createElement("input");
        input.type = "hidden";
        input.name = key;
        input.value = data.paytmParams[key];
        paytmForm.appendChild(input);
      });

      document.body.appendChild(paytmForm);
      paytmForm.submit();
    } catch (error) {
      console.error("Payment initiation failed:", error);
      // alert("Payment initiation failed. Try again.");
      alert("Please send a screenshot of the payment to Jasnath Finance admin.");
    }
  };


 

  return (
    <>
      {/* Main Navbar */}
    
     <div style={{ height: "40px", backgroundColor: "#EB5B00" }}>
  <marquee className="text-light p-2">
    FOR ANY INFORMATION OR DETAILS KINDLY MAIL US AT JASNATHFINANCE@GMAIL .COM
  </marquee>
</div>

      {/* Navbar */}
      <Navbar collapseOnSelect expand="lg" style={style.navbar} variant="dark">
        <Container>
          <Navbar.Brand href="#home" style={style.navbarBrand}>
            <img
              src={formData?.site_logo}
              alt="Site Logo"
              className="rounded-circle"
              style={{ width: "auto", height: "80px" }}
            />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
         
            <Nav className="me-auto"></Nav>
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
                <i className="fas fa-user-circle" style={{ fontSize: "1.5rem" }}></i>
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
      {/* Wallet Modal */}
      <Modal show={showModal} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Add Wallet Balance</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Enter Amount</Form.Label>
              <Form.Control
                type="number"
                placeholder="Enter amount"
                value={addAmount}
                onChange={(e) => setAddAmount(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cancel
          </Button>
          <Button variant="success" onClick={handleAddBalance}>
            Pay with Paytm
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
