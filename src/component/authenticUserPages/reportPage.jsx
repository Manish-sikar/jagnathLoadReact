import React, { useEffect, useState } from "react";
import { Button, Container, Table } from "react-bootstrap";
import {
  GetTransHistroyData,
  GetReportData,
} from "../../services/applyNewUserForm";
import EditUserApplyForm from "../../adminComponent/adminComponent/userApplyForm/editUserApplyForm";

const ReportPage = () => {
  const [selectedTab, setSelectedTab] = useState("new_order");
  const [ourOrderData, setOurOrderData] = useState([]);
  const [confirmOrderData, setConfirmOrderData] = useState([]);
  const [closeOrderData, setCloseOrderData] = useState([]);
  const [transHistoryData, setTransHistoryData] = useState([]); // State for Transaction History
  const [selectedUser, setSelectedUser] = useState(null);
  const [modalType, setModalType] = useState(null); // 'edit', 'close', null
  const [closeMessage, setCloseMessage] = useState("");
  const [documents, setDocuments] = useState({});

  const partnerEmail = JSON.parse(localStorage.getItem("partnerEmail") || '""');

  // Fetch Orders
  const fetchProductsByCategory = async () => {
    const response = await GetReportData(partnerEmail);
    const productsData = response?.userForm_Data || [];
    setOurOrderData(productsData.filter((product) => product.status == 1));
    setConfirmOrderData(productsData.filter((product) => product.status == 2));
    setCloseOrderData(productsData.filter((product) => product.status == 3));
  };

  // Fetch Transaction History
  const fetchTransHistory = async () => {
    const response = await GetTransHistroyData(partnerEmail);
    if (response?.data?.length) {
      console.log(response.data , "respose hhhh")
      setTransHistoryData(response.data);
    }
  };

  useEffect(() => {
    fetchProductsByCategory();
    fetchTransHistory();
  }, []);

  const handleModal = (type, user = null) => {
    setSelectedUser(user);
    setModalType(type);
    setCloseMessage("");
    setDocuments({});
  };

  const [showDetails, setShowDetails] = useState(false);
const [detailUser, setDetailUser] = useState(null);

const handleShowDetails = (user) => {
  setDetailUser(user);
  setShowDetails(true);
};


  return (<>
    <Container className="mt-5">
      <h2>Reports</h2>
      <div className="d-flex mb-4">
        {["new_order", "confirm_order", "close_order", "Wallet_history"].map(
          (tab) => (
            <Button
              key={tab}
              variant={selectedTab === tab ? "primary" : "secondary"}
              onClick={() => setSelectedTab(tab)}
              className="me-2"
            >
              {tab.replace("_", " ").toUpperCase()}
            </Button>
          )
        )}
      </div>

      <div>
        {/* Orders Table */}
        {selectedTab === "new_order" && (
          <>
            <h4>Your Order Details</h4>
            {ourOrderData.length > 0 ? (
              <Table striped bordered hover responsive>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Token No</th>
                    <th>Name</th>
                    <th>Phone</th>
                    <th>Service</th>
                    <th>Date</th>
                    <th>Status</th>
                    <th>Edit</th>
                  </tr>
                </thead>
                <tbody>
                  {ourOrderData.map((order, index) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{order?.token_No || "Not Availabe"}</td>
                      <td>{order.fullName}</td>
                      <td>{order.phone}</td>
                      <td>{order.subCategory}</td>
                      <td>{order.createdAt}</td>
                      <td>Pending</td>
                      <td>
                        <button
                          className="btn btn-warning me-2"
                          onClick={() => handleModal("edit", order)}
                        >
                          Edit
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            ) : (
              <p>No Orders Found</p>
            )}
          </>
        )}

        {modalType === "edit" && (
          <EditUserApplyForm
            user={selectedUser}
            onClose={() => handleModal(null)}
            onUpdate={fetchProductsByCategory}
          />
        )}

        {/* Confirmed Orders Table */}
        {selectedTab === "confirm_order" && (
          <>
            <h4>Confirmed Order Details</h4>
            {confirmOrderData.length > 0 ? (
              <Table striped bordered hover responsive>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Token No</th>
                    <th>Name</th>
                    <th>Phone</th>
                    <th>Service</th>
                    <th>Date</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {confirmOrderData.map((order, index) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{order?.token_No || "Not Availabe"}</td>
                      <td>{order.fullName}</td>
                      <td>{order.phone}</td>
                      <td>{order.subCategory}</td>
                      <td>{order.updatedAt}</td>
                      <td>Confirm Order</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            ) : (
              <p>No Confirmed Orders Found</p>
            )}
          </>
        )}

        {/* Closed Orders Table */}
        {selectedTab === "close_order" && (
          <>
            <h4>Closed Order Details</h4>
            {closeOrderData.length > 0 ? (
              <Table striped bordered hover responsive>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Token No</th>
                    <th>Name</th>
                    <th>Phone</th>
                    <th>Service</th>
                    <th>Date</th>
                    <th>Status</th>
                    <th>Message</th>
                  </tr>
                </thead>
                <tbody>
                  {closeOrderData.map((order, index) => {
                    const hasDocuments =
                      order.document4 ||
                      order.document5 ||
                      order.document6 ||
                      order.document7;

                    return (
                      <React.Fragment key={index}>
                        <tr>
                          <td>{index + 1}</td>
                          <td>{order?.token_No || "Not Available"}</td>
                          <td>{order.fullName}</td>
                          <td>{order.phone}</td>
                          <td>{order.subCategory}</td>
                          <td>
                            {new Date(order.updatedAt).toLocaleDateString()}
                          </td>
                          <td>Close Order</td>
                          <td>{order?.message || "Not Available"}</td>
                          <td>
                            <button
                              className="btn btn-info btn-sm"
                              onClick={() => handleShowDetails(order)}
                            >
                              View Details
                            </button>
                          </td>
                        </tr>
                      </React.Fragment>
                    );
                  })}
                </tbody>
              </Table>
            ) : (
              <p>No Closed Orders Available</p>
            )}
          </>
        )}

        {/* Transaction History Table */}
        {selectedTab === "Wallet_history" && (
          <>
            <h4>Wallet History</h4>
            {transHistoryData.length > 0 ? (
              <Table striped bordered hover responsive>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Amount Cr/Dr</th>
                    <th>Available Balance After</th>
                    <th>Purpose</th>
                    <th>Date</th>
                  </tr>
                </thead>
                <tbody>
                  {transHistoryData.map((transaction, index) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>
                        ₹{transaction.amountDeducted?transaction.amountDeducted:transaction.requestingAmount} (
                        {transaction?.amountType || "debit"})
                      </td>
                      <td>₹{transaction.availableBalanceAfter}</td>
                      <td>{transaction.purpose}</td>
                      <td>
                        {new Date(transaction.timestamp).toLocaleString()}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            ) : (
              <p>No Wallet History Found</p>
            )}
          </>
        )}
      </div>
    </Container>
    {showDetails && detailUser && (
  <div
    className="modal show fade"
    style={{ display: "block", background: "rgba(0,0,0,0.5)" }}
  >
    <div className="modal-dialog modal-lg">
      <div className="modal-content">
        <div className="modal-header">
          <h5 className="modal-title">Order Details</h5>
          <button className="btn-close" onClick={() => setShowDetails(false)}></button>
        </div>
        <div className="modal-body">
          <p><strong>Full Name:</strong> {detailUser.fullName}</p>
          <p><strong>Phone:</strong> {detailUser.phone}</p>
          <p><strong>Email:</strong> {detailUser.email}</p>
          <p><strong>Pan No:</strong> {detailUser.panNo}</p>
          <p><strong>Aadhar No:</strong> {detailUser.aadharNo}</p>
          <p><strong>Institution:</strong> {detailUser.institutionName}</p>
          <p><strong>Message:</strong> {detailUser.message}</p>
          <p><strong>Status:</strong> {detailUser.status === "1" ? "Pending" : detailUser.status === "2" ? "Confirmed" : "Closed"}</p>
          <p><strong>Category:</strong> {detailUser.category}</p>
          <p><strong>Sub-Category:</strong> {detailUser.subCategory}</p>

          {/* Show any available documents */}
          <div className="mt-3">
            <h6>Documents:</h6>
            {Object.entries(detailUser).map(([key, value]) => {
              if (key.startsWith("document") && value) {
                return (
                  <div key={key}>
                    <strong>{key}:</strong>{" "}
                    <a href={value} target="_blank" rel="noopener noreferrer">
                      View Document
                    </a>
                  </div>
                );
              }
              return null;
            })}
          </div>
        </div>
        <div className="modal-footer">
          <button className="btn btn-secondary" onClick={() => setShowDetails(false)}>
            Close
          </button>
        </div>
      </div>
    </div>
  </div>
)}
</>
  );
};

export default ReportPage;
