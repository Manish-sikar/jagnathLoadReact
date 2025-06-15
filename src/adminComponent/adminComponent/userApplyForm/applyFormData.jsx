
import { useEffect, useState } from "react";
import {
  ChangeStatusCloseOrder,
  ChangeStatusConfirmOrder,
  GetnewUserApplyForm,
  deleteUserApplyForm,
} from "../../../services/applyNewUserForm";
import EditUserApplyForm from "./editUserApplyForm";


const ApplyFormData = () => {
  const [tableData, setTableData] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [modalType, setModalType] = useState(null); // 'edit', 'close', null
  const [closeMessage, setCloseMessage] = useState("");
  const [documents, setDocuments] = useState({});
  const [showDetails, setShowDetails] = useState(false);
const [detailUser, setDetailUser] = useState(null);

  const fetchTableData = async () => {
    try {
      const response = await GetnewUserApplyForm();
      setTableData(response.userForm_Data);
    } catch (error) {
      console.error("Error fetching table data:", error);
    }
  };

  useEffect(() => {
    fetchTableData();
  }, []);

  const handleModal = (type, user = null) => {
    setSelectedUser(user);
    setModalType(type);
    setCloseMessage("");
    setDocuments({});
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        await deleteUserApplyForm(id);
        alert("User deleted successfully!");
        fetchTableData();
      } catch (error) {
        console.error("Error deleting user:", error);
      }
    }
  };

  const handleConfirmOrder = async (item) => {
    if (item.status !== "1") {
      alert("This order is already confirmed!");
      return;
    }

    try {
      const response = await ChangeStatusConfirmOrder({
        status: "2",
        orderId: item._id,
      });

      if (response.status === 200) {
        alert("Order confirmed successfully!");
        fetchTableData();
      }
    } catch (error) {
      console.error("Failed to confirm order:", error);
      alert("Failed to confirm the order. Please try again.");
    }
  };

  const submitCloseOrder = async () => {
    if (!selectedUser) return;

    const formData = new FormData();
    formData.append("status", "3");
    formData.append("orderId", selectedUser._id);
    formData.append("message", closeMessage);

    Object.entries(documents).forEach(([key, file]) => {
      if (file) formData.append(key, file);
    });

    try {
      const response = await ChangeStatusCloseOrder(formData);

      if (response.status === 200) {
        alert("Order closed successfully!");
        fetchTableData();
        handleModal(null);
      }
    } catch (error) {
      console.error("Failed to close order:", error);
      alert("Failed to close the order. Please try again.");
    }
  };

  const handleFileChange = (e) => {
    setDocuments({ ...documents, [e.target.name]: e.target.files[0] });
  };


  const handleShowDetails = (user) => {
  setDetailUser(user);
  setShowDetails(true);
};



  return (
    <>
      <div className="col-md-12 mt-5">
        <div className="card">
          <div className="card-header">
            <h4 className="card-title">Apply Form User's Data</h4>
          </div>
          <div className="card-body">
            <div className="table-responsive">
              <table className="table table-striped table-hover">
                <thead>
                  <tr>
                    <th>Partner Id</th>
                    <th>Full Name</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Pan Card No</th>
                    <th>State</th>
                    <th>District</th>
                    <th>Category</th>
                    <th>Sub-Category</th>
                    <th>Status</th>
                    <th>Actions1</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {tableData.map((item) => (
                    <tr key={item._id}>
                      <td>{item.partnerEmail}</td>
                      <td>{item.fullName}</td>
                      <td>{item.email}</td>
                      <td>{item.phone}</td>
                      <td>{item.panCard}</td>
                      <td>{item.state}</td>
                      <td>{item.district}</td>
                      <td>{item.category}</td>
                      <td>{item.subCategory}</td>
                      <td>{
                        item.status === "1" ? "Pending" : item.status === "2" ? "Confirmed" : "Closed"
                      }</td>
                      <td>
                      {item.status === "1" && (
                          <button className="btn btn-success me-2" onClick={() => handleConfirmOrder(item)}>Confirm</button>
                        )}
                        {item.status === "2" && (
                          <button className="btn btn-danger me-2" onClick={() => handleModal('close', item)}>Close</button>
                        )}
                      </td>
                      <td>
                        {/* {item.status === "1" && (
                          <button className="btn btn-success me-2" onClick={() => handleConfirmOrder(item)}>Confirm</button>
                        )}
                        {item.status === "2" && (
                          <button className="btn btn-danger me-2" onClick={() => handleModal('close', item)}>Close</button>
                        )} */}
                        <button className="btn btn-info me-2" onClick={() => handleShowDetails(item)}>View Details</button>
                        {/* <button className="btn btn-warning me-2" onClick={() => handleModal('edit', item)}>Edit</button> */}
                        {/* <button className="btn btn-danger" onClick={() => handleDelete(item._id)}>Delete</button> */}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {modalType === 'edit' && (
        <EditUserApplyForm user={selectedUser} onClose={() => handleModal(null)} onUpdate={fetchTableData} />
      )}

      {modalType === 'close' && (
        <div className="modal show" style={{ display: "block", background: "rgba(0,0,0,0.5)" }}>
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Close Order</h5>
                <button className="btn-close" onClick={() => handleModal(null)}></button>
              </div>
              <div className="modal-body">
                <textarea className="form-control mb-3" placeholder="Enter your message..." value={closeMessage} onChange={(e) => setCloseMessage(e.target.value)} />
                {["document4", "document5", "document6", "document7"].map((doc, index) => (
                  <div key={index} className="mb-2">
                    <label>Upload {doc}:</label>
                    <input type="file" className="form-control" name={doc} onChange={handleFileChange} accept="image/*,.pdf,.doc,.docx" />
                  </div>
                ))}
              </div>
              <div className="modal-footer">
                <button className="btn btn-primary" onClick={submitCloseOrder}>Submit</button>
                <button className="btn btn-secondary" onClick={() => handleModal(null)}>Cancel</button>
              </div>
            </div>
          </div>
        </div>
      )}

{showDetails && detailUser && (
  <div className="modal show" style={{ display: "block", background: "rgba(0,0,0,0.5)" }}>
    <div className="modal-dialog modal-lg">
      <div className="modal-content">
        <div className="modal-header">
          <h5 className="modal-title">User Details</h5>
          <button className="btn-close" onClick={() => setShowDetails(false)}></button>
        </div>
        <div className="modal-body">
          {/* Show all details of detailUser */}
          <p><strong>Partner Email:</strong> {detailUser.partnerEmail}</p>
          <p><strong>Full Name:</strong> {detailUser.fullName}</p>
          <p><strong>Email:</strong> {detailUser.email}</p>
          <p><strong>Phone:</strong> {detailUser.phone}</p>
          <p><strong>Pan Card:</strong> {detailUser.panCard}</p>
          <p><strong>State:</strong> {detailUser.state}</p>
          <p><strong>District:</strong> {detailUser.district}</p>
          <p><strong>Address:</strong> {detailUser.fullAddress}</p>
          <p><strong>Category:</strong> {detailUser.category}</p>
          <p><strong>Sub-Category:</strong> {detailUser.subCategory}</p>
          <p><strong>Status:</strong> {detailUser.status === "1" ? "Pending" : detailUser.status === "2" ? "Confirmed" : "Closed"}</p>
          {/* Show documents if available */}
          {Object.entries(detailUser).map(([key, value]) => {
            if (key.startsWith("document") && value) {
              return (
                <div key={key} className="mb-2">
                  <strong>{key}:</strong> <a href={value} target="_blank" rel="noopener noreferrer">View Document</a>
                </div>
              );
            }
            return null;
          })}
        </div>
        <div className="modal-footer">
          <button className="btn btn-secondary" onClick={() => setShowDetails(false)}>Close</button>
        </div>
      </div>
    </div>
  </div>
)}



    </>
  );
};

export default ApplyFormData;
