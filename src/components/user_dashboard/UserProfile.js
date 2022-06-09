import React, { useState, useEffect, useContext } from "react";
import { AuthorizationContext } from "../../AuthorizationContext";
import { CardDeck, Card, Table } from "react-bootstrap";

function UserProfile() {
  const [store] = useContext(AuthorizationContext);
  const jwt = store.jwt;
  const [user, setUser] = useState({});

  useEffect(() => {
    displayContactInfo();
  }, []);

  const displayContactInfo = () => {
    const myHeaders = {
      Authorization: `Bearer ${jwt}`,
      "Content-Type": "application/json",
    };
    const requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch("https://merit-bank.herokuapp.com/api/Me", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        console.log(result);
        setUser(result);
      })
      .catch((error) => console.log("error", error));
  };

  return (
    <div>
      <p style={{ color: "blue", padding: "10px 0 0 50px" }}>
        Welcome, {user.firstName} {user.lastName}!
      </p>
      <CardDeck className="wrapper">
        <Card>
          <Card.Body>
            <Card.Title
              style={{ padding: "10px 0", borderBottom: "3px solid grey" }}
            >
              Contact
            </Card.Title>
            <Card.Text>
              Phone: <b>{user.phone}</b>
            </Card.Text>
            <Card.Text>
              Email: <b>{user.email}</b>
            </Card.Text>
            <Card.Text>
              Address: <b>{user.address}</b>
            </Card.Text>
          </Card.Body>
        </Card>
        <Card>
          <Card.Body>
            <Card.Title
              style={{ padding: "10px 0", borderBottom: "3px solid grey" }}
            >
              My Balance
            </Card.Title>
            <Card.Text>
              Total balance:
              <br />
              <code>{user.combinedBalance}</code>
            </Card.Text>
          </Card.Body>
        </Card>
      </CardDeck>
      <div className="wrapper">
        <p style={{ color: "blue", padding: "0 0 0 0px" }}>My Accounts</p>
        <Table striped hover style={{ fontSize: "14px" }} className="wrapper">
          <thead>
            <tr>
              <th>Account Number</th>
              <th>Account Type</th>
              <th>Balance</th>
              <th>Interest Rate</th>
              <th>Opening Date</th>
            </tr>
          </thead>
          <tbody>
            {user.personalCheckingAccount != null
              ? user.personalCheckingAccount.map((pca) => (
                  <tr key={pca.accountNumber}>
                    <td>{pca.accountNumber}</td>
                    <td>Personal Checking</td>
                    <td>$ {pca.balance}</td>
                    <td>{pca.interestRate} %</td>
                    <td>{pca.openingDate}</td>
                  </tr>
                ))
              : null}
            {user.savingsAccounts != null
              ? user.savingsAccounts.map((pca) => (
                  <tr key={pca.accountNumber}>
                    <td>{pca.accountNumber}</td>
                    <td>Savings</td>
                    <td>$ {pca.balance}</td>
                    <td>{pca.interestRate} %</td>
                    <td>{pca.openingDate}</td>
                  </tr>
                ))
              : null}
            {user.dbaCheckingAccounts != null
              ? user.dbaCheckingAccounts.map((pca) => (
                  <tr key={pca.accountNumber}>
                    <td>{pca.accountNumber}</td>
                    <td>DBA Checking</td>
                    <td>$ {pca.balance}</td>
                    <td>{pca.interestRate} %</td>
                    <td>{pca.openingDate}</td>
                  </tr>
                ))
              : null}
          </tbody>
        </Table>
      </div>
    </div>
  );
}

export default UserProfile;
