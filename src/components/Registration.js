import React, { useState } from "react";
import axios from "axios";
import {
  Button,
  Row,
  Col,
  Modal,
  Form,
  Container,
  InputGroup,
  FormControl,
  FormGroup,
} from "react-bootstrap";
const bcrypt = require("bcryptjs");

const regForEmail = RegExp(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
const regForName = /^[a-zA-Z ]{2,100}$/;
const regForUsername = RegExp(/^(?=.{4,20}$)(?:[a-zA-Z\d]+(?:(?:\.|-|_)[a-zA-Z\d])*)+$/);
const regForPassword = RegExp(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/);


function Registration() {
  const [user, setUser] = useState({
    fname: "",
    lname: "",
    email: "",
    username: "",
    password: "",
    repeatpassword:""
  });
  const [errors, setErrors] = useState({
    fname: "",
    lname: "",
    email: "",
    username: "",
    password: "",
    repeatpassword:""
  });
  const handler = (event) => {
    const { name, value } = event.target;

    // let errors=state.errors;
    switch (name) {
      case "fname":
        let efname = regForName.test(value) ? "" : "Please Enter Valid Name";
        setErrors({ ...errors, fname: efname });
        console.log(value)
        break;
      case "lname":
        let elname = regForName.test(value) ? "" : "Please Enter Valid Name";
        setErrors({ ...errors, lname: elname });
        break;
      case "email":
        let eemail = regForEmail.test(value) ? "" : "Enter Valid Email";
        setErrors({ ...errors, email: eemail });
        break;
      case "username":
        let eusername = regForUsername.test(value) ? "" : "Enter Valid UserName";
        setErrors({ ...errors, username: eusername });
        console.log(eusername)
        break;

        case 'password':
          let epassword = regForPassword.test(value) ? "" : "Enter Valid Password";
          setErrors({ ...errors, password: epassword });
          break;
      case 'repeatpassword':
        console.log(user.password)
        console.log(value)
        let erepeatpassword = value!==user.password ? "Password Dont Match" : "";
        setErrors({ ...errors, repeatpassword: erepeatpassword });                            
          break;

      
      
      default:
    }
    setUser((prevState) => ({
      ...prevState,
      [name]: value,
    }));

    // setState({[name]:value},...state);

    // setErrors(errors)
  };

  const formSubmit = async(event) => {
    event.preventDefault();
    // setUser({ ...user, cource: selectedc });
    if (
      validate(errors) &&
      document.getElementById("fname").value !== "" &&
      document.getElementById("lname").value !== "" &&
      document.getElementById("email").value !== "" &&
      document.getElementById("username").value !== "" &&
      document.getElementById("password").value !== "" &&
      document.getElementById("repeatpassword").value !== "" 
    ) {
      // securePassword(cred.password)
      const passwordHash = await bcrypt.hash(user.password,10);
      let formData = {
        fname: user.fname,
        lname: user.lname,
        username:user.username,
        email: user.email,
        password: passwordHash
      };

      const URL = "http://localhost:3001/user/";
      axios.post(URL, formData)
      .then(res=>{
        setUser(res.data)
      })
      // const res = axios.post(URL, formData);
      // setUser(res.data);
      alert("Registered Succesfully");
      document.getElementById("myForm").reset();
      
    } else {
      alert("Please Enter Valid Data");
    }
  };
  const validate = (errors) => {
    let valid = true;
    Object.values(errors).forEach((val) => val.length > 0 && (valid = false));
    return valid;
  };

  return (
    <div>
      <Container>
        <h1>Registration</h1>
        <Form id="myForm"> 
          <Form.Group>
            <Form.Label ></Form.Label>
            <Row className="justify-content-md-center">
              <Col xs lg="3">
                <Form.Control
                  placeholder="First name"
                  name="fname"
                  id="fname"
                  onChange={handler}
                  //   className={!errors.fname ? '' : 'red-border'}

                  //   error={errors.fname===''?'':'ajfah'} helperText={errors.email}
                />

                {errors.fname && (
                  <Form.Text style={{ color: "red" }}>{errors.fname}</Form.Text>
                )}
              </Col>
              <Col xs lg="3">
                <Form.Control
                  placeholder="Last name"
                  name="lname"
                  id="lname"
                  onChange={handler}
                />
                {errors.lname && (
                  <Form.Text style={{ color: "red" }}>{errors.lname}</Form.Text>
                )}
              </Col>
            </Row>
          </Form.Group>
          <Form.Group>
            <Row className="justify-content-md-center">
              <Col xs lg="6">
                <Form.Label></Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Enter email"
                  name="email"
                  id="email"
                  onChange={handler}
                />
                {errors.email && (
                  <Form.Text style={{ color: "red" }}>{errors.email}</Form.Text>
                )}
              </Col>
            </Row>
          </Form.Group>
          <Form.Group>
            <Row className="justify-content-md-center">
              <Col xs lg="6">
                <Form.Label></Form.Label>
                <InputGroup className="mb-2">
                
                  <InputGroup.Text>@</InputGroup.Text>

                  <FormControl
                  type="text"
                    placeholder="Username"
                    name="username"
                    id="username"
                    onChange={handler}
                  />
                  </InputGroup>
                   {errors.username && (
                  <Form.Text style={{ color: "red" }}>{errors.username}</Form.Text>
                )}
                
                
              </Col>
            </Row>
          </Form.Group>
          <Form.Group>
            <Form.Label></Form.Label>
            <Row className="justify-content-md-center">
              <Col xs lg="3">
              
                    <Form.Control type="password" placeholder="Enter password" name="password" id="password" onChange={handler}/>
                {errors.password && (
                  <Form.Text style={{ color: "red" }}>{errors.password}</Form.Text>
                )}
              </Col>
              <Col xs lg="3">
              
                    <Form.Control type="password" placeholder="Confirm password" name="repeatpassword" id="repeatpassword" onChange={handler}/>
                {errors.repeatpassword && (
                  <Form.Text style={{ color: "red" }}>{errors.repeatpassword}</Form.Text>
                )}
              </Col>
            </Row>
          </Form.Group><br/>
          <Form.Group>
          <Button variant="primary" type="submit" onClick={formSubmit}>
    Submit
  </Button>
  </Form.Group>
        </Form>
      </Container>
    </div>
  );
}

export default Registration;
