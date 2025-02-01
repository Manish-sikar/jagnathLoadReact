import { useNavigate } from "react-router-dom";
import { Navbar, Nav, NavDropdown, Offcanvas, Container } from "react-bootstrap";

const SubHeaderUser = ({ onCategorySelect }) => {
  const navigate = useNavigate();

  const dropdownData = [
    { title: "Loan Products", category: "loan_product" },
    { title: "Our Services", category: "our_service" },
    { title: "Cards", category: "cards" },
    { title: "Account Opening", category: "account_opening" },
    { title: "Investment", category: "investment" },
    { title: "Insurance", category: "insurance" },
    { title: "Book New Vehicle", category: "book_new_vehicle" },
      { title: "Report", category: "report" },
    { title: "Support", category: "support" },
  ];

  return (
    <Navbar expand="lg" className="bg-dark navbar-dark">
      <Container fluid>
        <Navbar.Toggle aria-controls="offcanvasNavbar" />
        <Navbar.Offcanvas id="offcanvasNavbar" aria-labelledby="offcanvasNavbarLabel" placement="end">
          <Offcanvas.Header closeButton>
            <Offcanvas.Title id="offcanvasNavbarLabel">Categories</Offcanvas.Title>
          </Offcanvas.Header>
          <Offcanvas.Body>
            <Nav className="me-auto">
              {dropdownData.map((dropdown, index) => (
                <Nav.Link key={index} onClick={() => onCategorySelect(dropdown.category)}>
                  {dropdown.title}
                </Nav.Link>
              ))}
            </Nav>
          </Offcanvas.Body>
        </Navbar.Offcanvas>
      </Container>
    </Navbar>
  );
};

export default SubHeaderUser;
