import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Swal from "sweetalert2";
import { AddNewContactForm } from "../services/contactFormService";
import { GetContactDetailsData } from "../services/contactService";


const Contact = () => {

  const [contactState, setContactState] = useState([]);
  const [formData, setFormData] = useState({
    contact_name: "",
    contact_email: "",
    contact_project: "",
    contact_message: "",
  });

useEffect(()=>{
  fetchcontactData()
},[])




  const fetchcontactData = async () => {
    const response = await GetContactDetailsData();
    const contactData = response.contact_Data;
    setContactState(contactData[0]);
  };


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
  
      
      {/* <!-- Page Header End --> */}
     

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

export default Contact;
