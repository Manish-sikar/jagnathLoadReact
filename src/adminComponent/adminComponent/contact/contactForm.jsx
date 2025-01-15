import { useEffect, useState } from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import {
  GetContactFormData,
  AddNewContactForm,
  deleteContactFormData,
} from "../../../services/contactFormService"; // Ensure you have the correct import for AddNewContactForm

const ContactForm = () => {
  const [contactFormData, setContactFormData] = useState([]);
  const [formData, setFormData] = useState({
    contact_name: "",
    contact_email: "",
    contact_project: "",
    contact_message: "",
  });
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchContactFormData();
  }, []);

  const fetchContactFormData = async () => {
    try {
      const response = await GetContactFormData();
      const data = response.contactForm_Data;

      // Filter the data to only include entries with status 1
      const filteredData = data.filter((contact) => contact.status === 1);
      // Set the filtered data
      setContactFormData(filteredData);
    } catch (error) {
      Swal.fire({
        title: "Error!",
        text: "An error occurred while getting data. Please try again.",
        icon: "error",
        confirmButtonText: "Retry",
      });
    }
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
      fetchContactFormData(); // Refresh the contact form data
      setFormData({
        contact_name: "",
        contact_email: "",
        contact_project: "",
        contact_message: "",
      });
      closeModal(); // Close the modal after submission
    } catch (error) {
      Swal.fire({
        title: "Error!",
        text: "An error occurred while submitting the form. Please try again.",
        icon: "error",
        confirmButtonText: "Retry",
      });
    }
  };

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleDeleteClick = async (_id) => {
    try {
      const response = await deleteContactFormData(_id);
      if (response.status === 200) {
        Swal.fire({
          title: "Success!",
          text: "Data deleted successfully!",
          icon: "success",
          confirmButtonText: "OK",
        });
        navigate(`/admin/setting/contact-form`);
        fetchContactFormData();
      } else {
        throw new Error("Failed to add data");
      }
    } catch (error) {
      Swal.fire({
        title: "Error!",
        text: "An error occurred while Deleting data. Please try again.",
        icon: "error",
        confirmButtonText: "Retry",
      });
    }
  };

  return (
<>
    <div>
    <h3 className="fw-bold mb-3">Setting</h3>
    <ul className="breadcrumbs mb-3">
      <li className="nav-home">
        <a href="#">
          <i className="icon-home"></i>
        </a>
      </li>
      <li className="separator">
        <i className="icon-arrow-right"></i>
      </li>
      <li className="nav-item">
        <a href="#">CMS</a>
      </li>
      <li className="separator">
        <i className="icon-arrow-right"></i>
      </li>
      <li className="nav-item">
        <a href="#">Contact Form Management</a>
      </li>
    </ul>
  </div>
    <div className="col-md-12 mt-2">
      <div className="card">
        <div className="card-header">
          <h4 className="card-title">Contact Form</h4>
          <button
            className="btn btn-primary btn-round ms-auto"
            onClick={openModal}
          >
            <i className="fa fa-plus"></i>
            Add
          </button>
        </div>
        <div className="card-body">
          {/* Modal for adding new contact form */}
          {isModalOpen && (
            <div className="modal fade show" style={{ display: "block" }}>
              <div className="modal-dialog" role="document">
                <div className="modal-content">
                  <div className="modal-header">
                    <h5 className="modal-title">Add Contact</h5>
                    <button
                      type="button"
                      className="close"
                      onClick={closeModal}
                    >
                      <span aria-hidden="true">&times;</span>
                    </button>
                  </div>
                  <div className="modal-body">
                    <form onSubmit={handleSubmit}>
                      <div className="form-group">
                        <label>Contact Name</label>
                        <input
                          name="contact_name"
                          type="text"
                          className="form-control"
                          placeholder="Enter your name"
                          value={formData.contact_name}
                          onChange={handleChange}
                        />
                      </div>
                      <div className="form-group">
                        <label>Contact Email</label>
                        <input
                          name="contact_email"
                          type="email"
                          className="form-control"
                          placeholder="Enter your email"
                          value={formData.contact_email}
                          onChange={handleChange}
                        />
                      </div>
                      <div className="form-group">
                        <label>Contact Project</label>
                        <input
                          name="contact_project"
                          type="text"
                          className="form-control"
                          placeholder="Enter your project name"
                          value={formData.contact_project}
                          onChange={handleChange}
                        />
                      </div>
                      <div className="form-group">
                        <label>Contact Message</label>
                        <textarea
                          name="contact_message"
                          className="form-control"
                          placeholder="Enter your message"
                          value={formData.contact_message}
                          onChange={handleChange}
                        />
                      </div>
                      <button type="submit" className="btn btn-primary">
                        Submit
                      </button>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Table to display existing contact form data */}
          <div className="table-responsive mt-4">
            <table className="display table table-striped table-hover">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Project</th>
                  <th>Message</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {contactFormData.map((item, index) => (
                  <tr key={index}>
                    <td>{item.contact_name}</td>
                    <td>{item.contact_email}</td>
                    <td>{item.contact_project}</td>
                    <td>{item.contact_message}</td>
                    <td>
                      <div className="form-button-action">
                        <button
                          type="button"
                          className="btn btn-link btn-danger"
                          onClick={() => handleDeleteClick(item._id)}
                        >
                          <i className="fa fa-times"></i>
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default ContactForm;
