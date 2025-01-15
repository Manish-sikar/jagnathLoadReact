import { getSiteData } from "../../services/siteService";
import { useEffect, useState } from "react";
import { getSocialData } from "../../services/socialService";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { baseURL } from "../../services/apiService";
import { useAuthUser } from "../authPagesForUser/contexUser";

const AuthUserHeader = () => {
  const [formData, setFormData] = useState({});
  const [socialLinks, setSocialLinks] = useState([]);
  const { userDataUser, logoutUser } = useAuthUser();

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

  return (
    <>
      {/* Main Navbar */}
      <Navbar collapseOnSelect expand="lg" style={style.navbar} variant="dark">
        <Container>
          <Navbar.Brand href="#home" style={style.navbarBrand}>
            <img
              src={`${baseURL}/${formData?.site_logo}`}
              alt="Site Logo"
              className="rounded-circle"
              style={{ width: "auto", height: "80px" }} // Adjust size of the logo as needed
            />
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              {/* Social Media Icons */}
              {socialLinks.map((item, index) => (
                <Nav.Link href={item.icon_url} target="_blank" key={index}>
                  <i className={item.icon_class} style={style.socialIcon}></i>
                </Nav.Link>
              ))}
            </Nav>
            <Nav className="ms-auto d-flex align-items-center gap-3">
              {/* Welcome Message */}
              <p
                className="welcome-text text-white m-0"
                style={style.welcomeText}
              >
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
                onMouseOver={(e) =>
                  (e.target.style.transform = "scale(1.05)")
                }
                onMouseOut={(e) => (e.target.style.transform = "scale(1)")}
              >
                <i className="fas fa-sign-out-alt me-2"></i> Logout
              </button>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

    
    </>
  );
};
export default AuthUserHeader;

const style = {
  navbar: {
    backgroundColor: "#3B1C32",
    borderBottom: "3px solid #f1f1f1",
  },
  navbarBrand: {
    fontSize: "1.8rem",
    fontWeight: "bold",
    color: "#fff",
  },
  navLink: {
    color: "#fff",
    fontSize: "1.1rem",
  },
  subNavbar: {
    backgroundColor: "#A64D79",
    borderTop: "3px solid #f1f1f1",
    padding: "1px 0",
    maxHeight: "100px",
    overflowY: "auto",
    display: "block",
  },
  subNavbarLink: {
    fontSize: "0.9rem",
    padding: "8px 12px",
  },
  socialIcon: {
    fontSize: "1.5rem",
    marginRight: "10px",
    color: "#fff",
  },
  welcomeText: {
    fontSize: "1.2rem",
    fontWeight: "bold",
    color: "#fff",
    display: "flex",
    alignItems: "center",
    gap: "10px",
  },
  btnGradient: {
    background: "linear-gradient(90deg, #ff416c, #ff4b2b)",
    border: "none",
    color: "white",
    fontWeight: "bold",
    borderRadius: "8px",
    padding: "10px 20px",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    transition: "transform 0.2s ease-in-out",
  },
  "@media (max-width: 768px)": {
    navbarBrand: {
      fontSize: "1.5rem",
    },
    subNavbarLink: {
      fontSize: "0.8rem",
    },
    navLink: {
      fontSize: "1rem",
    },
  },
};
