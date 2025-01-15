import Container from "react-bootstrap/Container";
import Nav from "react-bootstrap/Nav";
import Navbar from "react-bootstrap/Navbar";
import NavDropdown from "react-bootstrap/NavDropdown";

const SubHeaderUser = () => {
  const dropdownData = [
    { title: "Loan Products", items: loanProducts },
    { title: "Our Services", items: ourServices },
    { title: "Cards", items: cards },
    { title: "Account Opening", items: accountOpening },
    { title: "Investment", items: investment },
    { title: "Insurance", items: insurance },
    { title: "Book for New Vehicle", items: bookForVehicle },
    // { title: "Report", items: report },
    // { title: "Support", items: support },
  ];

  return (
    <>
      {/* Sub Navbar */}
      <Navbar
        collapseOnSelect
        expand="lg"
        style={style.subNavbar}
        variant="dark"
        className="sub-navbar"
      >
        <Container>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="ms-auto">
              {dropdownData.map((dropdown, index) => (
                <NavDropdown
                  key={index}
                  title={dropdown.title.toUpperCase()}
                  style={style.subNavbarLink}
                  menuVariant="light"
                >
                  {dropdown.items.map((item, i) => (
                    <NavDropdown.Item key={i} href={`#${item.replace(/\s+/g, "-").toLowerCase()}`}>
                      {item}
                    </NavDropdown.Item>
                  ))}
                </NavDropdown>
              ))}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
};

export default SubHeaderUser;

// Dropdown Items Data (unchanged)
const loanProducts = ["Agri loan", "Home loan", "Auto loan", "Two-wheeler loan", "Three-wheeler loan"];
const ourServices = ["ITR", "GST registration", "GST return", "New PAN card", "PAN card correction"];
const cards = ["AU Bank credit card", "IndusInd Bank credit card", "Axis Bank credit card"];
const accountOpening = ["AU Bank", "IndusInd Bank", "Axis Bank"];
const investment = ["RD", "FD"];
const insurance = ["Car insurance", "Two-wheeler insurance", "Commercial insurance"];
const bookForVehicle = ["Mahindra", "Kia", "Maruti Suzuki", "Tata"];
const report = ["Lead data", "Lead commission"];
const support = ["Contact number", "Gmail"];

// Styling (unchanged)
const style = {
  subNavbar: {
    backgroundColor: "#A64D79",
    borderTop: "3px solid #f1f1f1",
    padding: "1px 0",
    display: "block",
    zIndex: 1050,
    position: "relative",
  },
  subNavbarLink: {
    fontSize: "2px", // Default font size
    padding: "1px 2px",
    color: "#fff",
  },
};
