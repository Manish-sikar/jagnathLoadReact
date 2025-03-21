import React, { useEffect, useState } from "react";
import { Button, Container } from "react-bootstrap";
import { GetReportData } from "../../services/reportServices";

const ReportPage = () => {
  const [selectedTab, setSelectedTab] = useState("your_order");
  const [ourOrderData, setOurOrderData ] = useState([]);
  const [confirmOrderData, setConfirmOrderData ] = useState([]);
  const [closeOrderData, setCloseOrderData ] = useState([]);
  
  const partnerEmail = localStorage.getItem("partnerEmail")

  const fetchProductsByCategory = async () => {
    const response = await GetReportData(partnerEmail);
    const productsData = response?.userForm_Data || [];
    const filteredData1 = productsData.filter((product) => product.status == 1);
    const filteredData2 = productsData.filter((product) => product.status == 2);
    const filteredData3 = productsData.filter((product) => product.status == 3);
    setOurOrderData(filteredData1);
    setConfirmOrderData(filteredData2);
    setCloseOrderData(filteredData3);
  };

  useEffect(() => {
      fetchProductsByCategory();
  }, []);



  return (
    <Container className="mt-5">
      <h2>Reports</h2>
      <div className="d-flex mb-4">
        <Button
          variant={selectedTab === "your_order" ? "primary" : "secondary"}
          onClick={() => setSelectedTab("your_order")}
          className="me-2"
        >
          Your Order
        </Button>
        <Button
          variant={selectedTab === "confirm_order" ? "primary" : "secondary"}
          onClick={() => setSelectedTab("confirm_order")}
          className="me-2"
        >
          Confirm Order
        </Button>
        <Button
          variant={selectedTab === "close_order" ? "primary" : "secondary"}
          onClick={() => setSelectedTab("close_order")}
        >
          Close Order
        </Button>
      </div>

      <div>
  {selectedTab === "your_order" && (
    <>
      <h4>Your Order Details</h4>
      {ourOrderData.length > 0 ? (
        <ul>
          {ourOrderData.map((order, index) => (
            <li key={index}>
              <strong>Name:</strong> {order.fullName}, 
              <strong>Email:</strong> {order.email}, 
              <strong>Phone:</strong> {order.phone}, 
              <strong>Status:</strong> {order.status}
            </li>
          ))}
        </ul>
      ) : (
        <p>No Orders Found</p>
      )}
    </>
  )}

  {selectedTab === "confirm_order" && (
    <>
      <h4>Confirm Order Details</h4>
      {confirmOrderData.length > 0 ? (
        <ul>
          {confirmOrderData.map((order, index) => (
            <li key={index}>
              <strong>Name:</strong> {order.fullName}, 
              <strong>Email:</strong> {order.email}, 
              <strong>Phone:</strong> {order.phone}, 
              <strong>Status:</strong> {order.status}
            </li>
          ))}
        </ul>
      ) : (
        <p>No Confirm Orders Found</p>
      )}
    </>
  )}

  {selectedTab === "close_order" && (
    <>
      <h4>Close Order Details</h4>
      {closeOrderData.length > 0 ? (
        <ul>
          {closeOrderData.map((order, index) => (
            <li key={index}>
              <strong>Name:</strong> {order.fullName}, 
              <strong>Email:</strong> {order.email}, 
              <strong>Phone:</strong> {order.phone}, 
              <strong>Status:</strong> {order.status}
            </li>
          ))}
        </ul>
      ) : (
        <p>No Close Orders Found</p>
      )}
    </>
  )}
</div>

    </Container>
  );
};

export default ReportPage;
