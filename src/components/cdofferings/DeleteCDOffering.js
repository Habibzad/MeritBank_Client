import React, { useState, useContext } from "react";
import { AuthorizationContext } from "../../AuthorizationContext";
import { Redirect } from "react-router-dom";
import { Form, Row, Col, Button, Alert } from "react-bootstrap";
import { DELETE_CDOFFERING } from "../../ResourceEndpoints";
function DeleteCDOffering() {
  const [store] = useContext(AuthorizationContext);
  const isLoggedIn = store.isLoggedIn;
  const role = store.role;
  const jwt = store.jwt;
  const [id, setId] = useState("");
  const [successMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    const myHeaders = {
      Authorization: "Bearer " + jwt,
      "Content-Type": "application/json",
    };

    const payload = JSON.stringify({
      id: id,
    });

    const requestOptions = {
      method: "DELETE",
      headers: myHeaders,
      body: payload,
      redirect: "follow",
    };

    fetch(DELETE_CDOFFERING, requestOptions)
      .then((response) => response.json())
      .then((result) => console.log(result))
      .catch((error) => console.log("error", error));
  };

  if (!isLoggedIn && role !== "[ROLE_ADMIN]") {
    return <Redirect to="/user" />;
  }

  return (
    <div>
      {successMessage && <Alert variant="success">{successMessage}</Alert>}
      <h3 className="component-header">Delete CD Offering</h3>
      <Form onSubmit={handleSubmit}>
        <Form.Label>CD Offering ID</Form.Label>
        <Row className="align-items-center">
          <Col sm={2} className="my-1">
            <Form.Control
              id="inlineFormInputName"
              placeholder="Enter ID here..."
              onChange={(e) => setId(e.target.value)}
            />
          </Col>

          <Col sm={2} className="my-1">
            <Button variant="dark" type="submit">
              Submit
            </Button>
          </Col>
        </Row>
      </Form>
    </div>
  );
}

export default DeleteCDOffering;
