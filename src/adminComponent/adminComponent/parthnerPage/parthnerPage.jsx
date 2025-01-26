import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { GetnewpartnerData } from "../../../services/applyNewUserForm";

const PartnerPage = () => {
  const [tableData, setTableData] = useState([]);
  const [loading, setLoading] = useState(true); // Track loading state
  const [error, setError] = useState(null); // Track error state
  const [message, setMessage] = useState(""); // To store success message

  const fetchTableData = async () => {
    try {
      const response = await GetnewpartnerData();
      console.log(response, "response");

      // Check if the response contains partner data
      if (response && Array.isArray(response.partner_Data)) {
        setTableData(response.partner_Data);
        setMessage(response.message); // Set success message
      } else {
        throw new Error("Invalid response format");
      }
    } catch (err) {
      console.error("Error fetching table data:", err);
      setError("Failed to load partner data. Please try again later.");
    } finally {
      setLoading(false); // Stop loading after data is fetched or error occurs
    }
  };

  useEffect(() => {
    fetchTableData();
  }, []);

  // Handle conditional rendering based on loading and error states
  if (loading) {
    return <div>Loading...</div>; // Loading state message
  }

  if (error) {
    return (
      <div className="alert alert-danger" role="alert">
        {error}
      </div>
    ); // Display error message
  }

  return (
    <>
      <div className="col-md-12 mt-5">
        <div className="card">
          <div className="card-header">
            <div className="d-flex align-items-center">
              <h4 className="card-title">Partner's</h4>
              <Link to="/admin/become-partner" className="btn btn-primary btn-round ms-auto">
                <i className="fa fa-plus"></i> Add Partner
              </Link>
            </div>
          </div>

          {/* Show message if available */}
          {message && (
            <div className="alert alert-success" role="alert">
              {message}
            </div>
          )}

          <div className="card-header">
            <h4 className="card-title">Partner Table</h4>
          </div>

          <div className="card-body">
            <div className="table-responsive">
              {tableData.length === 0 ? (
                <div className="alert alert-warning" role="alert">
                  No partner data available.
                </div>
              ) : (
                <table id="multi-filter-select" className="display table table-striped table-hover">
                  <thead>
                    <tr>
                      <th>Full Name</th>
                      <th>Email</th>
                      <th>Phone</th>
                      <th>Designation</th>
                      <th>Institution Name</th>
                      <th>Message</th>
                      <th>Pan No</th>
                      <th>Aadhar No</th>
                    </tr>
                  </thead>
                  <tfoot>
                    <tr>
                      <th>Full Name</th>
                      <th>Email</th>
                      <th>Phone</th>
                      <th>Designation</th>
                      <th>Institution Name</th>
                      <th>Message</th>
                      <th>Pan No</th>
                      <th>Aadhar No</th>
                    </tr>
                  </tfoot>
                  <tbody>
                    {tableData.map((item) => (
                      <tr key={item._id}>
                        <td>{item.fullName}</td>
                        <td>{item.email}</td>
                        <td>{item.mobile}</td>
                        <td>{item.designation}</td>
                        <td>{item.institutionName}</td>
                        <td>{item.message}</td>
                        <td>{item.panNo}</td>
                        <td>{item.aadharNo}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PartnerPage;
