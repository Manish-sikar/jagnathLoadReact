import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import {
  GetnewpartnerData,
  deletePartner,
  ParthnerChangepass,
} from "../../../services/applyNewUserForm";
import { baseURL } from "../../../services/apiService";

const PartnerPage = () => {
  const [tableData, setTableData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const fetchTableData = async () => {
    try {
      const response = await GetnewpartnerData();
      if (response && Array.isArray(response.partner_Data)) {
        setTableData(response.partner_Data);
        setMessage(response.message);
      } else {
        throw new Error("Invalid response format");
      }
    } catch (err) {
      console.error("Error fetching table data:", err);
      setError("Failed to load partner data. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTableData();
  }, []);

  const handleDelete = async (id) => {
    const result = await Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    });

    if (result.isConfirmed) {
      try {
        await deletePartner(id);
        Swal.fire("Deleted!", "Partner has been deleted.", "success");
        fetchTableData();
      } catch (error) {
        Swal.fire("Error!", "Failed to delete partner.", "error");
      }
    }
  };

  const handleEdit = (partner) => {
    navigate("/admin/partner/edit", { state: { partner } });
  };

  const handleChangePassword = async (id) => {
    const { value: newPassword } = await Swal.fire({
      title: "Enter new password",
      input: "password",
      inputPlaceholder: "Enter new password",
      showCancelButton: true,
      inputValidator: (value) => {
        if (!value) return "Password is required!";
      },
    });

    if (newPassword) {
      try {
        await ParthnerChangepass({ id, newPassword });
        Swal.fire("Success!", "Password changed successfully.", "success");
      } catch (error) {
        Swal.fire("Error!", "Failed to change password.", "error");
      }
    }
  };

  const handleAddAmount = async (JN_Id) => {
    // Step 1: Get the amount
    Swal.fire({
      title: "Enter the amount to add:",
      input: "text",
      inputLabel: "Amount",
      inputPlaceholder: "Enter a number",
      inputValidator: (value) => {
        if (!value || isNaN(value) || Number(value) <= 0) {
          return "Please enter a valid number";
        }
      },
      showCancelButton: true,
    }).then((amountResult) => {
      if (amountResult.isConfirmed) {
        const amount = parseFloat(amountResult.value);

        // Step 2: Get the remark
        Swal.fire({
          title: "Enter the remark for this transaction:",
          input: "text",
          inputLabel: "Remark",
          inputPlaceholder: "Enter a remark",
          inputValidator: (value) => {
            if (!value.trim()) {
              return "Remark cannot be empty";
            }
          },
          showCancelButton: true,
        }).then(async (remarkResult) => {
          if (remarkResult.isConfirmed) {
            const remark = remarkResult.value;

            try {
              const response = await fetch(`${baseURL}/addAmountByAdmin`, {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  amount,
                  partnerEmail: JN_Id,
                  remark,
                }),
              });

              const result = await response.json();
              if (response.ok) {
                Swal.fire(
                  "Success!",
                  `Amount added successfully! Updated Balance: ₹${result.updatedBalance}`,
                  "success"
                );
                fetchTableData();
              } else {
                Swal.fire(
                  "Error",
                  result.error || "Failed to add amount.",
                  "error"
                );
              }
            } catch (error) {
              console.error("Error adding amount:", error);
              Swal.fire(
                "Error",
                "An error occurred. Please try again.",
                "error"
              );
            }
          }
        });
      }
    });
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div className="alert alert-danger">{error}</div>;

  return (
    <div className="col-md-12 mt-5">
      <div className="card">
        <div className="card-header">
          <h4 className="card-title">Partner's</h4>
          <Link
            to="/admin/become-partner"
            className="btn btn-primary btn-round ms-auto"
          >
            <i className="fa fa-plus"></i> Add Partner
          </Link>
        </div>
        {message && <div className="alert alert-success">{message}</div>}
        <div className="card-body">
          <div className="table-responsive">
            {tableData.length === 0 ? (
              <div className="alert alert-warning">
                No partner data available.
              </div>
            ) : (
              <table className="table table-striped table-hover">
                <thead>
                  <tr>
                    <th>JN Id </th>
                    <th>Full Name</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Wallet Balance</th>
                    <th>Designation</th>
                    <th>Institution</th>
                    <th>Message</th>
                    <th>Pan No</th>
                    <th>Aadhar No</th>
                    {/* <th>Add Amount</th> */}
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {tableData.map((item) => (
                    <tr key={item._id}>
                      <td>{item.JN_Id}</td>
                      <td>{item.fullName}</td>
                      <td>{item.email}</td>
                      <td>{item.mobile}</td>
                      <td>{item.balance}</td>
                      <td>{item.designation}</td>
                      <td>{item.institutionName}</td>
                      <td>{item.message}</td>
                      <td>{item.panNo}</td>
                      <td>{item.aadharNo}</td>
                      {/* <td>
                     
                        <button
                          className="btn btn-sm btn-success"
                          onClick={() => handleAddAmount(item.JN_Id)}
                        >
                          Add Amount
                        </button>
                      </td> */}
                      <td>
                        <button
                          className="btn btn-sm btn-primary me-2"
                          onClick={() => handleEdit(item)}
                        >
                          <i className="fa fa-edit"></i>
                        </button>
                        <button
                          className="btn btn-sm btn-danger me-2"
                          onClick={() => handleDelete(item._id)}
                        >
                          <i className="fa fa-trash"></i>
                        </button>
                        <button
                          className="btn btn-sm btn-warning"
                          onClick={() => handleChangePassword(item._id)}
                        >
                          <i className="fa fa-key"></i>
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PartnerPage;
