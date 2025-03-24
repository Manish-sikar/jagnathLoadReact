import React, { useEffect, useState } from "react";
import { Button, Container } from "react-bootstrap";
import { GetReportData } from "../../services/reportServices";
import { GetTransHistroyData } from "../../services/applyNewUserForm";

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
        {["new_order", "confirm_order", "close_order", "trans_history"].map((tab) => (
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
        {/* Your Orders */}
        {selectedTab === "new_order" && (
          <>
            <h4>Your Order Details</h4>
            {ourOrderData.length > 0 ? (
              <ul>
                {ourOrderData.map((order, index) => (
                  <li key={index}>
                    <strong>Name:</strong> {order.fullName}, 
                    <strong> Email:</strong> {order.email}, 
                    <strong> Phone:</strong> {order.phone}, 
                    <strong> Status:</strong> {order.status}
                  </li>
                ))}
              </ul>
            ) : (
              <p>No Orders Found</p>
            )}
          </>
        )}

        {/* Confirm Orders */}
        {selectedTab === "confirm_order" && (
          <>
            <h4>Confirm Order Details</h4>
            {confirmOrderData.length > 0 ? (
              <ul>
                {confirmOrderData.map((order, index) => (
                  <li key={index}>
                    <strong>Name:</strong> {order.fullName}, 
                    <strong> Email:</strong> {order.email}, 
                    <strong> Phone:</strong> {order.phone}, 
                    <strong> Status:</strong> {order.status}
                  </li>
                ))}
              </ul>
            ) : (
              <p>No Confirm Orders Found</p>
            )}
          </>
        )}

        {/* Close Orders */}
        {selectedTab === "close_order" && (
          <>
            <h4>Close Order Details</h4>
            {closeOrderData.length > 0 ? (
              <ul>
                {closeOrderData.map((order, index) => (
                  <li key={index}>
                    <strong>Name:</strong> {order.fullName}, 
                    <strong> Email:</strong> {order.email}, 
                    <strong> Phone:</strong> {order.phone}, 
                    <strong> Status:</strong> {order.status}
                  </li>
                ))}
              </ul>
            ) : (
              <p>No Close Orders Found</p>
            )}
          </>
        )}

        {/* Transaction History */}
        {selectedTab === "trans_history" && (
          <>
            <h4>Transaction History</h4>
            {transHistoryData.length > 0 ? (
              <ul>
                {transHistoryData.map((transaction, index) => (
                  <li key={index}>
                    <strong>Amount Deducted:</strong> ₹{transaction.amountDeducted}, 
                    <strong> Available Balance After:</strong> ₹{transaction.availableBalanceAfter}, 
                    <strong> Purpose:</strong> {transaction.purpose}, 
                    <strong> Date:</strong> {new Date(transaction.timestamp).toLocaleString()}
                  </li>
                ))}
              </ul>
            ) : (
              <p>No Transaction History Found</p>
            )}
          </>
        )}
      </div>
    </Container>
  );
};

export default ReportPage;
