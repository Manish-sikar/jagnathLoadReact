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

  const getIconStyle = (iconClass) => {
    const baseStyle = {
      width: "25px",
      height: "25px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      borderRadius: "20%", // Makes icons circular
      fontSize: "15px", // Ensures equal size
    };
  
    switch (iconClass) {
      case "bi bi-facebook":
        return { ...baseStyle, color: "#0868f0", backgroundColor: "#e6eaf0" }; // Facebook
      case "bi bi-x":
        return { ...baseStyle, color: "#fff", backgroundColor: "#000" }; // X (Twitter)
      case "bi bi-instagram":
        return {
          ...baseStyle,
          background:
            "linear-gradient(45deg, #F58529, #FEDA77, #DD2A7B, #8134AF, #515BD4)",
          color: "#fff",
        }; // Instagram
      case "bi bi-youtube":
        return { ...baseStyle, color: "#fff", backgroundColor: "#FF0000" }; // YouTube
      default:
        return { ...baseStyle, color: "#000" }; // Default
    }
  };

  return (
    <>
      {/* Main Navbar */}
      <Navbar collapseOnSelect expand="lg" style={style.navbar} >
        <Container>
        <Navbar.Brand href="#home" className="ms-3" style={style.navbarBrand}>
  <img 
    src={"./img/Jasnathlogopdf.svg" ||formData?.site_logo }
    alt="Site Logo" 
    className="rounded-circle" 
    style={{ width: 'auto', height: '100px' }} // Adjust size of the logo as needed
  />
</Navbar.Brand>

          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
    <Nav className="me-auto" style={{ display: "flex", gap: "10px" }}>
  {socialLinks.map((item, index) => (
    <Nav.Link
      href={item.icon_url}
      target="_blank"
      key={index}
      style={{ textDecoration: "none" }}
    >
      <span
        style={getIconStyle(item.icon_class)}
        className={item.icon_class}
      ></span>
    </Nav.Link>
  ))}
</Nav>
           <Nav className="ms-auto d-flex align-items-center gap-3">
  {/* Home Icon & Link */}
  <div className="d-flex align-items-center">
    <img 
      src="/img/homeicons.png" 
      alt="Home Icon" 
      style={{ width: "30px", height: "30px", marginRight: "8px" }}
    />
    <Nav.Link href="/" style={style.navLink}>Home</Nav.Link>
  </div>

  <Nav.Link href="/about" style={style.navLink}>About Us</Nav.Link>
  <Nav.Link href="/service" style={style.navLink}>Services</Nav.Link>
  <Nav.Link href="/project" style={style.navLink}>Project</Nav.Link>
  <Nav.Link href="/login-User" style={style.navLink}>Login</Nav.Link>
  <Nav.Link href="/contact" className="me-4" style={style.navLink}>Contact Us</Nav.Link>
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
      backgroundColor: "#FBFBFB",
      borderBottom: "3px solid #f1f1f1",
    },
    navbarBrand: {
      fontSize: "1.8rem",
      fontWeight: "bold",
      color: "#212121",
    },
    navLink: {
      color: "#212121",
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
      color: "#212121",
    },
    socialIconHover: {
      color: "#727D73",
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
