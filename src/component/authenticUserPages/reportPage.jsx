import React, { useEffect, useState } from "react";
import { Button, Container, Table } from "react-bootstrap";
import { GetTransHistroyData, GetReportData } from "../../services/applyNewUserForm";

const ReportPage = () => {
  const [selectedTab, setSelectedTab] = useState("new_order");
  const [ourOrderData, setOurOrderData] = useState([]);
  const [confirmOrderData, setConfirmOrderData] = useState([]);
  const [closeOrderData, setCloseOrderData] = useState([]);
  const [transHistoryData, setTransHistoryData] = useState([]); // State for Transaction History

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
      setTransHistoryData(response.data);
    }
  };

  useEffect(() => {
    fetchProductsByCategory();
    fetchTransHistory();
  }, []);

  return (
    <Container className="mt-5">
      <h2>Reports</h2>
      <div className="d-flex mb-4">
        {["new_order", "confirm_order", "close_order", "Wallet_history"].map((tab) => (
          <Button
            key={tab}
            variant={selectedTab === tab ? "primary" : "secondary"}
            onClick={() => setSelectedTab(tab)}
            className="me-2"
          >
            {tab.replace("_", " ").toUpperCase()}
          </Button>
        ))}
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
                    <th>Date</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {ourOrderData.map((order, index) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>{order?.token_No || "Not Availabe"}</td>
                      <td>{order.fullName}</td>
                      <td>{order.phone}</td>
                      <td>{order.createdAt}</td>
                      <td>Pending</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            ) : (
              <p>No Orders Found</p>
            )}
          </>
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
                    <th>Date</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {closeOrderData.map((order, index) => (
                    <tr key={index}>
                 <td>{index + 1}</td>
                      <td>{order?.token_No || "Not Availabe"}</td>
                      <td>{order.fullName}</td>
                      <td>{order.phone}</td>
                      <td>{order.updatedAt}</td>
                      <td>Close Order</td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            ) : (
              <p>No Closed Orders Found</p>
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
                    <th>Amount Deducted</th>
                    <th>Available Balance After</th>
                    <th>Purpose</th>
                    <th>Date</th>
                  </tr>
                </thead>
                <tbody>
                  {transHistoryData.map((transaction, index) => (
                    <tr key={index}>
                      <td>{index + 1}</td>
                      <td>₹{transaction.amountDeducted}</td>
                      <td>₹{transaction.availableBalanceAfter}</td>
                      <td>{transaction.purpose}</td>
                      <td>{new Date(transaction.timestamp).toLocaleString()}</td>
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
  );
};

export default ReportPage;
