import React, { useState, useEffect, useContext } from "react";
import { AuthorizationContext } from "../../AuthorizationContext";
import { Redirect, useHistory } from "react-router-dom";
import { Table, Alert } from "react-bootstrap";

function Accounts() {
  const [accounts, setAccounts] = useState([]);
  const [store, setStore] = useContext(AuthorizationContext);
  const isLoggedIn = store.isLoggedIn;
  const role = store.role;
  const jwt = store.jwt;
  const history = useHistory();
  const successMessage = store.successMessage;
  const errorMessage = store.errorMessage;

  useEffect(() => {
    displayAccounts();
  }, []);

  const displayAccounts = () => {
    const myHeaders = {
      Authorization: "Bearer " + jwt,
      "Content-Type": "application/json",
    };

    const requestOptions = {
      method: "GET",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch("https://merit-bank.herokuapp.com/api/all-accounts", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        setAccounts(result);
        console.log("accounts results", result);
      })
      .catch((error) => {
        console.log("error", error);
      });
  };

  const closeAccount = (id) => {
    const myHeaders = {
      Authorization: "Bearer " + jwt,
      "Content-Type": "application/json",
    };

    var requestOptions = {
      method: "PUT",
      headers: myHeaders,
      redirect: "follow",
    };

    fetch(
      `https://merit-bank.herokuapp.com/api/close-account/${id}`,
      requestOptions
    )
      .then((response) => response.json())
      .then((result) => {
        console.log("close account", result);
        displayAccounts();
        setStore({ ...store, successMessage: "Account closed successfully!" });
        setStore({ ...store, errorMessage: result.message });
      })
      .catch((error) => {
        console.log("error close account", error);
      });
  };

  const deleteAccount = (id) => {
    setStore({ ...store, errorMessage: "Account cannot be deleted!" });
  };

  if (!isLoggedIn && role !== "[ROLE_ADMIN]") {
    return <Redirect to="/user" />;
  }

  if (successMessage !== "") {
    setTimeout(() => setStore({ ...store, successMessage: "" }), 3000);
  }

  if (errorMessage !== "") {
    setTimeout(() => setStore({ ...store, errorMessage: "" }), 3000);
  }

  let counter = 0;

  return (
    <div className="">
      <h3 className="transfer-header">
        <i class="fas fa-chevron-circle-right"></i> Accounts
      </h3>
      <div className="">
        {successMessage && (
          <Alert className="alert" variant="success">
            {successMessage}
          </Alert>
        )}
        {errorMessage && <Alert variant="danger">{errorMessage}</Alert>}
        <Table
          style={{ backgroundColor: "white", textAlign: "center" }}
          className="table table-striped table-bordered"
        >
          <thead>
            <tr>
              <th>
                <i class="fas fa-hashtag fa-col"></i>
              </th>
              <th>
                Account <i class="fas fa-hashtag"></i>
              </th>
              <th>Balance</th>
              <th>Interest Rate</th>
              <th>Opening Date</th>
              <th>Account Type</th>
              <th>Close Account</th>
              <th>Delete</th>
            </tr>
          </thead>
          <tbody>
            {accounts.map((account) =>
              account.status === "OPEN" ? (
                <tr key={account.accountNumber}>
                  <td>{++counter}</td>
                  <td>{account.accountNumber}</td>
                  <td>${account.balance}</td>
                  <td>{account.interestRate}%</td>
                  <td>{account.openingDate}</td>
                  <td>{account.accountType}</td>
                  <td
                    style={{ color: "blue", cursor: "pointer" }}
                    onClick={() => {
                      if (
                        window.confirm(
                          `Are you sure you want to close account number: ${account.accountNumber}`
                        )
                      ) {
                        closeAccount(account.accountNumber);
                      }
                    }}
                  >
                    Close Account
                  </td>
                  <td>
                    <i
                      className="fas fa-user-slash text-danger"
                      style={{ cursor: "pointer" }}
                      onClick={() => {
                        if (
                          window.confirm(
                            `Are you sure you want to delete account: ${account.accountNumber}`
                          )
                        ) {
                          deleteAccount(account.accountNumber);
                        }
                      }}
                    ></i>
                  </td>
                </tr>
              ) : null
            )}
          </tbody>
        </Table>
      </div>
    </div>
  );
}

export default Accounts;
