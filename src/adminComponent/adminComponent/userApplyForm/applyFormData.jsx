import { useEffect, useState } from "react";
import { GetnewUserApplyForm } from "../../../services/applyNewUserForm";

 

const ApplyFormData = () => {
  const [tableData, setTableData] = useState([]);

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

 
  return (
    <>
      <div className="col-md-12">
        <div className="card">
          <div className="card-header">
            <h4 className="card-title">Multi Filter Select</h4>
          </div>
          <div className="card-body">
            <div className="table-responsive">
              <table
                id="multi-filter-select"
                className="display table table-striped table-hover"
              >
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
                    <tr key={item._id}>
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
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ApplyFormData;
