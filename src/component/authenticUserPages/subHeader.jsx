import { useNavigate } from "react-router-dom";
import { Navbar, Nav, NavDropdown, Offcanvas, Container } from "react-bootstrap";

const SubHeaderUser = ({ onCategorySelect }) => {
  const navigate = useNavigate();

  const dropdownData = [
    { title: "Loan Products", category: "Loan Products" },
    { title: "Our Services", category: "Our Services" },
    { title: "Cards", category: "Cards" },
    { title: "Account Opening", category: "Account Opening" },
    { title: "Investment", category: "Investment" },
    { title: "Insurance", category: "Insurance" },
    { title: "Book New Vehicle", category: "Book New Vehicle" },
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
