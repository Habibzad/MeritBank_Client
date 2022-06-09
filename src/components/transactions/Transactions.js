import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch,
} from "react-router-dom";
import { Jumbotron } from "react-bootstrap";

import TransactionsList from "./TransactionsList";
import DepositTransaction from "./DepositTransaction";
import WithdrawTransaction from "./WithdrawTransaction";
import TransferTransaction from "./TransferTransaction";

const deposit = "/deposit";
const withdraw = "/withdraw";
const transfer = "/transfer";

function AddAccount() {
  const { url } = useRouteMatch();
  return (
    <React.Fragment className="container">
      <Router>
        <Jumbotron className="menu1">
          <h5 className="component-header">Transactions</h5>

          <div className="row">
            <div className="col-md-2 add-account-dash">
              <Link
                style={{ fontSize: "16px" }}
                className="add-account-link"
                to={url}
              >
                Transactions List <i class="fas fa-chevron-right"></i>
              </Link>
              <Link
                style={{ fontSize: "16px" }}
                className="add-account-link"
                to={url + deposit}
              >
                Deposit <i class="fas fa-chevron-right"></i>
              </Link>
              <Link
                style={{ fontSize: "16px" }}
                className="add-account-link"
                to={url + withdraw}
              >
                Withdraw <i class="fas fa-chevron-right"></i>
              </Link>
              <Link
                style={{ fontSize: "16px" }}
                className="add-account-link"
                to={url + transfer}
              >
                Transfer <i class="fas fa-chevron-right"></i>
              </Link>
            </div>
            <div className=" add-account-container">
              <Switch>
                <Route exact path={url}>
                  <TransactionsList />
                </Route>
                <Route exact path={url + deposit}>
                  <DepositTransaction />
                </Route>
                <Route exact path={url + withdraw}>
                  <WithdrawTransaction />
                </Route>
                <Route exact path={url + transfer}>
                  <TransferTransaction />
                </Route>
              </Switch>
            </div>
          </div>
        </Jumbotron>
      </Router>
    </React.Fragment>
  );
}

export default AddAccount;
