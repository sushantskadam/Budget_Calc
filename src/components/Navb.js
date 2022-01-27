import React,{useState,useEffect} from "react";
import {Nav,Navbar,Container,NavDropdown} from 'react-bootstrap'
import{Link} from 'react-router-dom'
import Login from "./Login";

function Navb() {
  const [login,setLogin]=useState(false)
  useEffect(() => {
    setInterval(() => {
      if(localStorage.getItem('login')) {setLogin(true)} else {setLogin(false)}
  }, 100);
  }, [])
  return (
    <>
      <Navbar collapseOnSelect expand="lg" bg="primary" variant="dark">
        <Container fluid={true}>
          <Navbar.Brand href="#home">React-Bootstrap</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
           <Nav.Link as={Link} to="/" style={{textDecoration:"none"}}  >Home</Nav.Link>
           <Nav.Link as={Link} to="/reg" style={{textDecoration:"none"}}>Signup</Nav.Link>
           <Nav.Link as={Link} to="/users" style={{textDecoration:"none"}}>User</Nav.Link>

              <NavDropdown title="Dropdown" id="collasible-nav-dropdown">
                <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">
                  Another action
                </NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3">
                  Something
                </NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action/3.4">
                  Separated link
                </NavDropdown.Item>
              </NavDropdown>
            </Nav>
            <Nav>
              {login && 
                            <Nav.Link as={Link} to="/"  onClick={()=>localStorage.removeItem("login")} style={{textDecoration:"none"}}>Log Out</Nav.Link>

              }
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </>
  );
}

export default Navb;
