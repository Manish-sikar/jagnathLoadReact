import React, { useEffect, useState } from "react";
import Card from "react-bootstrap/Card";
import Col from "react-bootstrap/Col";
import Row from "react-bootstrap/Row";
import { GetServiceData } from "../services/serviceAdmin";
import { baseURL } from "../services/apiService";

const Service = () => {


  const [servicesData, setServicesData] = useState([]);

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    const response = await GetServiceData();
    const serviceData = response.services_Data;
    setServicesData(serviceData.filter((service) => service.status === "1"));
  };

 

 

  return (



    
    <div className="service-page-container">
    {/* Heading for the service page */}
    <h1 className="text-center my-4">Our Services</h1> {/* Add heading with some margin */}
    
    <Row className="g-3 ms-4">
      {servicesData.map((item, idx) => (
        <Col xs={12} sm={6} md={4} lg={2} key={idx} className="p-3">
          <Card style={{ width: "10rem" }} className="p-3">
            <Card.Img
              variant="top"
              src={`${baseURL}/${item.card_logo}` || "https://via.placeholder.com/150"} // Fallback for missing images
              alt={item.card_title || `Card ${idx + 1}`} // Fallback for missing names
            />
            <Card.Body>
              <Card.Title>{item.card_title || `Card ${idx + 1}`}</Card.Title> {/* Fallback for missing names */}
            </Card.Body>
          </Card>
        </Col>
      ))}
    </Row>
  </div>

  );
};

export default Service;
