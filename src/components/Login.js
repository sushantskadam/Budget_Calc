import React, { useState ,useEffect} from "react";
import { useNavigate } from 'react-router-dom';
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
import SocialButton from "./SocialButton";
const bcrypt = require("bcryptjs");

const regForEmail = RegExp(/^[^\s@]+@[^\s@]+\.[^\s@]+$/);
const regForName = /^[a-zA-Z ]{2,100}$/;
const regForUsername = RegExp(
  /^(?=.{4,20}$)(?:[a-zA-Z\d]+(?:(?:\.|-|_)[a-zA-Z\d])*)+$/
);
const regForPassword = RegExp(
  /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/
);

function Login() {
  const [userdata, setUserdata] = useState([]);
  const navigate = useNavigate()
  
  const [user, setUser] = useState({
    username: "",
    password: "",
  });
  const [errors, setErrors] = useState({
    username: "",
    password: "",
  });

  useEffect(() => {
    const URL = "http://localhost:3001/user/";
    axios.get(URL).then((res) => {
      setUserdata(res.data);
      
    });
  }, []);
  const handler = (event) => {
    const { name, value } = event.target;

    // let errors=state.errors;
    switch (name) {
      case "username":
        let eusername = value.length >1
          ? ""
          : "Enter Valid UserName";
        setErrors({ ...errors, username: eusername });
        
        break;

      case "password":
        let epassword = regForPassword.test(value)
          ? ""
          : "Enter Valid Password";
        setErrors({ ...errors, password: epassword });
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

  const formSubmit = async (event) => {
    event.preventDefault();
    // setUser({ ...user, cource: selectedc });
    if (
      validate(errors) &&
      document.getElementById("username").value !== "" &&
      document.getElementById("password").value !== ""
    ) {
      // securePassword(cred.password)
      var ver = false;

      userdata.forEach((data) => {
        const passwordmatch = bcrypt.compare(user.password, data.password);
        console.log(user.username)
        if (
         (data.email === user.username ||
        data.username === user.username) && passwordmatch
        ) {
          ver = true;
        }
      });

      if (ver) {
        let login = user.username;
        navigate('/dashboard')
        //   history.push("/dashboard");
        console.log("logged in");
        localStorage.setItem("login", JSON.stringify(login));
      } else {
        alert("Username/Email or Password is wrong");
      }
    } else {
      alert("Please Enter Valid Data");
    }
  };
  const validate = (errors) => {
    let valid = true;
    Object.values(errors).forEach((val) => val.length > 0 && (valid = false));
    return valid;
  };
  const handleSocialLogin = (user) => {
    console.log(user);
    setUserdata(user._profile) 
    if(user){
        localStorage.setItem("login", JSON.stringify(user._profile.email));
        navigate('/dashboard')
    }
  };
  
  const handleSocialLoginFailure = (err) => {
    console.error(err);  
  };

  return (
    <div>
      <Container>
        <h1>Log In</h1>
        <Form id="myForm">
          {/* <Form.Group>
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
          </Form.Group> */}
          <Form.Group>
            <Row className="justify-content-md-center">
              <Col xs lg="5">
                <Form.Label></Form.Label>
                <InputGroup className="mb-2">
                  <InputGroup.Text>@</InputGroup.Text>

                  <FormControl
                    type="text"
                    placeholder="Username / Email"
                    name="username"
                    id="username"
                    onChange={handler}
                  />
                </InputGroup>
                {errors.username && (
                  <Form.Text style={{ color: "red" }}>
                    {errors.username}
                  </Form.Text>
                )}
              </Col>
            </Row>
          </Form.Group>
          <Form.Group>
            <Form.Label></Form.Label>
            <Row className="justify-content-md-center">
              <Col xs lg="5">
                <Form.Control
                  type="password"
                  placeholder="Enter password"
                  name="password"
                  id="password"
                  onChange={handler}
                />
                {errors.password && (
                  <Form.Text style={{ color: "red" }}>
                    {errors.password}
                  </Form.Text>
                )}
              </Col>
            </Row>
          </Form.Group>
         
          <br />
         
  
          <Form.Group>
            <Button variant="primary" type="submit" onClick={formSubmit}>
              Log In
            </Button>
          </Form.Group>
        </Form>
      </Container>
      <br/>
      <SocialButton
      provider="facebook"
      appId="582030492904262"
      onLoginSuccess={handleSocialLogin}
      onLoginFailure={handleSocialLoginFailure}
      className="btn btn-primary"
    >
      Login with Facebook
    </SocialButton>&nbsp;
    <SocialButton
      provider="google"
      appId="744649355195-q6dfeej85fe3qcu9oupr41e1ap971c6t.apps.googleusercontent.com"
      onLoginSuccess={handleSocialLogin}
      onLoginFailure={handleSocialLoginFailure}
      className="btn btn-danger"
    >
      Login with Gmail
    </SocialButton>
    <br/><br/>
    </div>
  );
}

export default Login;
