import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { GetnewUserApplyForm } from "../../../services/applyNewUserForm";

const ApplyFormData = () => {
  const [tableData, setTableData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchTableData = async () => {
    setLoading(true);
    setError(null);
    try {
      const response = await GetnewUserApplyForm();
      if (response?.userForm_Data) {
        setTableData(response.userForm_Data);
      } else {
        setTableData([]);
      }
    } catch (err) {
      console.error("Error fetching table data:", err);
      setError("Failed to load data. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTableData();
  }, []);

  return (
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
        <div className="card-body">
          <div className="table-responsive">
            {loading ? (
              <div className="text-center p-3">
                <span className="spinner-border text-primary"></span> Loading data...
              </div>
            ) : error ? (
              <div className="alert alert-danger text-center">{error}</div>
            ) : tableData.length === 0 ? (
              <div className="text-center p-3">No records found.</div>
            ) : (
              <table id="multi-filter-select" className="display table table-striped table-hover">
                <thead>
                  <tr>
                    <th>Full Name</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Pan Card No</th>
                    <th>State</th>
                    <th>District</th>
                    <th>Category</th>
                    <th>Sub-Category</th>
                  </tr>
                </thead>
                <tfoot>
                  <tr>
                    <th>Full Name</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Pan Card No</th>
                    <th>State</th>
                    <th>District</th>
                    <th>Category</th>
                    <th>Sub-Category</th>
                  </tr>
                </tfoot>
                <tbody>
                  {tableData.map((item) => (
                    <tr key={item._id || item.email}>
                      <td>{item.fullName}</td>
                      <td>{item.email}</td>
                      <td>{item.phone}</td>
                      <td>{item.panCard}</td>
                      <td>{item.state}</td>
                      <td>{item.district}</td>
                      <td>{item.category}</td>
                      <td>{item.subCategory}</td>
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

export default ApplyFormData;
