import { Link, NavLink } from "react-router-dom";
import { getSiteData } from "../../services/siteService";
import { useEffect, useState } from "react";
import { getSocialData } from "../../services/socialService";
import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import { baseURL } from "../../services/apiService";

const Header = () => {
  const [formData, setFormData] = useState({});
  const [socialLinks, setSocialLinks] = useState([]);

  useEffect(() => {
    fetchData();
    fetchSocialLinks();
  }, []);

  // Fetch site data
  const fetchData = async () => {
    try {
      const response = await getSiteData();
      const data = response.site_Data;
      console.log(formData)
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

  // Format title with alternate styling
  const titleChange = () => {
    const title_new = formData.title || ""; // Default to an empty string if title is not set
    const words = title_new.split(" ");
    const formattedWords = words.map((word, index) =>
      index % 2 === 0 ? (
        word
      ) : (
        <span className="text-secondary" key={index}>
          {word}
        </span>
      )
    );
    return (
      <h1 className="text-white fw-bold d-block">
        {formattedWords.reduce((prev, curr) => [prev, "", curr])}
      </h1>
    );
  };



  return (
    <>
      {/* Main Navbar */}
      <Navbar collapseOnSelect expand="lg" style={style.navbar} >
        <Container>
          <Navbar.Brand href="#home" style={style.navbarBrand}>
          <img 
        src={formData?.site_logo}
        alt="Site Logo" 
        className="rounded-circle" 
        style={{ width: 'auto', height: '80px' }}  // Adjust size of the logo as needed
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
            <Nav className="ms-auto">
              {/* Navigation Links */}
              <Nav.Link href="/dashboard" style={style.navLink}>Dashboard</Nav.Link>
              <Nav.Link href="#AboutUs" style={style.navLink}>About Us</Nav.Link>
              <Nav.Link href="#Services" style={style.navLink}>Services</Nav.Link>
              <Nav.Link href="#ChooseUs" style={style.navLink}>Choose Us</Nav.Link>
              <Nav.Link href="/dashboard" style={style.navLink}>EMI Collection</Nav.Link>
             <Nav.Link href="/login-User" style={style.navLink}>Login</Nav.Link>
              <Nav.Link href="#ContactUs" style={style.navLink}>Contact Us</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>          
    </>
  );
};

export default Header;

  // Inline style object for the Navbar and other components
  const style = {
    navbar: {
      backgroundColor: "#006BFF",
      borderBottom: "3px solid #f1f1f1",
    },
    navbarBrand: {
      fontSize: "1.8rem",
      fontWeight: "bold",
      color: "#f1f1f1",
    },
    navLink: {
      color: "#f1f1f1",
      fontSize: "1.1rem",
    },
    navLinkHover: {
      color: "#8E1616",
      textDecoration: "underline",
    },
    subNavbar: {
      backgroundColor: "#DAD2FF",
      borderTop: "3px solid #f1f1f1",
      padding: "1px 0",
      maxHeight: "100px", // Limit height
      overflowY: "auto", // Enable scrolling
      display: "block",
    },
    subNavbarLink: {
      fontSize: "0.9rem",
      padding: "8px 12px",
    },
    socialIcon: {
      fontSize: "1.5rem",
      marginRight: "10px",
      color: "#f1f1f1",
    },
    socialIconHover: {
      color: "#ff5a5f",
    },
    // Add media query inline styles for responsiveness
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
