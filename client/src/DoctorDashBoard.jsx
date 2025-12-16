import React, { useEffect } from "react";
import { useNavigate, Link, Outlet } from "react-router-dom";
import { Container, Row, Col, Navbar, Nav, Button } from "react-bootstrap";

const DoctorDashBoard = () => {
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("name")) {
      navigate("/");
    }
  }, [navigate]);

  const logout = () => {
    localStorage.clear();
    navigate("/");
  };

  return (
    <>
   
      <Navbar bg="primary" variant="dark" expand="lg" className="px-4">
        <Navbar.Brand>Doctor Admin Panel</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse className="justify-content-end">
          <Nav className="me-3 text-white">
            <div className="d-flex flex-column text-white me-3">
              <span><strong>Welcome:</strong> {localStorage.getItem("name")}</span>
              <span><strong>Email:</strong> {localStorage.getItem("email")}</span>
            </div>
            <Button variant="danger" onClick={logout}>Logout</Button>
          </Nav>
        </Navbar.Collapse>
      </Navbar>

      
      <Container fluid>
        <Row>
        
          <Col md={3} lg={2} className="bg-light p-4 border-end min-vh-100">
            <h5 className="mb-4">Menu</h5>
            <Nav className="flex-column">
              <Nav.Link as={Link} to="mypatient">🩺 My Appointments</Nav.Link>
           
            </Nav>
          </Col>

       
          <Col md={9} lg={10} className="p-4">
            <Outlet />
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default DoctorDashBoard;
