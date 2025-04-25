import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { updatePartnerData } from "../../../services/applyNewUserForm";

const EditPartnerPage = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { partner } = location.state || {};

  const [formData, setFormData] = useState({
    _id: partner?._id,
    fullName: partner?.fullName || "",
    email: partner?.email || "",
    mobile: partner?.mobile || "",
    designation: partner?.designation || "",
    institutionName: partner?.institutionName || "",
    message: partner?.message || "",
    panNo: partner?.panNo || "",
    aadharNo: partner?.aadharNo || "",
    Avtar: partner?.Avtar || null,
    acDetails: partner?.acDetails || "",
  });

  const handleChange = (e) => {
    const { id, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [id]: value,
    }));
  };

  const handleEditSubmit = async () => {
    const formDataToSubmit = new FormData();
    Object.keys(formData).forEach((key) => {
      formDataToSubmit.append(key, formData[key]);
    });
    

    try {
      const response = await updatePartnerData(formDataToSubmit);
      if (response.status === 200) {
        Swal.fire({
          title: "Success!",
          text: "Partner data updated successfully!",
          icon: "success",
          confirmButtonText: "OK",
        });
        navigate("/admin/partner");
      } else {
        throw new Error("Failed to update data");
      }
    } catch (error) {
      Swal.fire({
        title: "Error!",
        text: "An error occurred while updating data. Please try again.",
        icon: "error",
        confirmButtonText: "Retry",
      });
    }
  };


  const [selectedTeamImg, setSelectedTeamImg] = useState(
    partner?.Avtar || null
  );

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prevData) => ({
        ...prevData,
        Avtar: file,
      }));
      const imageUrl = URL.createObjectURL(file);
      setSelectedTeamImg(imageUrl);
    }
  };








  return (
    <div className="container">
      <h3>Edit Partner Data</h3>
      <form>
        <div className="form-group">
          <label>Full Name</label>
          <input
            id="fullName"
            type="text"
            className="form-control"
            value={formData.fullName}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Email</label>
          <input
            id="email"
            type="email"
            className="form-control"
            value={formData.email}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Phone</label>
          <input
            id="mobile"
            type="text"
            className="form-control"
            value={formData.mobile}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Designation</label>
          <input
            id="designation"
            type="text"
            className="form-control"
            value={formData.designation}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Institution</label>
          <input
            id="institutionName"
            type="text"
            className="form-control"
            value={formData.institutionName}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Message</label>
          <textarea
            id="message"
            className="form-control"
            value={formData.message}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Pan No</label>
          <input
            id="panNo"
            type="text"
            className="form-control"
            value={formData.panNo}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Aadhar No</label>
          <input
            id="aadharNo"
            type="text"
            className="form-control"
            value={formData.aadharNo}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Account Details</label>
          <textarea
            id="acDetails"
            type="text"
            className="form-control"
            value={formData.acDetails}
            onChange={handleChange}
          />
        </div>
        <div className="form-group">
          <label>Partner Image</label>
          <input
            id="Avtar"
            type="file"
            className="form-control"
            name="Avtar"
            onChange={handleFileChange}
          />
          {selectedTeamImg && (
            <img
              src={selectedTeamImg}
              alt="Selected Partner"
              className="w-25 pt-2"
            />
          )}
        </div>

        <button
          type="button"
          className="btn btn-primary"
          onClick={handleEditSubmit}
        >
          Save Changes
        </button>
      </form>
    </div>
  );
};

export default EditPartnerPage;
