import { useEffect, useState } from "react";
import {
  GetnewUserApplyForm,
  deleteUserApplyForm,
} from "../../../services/applyNewUserForm";
import { Link, useNavigate } from "react-router-dom";
import EditUserApplyForm from "./editUserApplyForm";

const ApplyFormData = () => {
  const [tableData, setTableData] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);

  const navigate = useNavigate();
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

  const handleEdit = (user) => {
    setSelectedUser(user);
    setShowEditModal(true);
  };

  const handleCloseModal = () => {
    setSelectedUser(null);
    setShowEditModal(false);
  };

  const handleDelete = async (id) => {
    if (window.confirm("Are you sure you want to delete this user?")) {
      try {
        await deleteUserApplyForm(id);
        alert("User deleted successfully!");
        fetchTableData(); // Refresh data
      } catch (error) {
        console.error("Error deleting user:", error);
      }
    }
  };

  return (
    <>
      <div className="col-md-12 mt-5">
        <div className="card">
          <div className="card-header">
            <div className="d-flex align-items-center">
              <h4 className="card-title">Apply Form User's Data</h4>
            </div>
          </div>
          <div className="card-header">
            <h4 className="card-title">Multi Filter Table</h4>
          </div>
          <div className="card-body">
            <div className="table-responsive">
              <table
                id="multi-filter-select"
                className="display table table-striped table-hover"
              >
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
                    <th>document1</th>
                    <th>document2</th>
                    <th>document3</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tfoot>
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
                    <th>document1</th>
                    <th>document2</th>
                    <th>document3</th>
                    <th>Action</th>
                  </tr>
                </tfoot>
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
                      
                      <td>
                        {item.document1 &&
                        (item.document1.endsWith(".pdf") ||
                          item.document1.endsWith(".doc") ||
                          item.document1.endsWith(".docx")) ? (
                          <Link
                            to={item.document1}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            View Document
                          </Link>
                        ) : (
                          <img
                            src={item.document1}
                            alt="Doc 1"
                            width="50"
                            height="50"
                          />
                        )}
                      </td>
                      <td>
                        {item.document2 &&
                        (item.document2.endsWith(".pdf") ||
                          item.document2.endsWith(".doc") ||
                          item.document2.endsWith(".docx")) ? (
                          <Link
                            to={item.document2}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            View Document
                          </Link>
                        ) : (
                          <img
                            src={item.document2}
                            alt="Doc 2"
                            width="50"
                            height="50"
                          />
                        )}
                      </td>
                      <td>
                        {item.document3 &&
                        (item.document3.endsWith(".pdf") ||
                          item.document3.endsWith(".doc") ||
                          item.document3.endsWith(".docx")) ? (
                          <Link
                            to={item.document3}
                            target="_blank"
                            rel="noopener noreferrer"
                          >
                            View Document
                          </Link>
                        ) : (
                          <img
                            src={item.document3}
                            alt="Doc 3"
                            width="50"
                            height="50"
                          />
                        )}
                      </td>
                     
                      <td>
                        <button
                          className="btn btn-warning btn-sm me-2"
                          onClick={() => handleEdit(item)}
                        >
                          Edit
                        </button>
                        <button
                          className="btn btn-danger btn-sm"
                          onClick={() => handleDelete(item._id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {showEditModal && (
        <EditUserApplyForm
          user={selectedUser}
          onClose={handleCloseModal}
          onUpdate={fetchTableData}
        />
      )}
    </>
  );
};

export default ApplyFormData;
