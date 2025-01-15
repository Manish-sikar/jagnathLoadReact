import OwlCarousel from "react-owl-carousel";
import React, { useEffect, useState } from "react";
import "owl.carousel/dist/assets/owl.carousel.css";
import "owl.carousel";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faXTwitter,
  faGithub,
  faFacebook,
  faLinkedinIn,
} from "@fortawesome/free-brands-svg-icons";
import { Link } from "react-router-dom";
import { baseURL } from "../services/apiService";
import { GetServiceData } from "../services/serviceAdmin";
import { GetProjectData } from "../services/projectService";
import { GetOurTeamData } from "../services/ourTeamService";
import { GetContactDetailsData } from "../services/contactService";
import { AddNewContactForm } from "../services/contactFormService";
import Swal from "sweetalert2";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import HeroBanner from "./herobanner";
import LoginBanner from "./bannerPages/loginBanner";
const Home = () => {
  const [serviceState, setServiceState] = useState([]);
  const [projectState, setProjectState] = useState([]);
  const [teamState, setTeamState] = useState([]);
  const [contactState, setContactState] = useState([]);
  const [formData, setFormData] = useState({
    contact_name: "",
    contact_email: "",
    contact_project: "",
    contact_message: "",
  });

  

  const iconMapping = {
    "fab fa-facebook": faFacebook,
    "fab fa-twitter": faXTwitter,
    "fab fa-github": faGithub,
    "fab fa-linkedin-in": faLinkedinIn,
  };

  useEffect(() => {
    fetchServices();
    fetchProjectData();
    fetchTeamData();
    fetchcontactData()
  }, []);



  const fetchServices = async () => {
    const response = await GetServiceData();
    const serviceData = response.services_Data;
    // Filter services with status "1", and then take the last 6 services
    const filteredServices = serviceData.filter((service) => service.status === "1");
    setServiceState(filteredServices.slice(-6));  // Get the last 6 services
  };
  

  const fetchProjectData = async () => {
    const response = await GetProjectData();
    const ProjectData = response.projects_Data;
    setProjectState(ProjectData.filter((service) => service.status === "1"));
  };

  const fetchTeamData = async () => {
    const response = await GetOurTeamData();
    const teamData = response.team_Data;
    setTeamState(teamData.filter((member) => member.status === "1"));
  };

  const fetchcontactData = async () => {
    const response = await GetContactDetailsData();
    const contactData = response.contact_Data;
    setContactState(contactData[0]);
  };

// contact form sumbit process

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await AddNewContactForm(formData);
      Swal.fire("Success!", "Contact form submitted successfully.", "success");
      setFormData({
        contact_name: "",
        contact_email: "",
        contact_project: "",
        contact_message: "",
      });
    } catch (error) {
      Swal.fire({
        title: "Error!",
        text: "An error occurred while submitting the form. Please try again.",
        icon: "error",
        confirmButtonText: "Retry",
      });
    }
  };




  return (
    <>
      {/* <!-- Carousel Start --> */}
    
      {/* <!-- Carousel End --> */}
      <HeroBanner/>
      {/* <!-- Fact Start --> */}
      <div class="container-fluid bg-secondary py-5">
        <div class="container">
          <div class="row">
            <div class="col-lg-3 wow fadeIn" data-wow-delay=".1s">
              <div class="d-flex counter">
                <h1 class="me-3 text-primary counter-value">99</h1>
                <h5 class="text-white mt-1">
                  Success in getting happy customer
                </h5>
              </div>
            </div>
            <div class="col-lg-3 wow fadeIn" data-wow-delay=".3s">
              <div class="d-flex counter">
                <h1 class="me-3 text-primary counter-value">25</h1>
                <h5 class="text-white mt-1">
                  Thousands of successful business
                </h5>
              </div>
            </div>
            <div class="col-lg-3 wow fadeIn" data-wow-delay=".5s">
              <div class="d-flex counter">
                <h1 class="me-3 text-primary counter-value">120</h1>
                <h5 class="text-white mt-1">Total clients who love Diditaladdworldtech</h5>
              </div>
            </div>
            <div class="col-lg-3 wow fadeIn" data-wow-delay=".7s">
              <div class="d-flex counter">
                <h1 class="me-3 text-primary counter-value">5</h1>
                <h5 class="text-white mt-1">
                  Stars reviews given by satisfied clients
                </h5>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <!-- Fact End --> */}

      {/* <!-- About Start --> */}
     

      <div className="about-finance-container">
      {/* Page Header */}
      <header className="text-center">
        <h1 className="text-center p-3">About Finance</h1>
        <p className="text-muted">
          Learn more about our finance services and goals.
        </p>
      </header>

      {/* Main Content */}
      <main className="container">
        <div className="row justify-content-center">
          {/* Small Box 1 */}
          <div className="col-12 col-md-4 mb-4">
            <section className="small-box text-center p-3">
              <h2>Our Mission</h2>
              <p>
                Our mission is to empower individuals and businesses with the
                financial tools they need to succeed. From investments to loans,
                we provide comprehensive financial solutions tailored to your
                unique needs.
              </p>
            </section>
          </div>

          {/* Small Box 2 */}
          <div className="col-12 col-md-4 mb-4">
            <section className="small-box text-center p-3">
              <h2>Why Choose Us?</h2>
              <ul className="text-start">
                <li>Trusted by thousands of customers worldwide</li>
                <li>Transparent and ethical financial practices</li>
                <li>Expert advisors with years of experience</li>
              </ul>
            </section>
          </div>
          <div className="col-12 col-md-4 mb-4">
            <section className="small-box text-center p-3">
              <h2>Why Choose Us?</h2>
              <ul className="text-start">
                <li>Trusted by thousands of customers worldwide</li>
                <li>Transparent and ethical financial practices</li>
                <li>Expert advisors with years of experience</li>
              </ul>
            </section>
          </div>
     
         
        </div>
      </main>
    </div>

      {/* <!-- About End --> */}

      {/* <!-- Services Start --> */}
    
      <div className="service-page-container">
    {/* Heading for the service page */}
    <h1 className="text-center my-4">Our Services</h1> {/* Add heading with some margin */}
    
    <Row className="g-3 ms-4">
      {serviceState.map((item, idx) => (
        <Col xs={12} sm={6} md={4} lg={2} key={idx} className="p-3">
          <Card style={{ width: "10rem" }} className="p-3">
            <Card.Img
              variant="top"
              src={`${baseURL}/${item.card_logo}` || "https://via.placeholder.com/150"} // Fallback for missing images
              alt={item.card_title || `Card ${idx + 1}`} // Fallback for missing names
            />
            <Card.Body>
              <Card.Title>{item.card_title || `Card ${idx + 1}`}</Card.Title> {/* Fallback for missing names */}
            </Card.Body>
          </Card>
        </Col>
      ))}
    </Row>
  </div>

      {/* <!-- Services End --> */}

    
  {/* <!-- Project start --> */}
      <div className="container-fluid services py-5 mb-5">
        <div className="container">
          <div
            className="text-center mx-auto pb-5 wow fadeIn"
            data-wow-delay=".3s"
            style={{ maxWidth: "600px" }}
          >
            <h5 className="text-primary">Our Project</h5>
            <h1>Our Recently Completed And In Process Projects</h1>
          </div>
          <div className="row g-5 services-inner">
            {projectState.map((project, index) => (
              <div
                key={project._id}
                className={`col-md-6 col-lg-4 wow fadeIn`}
                data-wow-delay={`${0.3 + index * 0.2}s`}
              >
                <div className="services-item bg-light">
                  <div className="p-4 text-center services-content">
                    <div className="services-content-icon">
                      <img
                        src={`${baseURL}/${project.projectimg}`}
                        alt={project.project_title}
                        className="mb-4 "
                        style={{
                          width: "200px",
                          height: "200px",
                          objectFit: "contain",
                        }}
                      />
                      <h4 className="mb-3">{project.project_title}</h4>
                      <p className="mb-4">{project.project_desc}</p>
                      <Link
                        to="/project"
                        className="btn btn-secondary text-white px-5 py-3 rounded-pill"
                      >
                        {project.btn_txt}
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* <!-- Project End --> */}
 
 

      {/* <!-- Contact Start --> */}
      <div class="container-fluid py-5 mb-5">
        <div class="container">
          <div
            class="text-center mx-auto pb-5 wow fadeIn"
            data-wow-delay=".3s"
            style={{ maxWidth: "600px" }}
          >
            <h5 class="text-primary">Get In Touch</h5>
            <h1 class="mb-3">Contact for any query</h1>
            <p class="mb-2">
              The contact form is currently inactive. Get a functional and
              working contact form with Ajax & Javascript in a few minutes. Just
              copy and paste the files, add a little code and you're done.{" "}
            </p>
          </div>
          <div class="contact-detail position-relative p-5">
            <div class="row g-5 mb-5 justify-content-center">
              <div class="col-xl-4 col-lg-6 wow fadeIn" data-wow-delay=".3s">
                <div class="d-flex bg-light p-3 rounded">
                  <div
                    class="flex-shrink-0 btn-square bg-secondary rounded-circle"
                    style={{ width: "50px", height: "50px" }}
                  >
                    <i class="fas fa-map-marker-alt text-white"></i>
                  </div>
                  <div class="ms-3">
                    <h4 class="text-primary">Address</h4>
                    <Link
                      to={`${contactState?.address_link}`}
                      target="_blank"
                      class="h5"
                    >
                      {contactState?.address_name}{" "}
                    </Link>
                  </div>
                </div>
              </div>
              <div class="col-xl-4 col-lg-6 wow fadeIn" data-wow-delay=".5s">
                <div class="d-flex bg-light p-3 rounded">
                  <div
                    class="flex-shrink-0 btn-square bg-secondary rounded-circle"
                    style={{ width: "50px", height: "50px" }}
                  >
                    <i class="fa fa-phone text-white"></i>
                  </div>
                  <div class="ms-3">
                    <h4 class="text-primary">Call Us</h4>
                    <Link class="h5" href={`tel:${contactState?.mob_no}`} target="_blank">
                      {contactState?.mob_no}
                    </Link>
                  </div>
                </div>
              </div>
              <div class="col-xl-4 col-lg-6 wow fadeIn" data-wow-delay=".7s">
                <div class="d-flex bg-light p-3 rounded">
                  <div
                    class="flex-shrink-0 btn-square bg-secondary rounded-circle"
                    style={{ width: "50px", height: "50px" }}
                  >
                    <i class="fa fa-envelope text-white"></i>
                  </div>
                  <div class="ms-3">
                    <h4 class="text-primary">Email Us</h4>
                    <Link
                      class="h5"
                      href={`mailto:${contactState?.email}`}
                      target="_blank"
                    >
                      {" "}
                    {contactState?.email}{" "}
                    </Link>
                  </div>
                </div>
              </div>
            </div>
            <div class="row g-5">
              <div class="col-lg-6 wow fadeIn" data-wow-delay=".3s">
                <div class="p-3 h-100 rounded contact-map">
                  <iframe
                    class="rounded w-100 h-100"
                    src= {`${contactState?.iframe_link}`}
                    style={{ border: "0" }}
                    allowfullscreen=""
                    loading="lazy"
                    referrerpolicy="no-referrer-when-downgrade"
                  ></iframe>
                </div>
              </div>
              <div class="col-lg-6 wow fadeIn" data-wow-delay=".5s">
                <div class="p-3 rounded contact-form">
                  <div class="mb-4">
                    <input
                      type="text"
                      class="form-control border-0 py-3"
                      placeholder="Your Name"
                      name="contact_name"
                      onChange={handleChange}
                    />
                  </div>
                  <div class="mb-4">
                    <input
                      type="email"
                      class="form-control border-0 py-3"
                      placeholder="Your Email"
                      name="contact_email"
                      onChange={handleChange}
                    />
                  </div>
                  <div class="mb-4">
                    <input
                      type="text"
                      class="form-control border-0 py-3"
                      placeholder="Project"
                      name="contact_project"
                      onChange={handleChange}
                    />
                  </div>
                  <div class="mb-4">
                    <textarea
                      class="w-100 form-control border-0 py-3"
                      rows="6"
                      cols="10"
                      placeholder="Message"
                      name="contact_message"
                      onChange={handleChange}
                    ></textarea>
                  </div>
                  <div class="text-start">
                    <button
                      class="btn bg-primary text-white py-3 px-3"
                      type="button"

                      onClick={handleSubmit}
                    >
                      Send Message
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* <!-- Contact End --> */}

      {/* <!-- Back to Top --> */}
      <button
        className="btn btn-secondary btn-square rounded-circle back-to-top"
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
      >
        <i className="fa fa-arrow-up text-white"></i>
      </button>
    </>
  );
};

export default Home;
