import React, { useState } from "react";
import { Button, Container } from "react-bootstrap";

const ReportPage = () => {
  const [selectedTab, setSelectedTab] = useState("your_order");

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
        {selectedTab === "your_order" && <h4>Your Order Details Here</h4>}
        {selectedTab === "confirm_order" && <h4>Confirm Order Details Here</h4>}
        {selectedTab === "close_order" && <h4>Close Order Details Here</h4>}
      </div>
    </Container>
  );
};

export default ReportPage;
