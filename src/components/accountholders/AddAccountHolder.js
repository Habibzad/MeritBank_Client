import { AuthorizationContext } from "../../AuthorizationContext";
import React, { useState, useContext } from "react";
import { Redirect, useHistory } from "react-router-dom";
import { Form, Button, Col, Row } from "react-bootstrap";

function AddAccountHolder() {
  const [store, setStore] = useContext(AuthorizationContext);
  const isLoggedIn = store.isLoggedIn;
  const role = store.role;
  const jwt = store.jwt;
  const history = useHistory();

  const [firstName, setFirstName] = useState("");
  const [middleName, setMiddleName] = useState("");
  const [lastName, setLastName] = useState("");
  const [dob, setDob] = useState("");
  const [ssn, setSSN] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [address, setAddress] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    createAccountHolder();
    setFirstName("");
    setMiddleName("");
    setLastName("");
    setSSN("");
  };

  async function createAccountHolder() {
    const myHeaders = {
      Authorization: "Bearer " + jwt,
      "Content-Type": "application/json",
    };

    var raw = JSON.stringify({
      firstName: firstName,
      middleName: middleName,
      lastName: lastName,
      dob: dob,
      ssn: ssn,
      phone: phone,
      email: email,
      address: address,
    });

    var requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: raw,
      redirect: "follow",
    };

    fetch("https://merit-bank.herokuapp.com/api/accountholders", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        setStore({
          ...store,
          successMessage: "AccountHolder Created Successfully!",
        });
        history.push("/admin/accountholders");
      })
      .catch((error) => console.log("error", error));
  }

  if (!isLoggedIn && role !== "[ROLE_ADMIN]") {
    return <Redirect to="/user" />;
  }

  return (
    <div>
      <h2 className="component-header">Create Account Holder</h2>
      <Form
        onSubmit={handleSubmit}
        className="wrapper"
        style={{
          margin: "1rem 2rem",
          backgroundColor: "#fcfcfc",
          border: "1px solid #f4f4f4",
        }}
      >
        <Form.Group as={Row} className="mb-2" controlId="formHorizontalEmail">
          <Form.Label column sm={2}>
            <i className="fas fa-user"></i> First Name
          </Form.Label>
          <Col sm={10}>
            <Form.Control
              required
              style={{
                border: "none",
                borderBottom: "1px solid grey",
                borderRadius: "0",
              }}
              type="text"
              placeholder="First Name here..."
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
          </Col>
        </Form.Group>
        <Form.Group
          as={Row}
          className="mb-2"
          controlId="formHorizontalPassword"
        >
          <Form.Label column sm={2}>
            <i class="fas fa-user"></i> Middle Name
          </Form.Label>
          <Col sm={10}>
            <Form.Control
              style={{
                border: "none",
                borderBottom: "1px solid grey",
                borderRadius: "0",
              }}
              type="text"
              placeholder="Middle Name"
              value={middleName}
              onChange={(e) => setMiddleName(e.target.value)}
            />
          </Col>
        </Form.Group>
        <Form.Group
          as={Row}
          className="mb-2"
          controlId="formHorizontalPassword"
        >
          <Form.Label column sm={2}>
            {" "}
            <i class="fas fa-user"></i> Last Name
          </Form.Label>
          <Col sm={10}>
            <Form.Control
              style={{
                border: "none",
                borderBottom: "1px solid grey",
                borderRadius: "0",
              }}
              type="text"
              placeholder="Last Name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
          </Col>
        </Form.Group>
        <Form.Group
          as={Row}
          className="mb-2"
          controlId="formHorizontalPassword"
        >
          <Form.Label column sm={2}>
            <i class="fas fa-calendar-alt"></i> Date of Birth
          </Form.Label>
          <Col sm={10}>
            <Form.Control
              style={{
                border: "none",
                borderBottom: "1px solid grey",
                borderRadius: "0",
              }}
              type="date"
              placeholder="Date of birth"
              value={dob}
              onChange={(e) => setDob(e.target.value)}
            />
          </Col>
        </Form.Group>
        <Form.Group
          as={Row}
          className="mb-2"
          controlId="formHorizontalPassword"
        >
          <Form.Label column sm={2}>
            <i class="fas fa-address-card"></i> SSN
          </Form.Label>
          <Col sm={10}>
            <Form.Control
              style={{
                border: "none",
                borderBottom: "1px solid grey",
                borderRadius: "0",
              }}
              type="text"
              placeholder="Social Security Number"
              value={ssn}
              onChange={(e) => setSSN(e.target.value)}
            />
          </Col>
        </Form.Group>
        <Form.Group
          as={Row}
          className="mb-2"
          controlId="formHorizontalPassword"
        >
          <Form.Label column sm={2}>
            <i class="fas fa-phone-square"></i> Phone
          </Form.Label>
          <Col sm={10}>
            <Form.Control
              style={{
                border: "none",
                borderBottom: "1px solid grey",
                borderRadius: "0",
              }}
              type="text"
              placeholder="Phone Number"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
            />
          </Col>
        </Form.Group>
        <Form.Group
          as={Row}
          className="mb-2"
          controlId="formHorizontalPassword"
        >
          <Form.Label column sm={2}>
            <i class="fas fa-envelope"></i> Email
          </Form.Label>
          <Col sm={10}>
            <Form.Control
              style={{
                border: "none",
                borderBottom: "1px solid grey",
                borderRadius: "0",
              }}
              type="email"
              placeholder="Email Address"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Col>
        </Form.Group>
        <Form.Group
          as={Row}
          className="mb-2"
          controlId="formHorizontalPassword"
        >
          <Form.Label column sm={2}>
            <i class="fas fa-map-marker-alt"></i> Address
          </Form.Label>
          <Col sm={10}>
            <Form.Control
              style={{
                border: "none",
                borderBottom: "1px solid grey",
                borderRadius: "0",
              }}
              type="text"
              placeholder="Home Address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
            />
          </Col>
        </Form.Group>
        <Form.Group as={Row} className="mb-2">
          <Col sm={{ span: 10, offset: 2 }}>
            <Button variant="dark" type="submit">
              Submit
            </Button>
            <Button
              variant="warning"
              onClick={() => history.push("/admin/accountholders")}
              style={{ marginLeft: "20px" }}
            >
              Cancel
            </Button>
          </Col>
        </Form.Group>
      </Form>
    </div>
  );
}

export default AddAccountHolder;
