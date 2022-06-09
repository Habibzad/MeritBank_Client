import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  useRouteMatch,
} from "react-router-dom";
import { Jumbotron } from "react-bootstrap";

import UsersList from "./UsersList";
import CreateUser from "./CreateUser";
import UpdateUser from "./UpdateUser";

const addUser = "/add-user";

function User() {
  const { url } = useRouteMatch();
  return (
    <React.Fragment className="container">
      <Router>
        <Jumbotron className="menu1">
          <h5 className="component-header">Users</h5>
          <div className="row">
            <div className="col-md-2 add-account-dash">
              <Link
                style={{ fontSize: "16px" }}
                className="add-account-link"
                to={url}
              >
                Users List<i class="fas fa-chevron-right"></i>
              </Link>
              <Link
                style={{ fontSize: "16px" }}
                className="add-account-link"
                to={url + addUser}
              >
                Create User <i class="fas fa-chevron-right"></i>
              </Link>
              <Link
                style={{ fontSize: "16px" }}
                className="add-account-link"
                to={url + "/update-user"}
              >
                Update User <i class="fas fa-chevron-right"></i>
              </Link>
            </div>
            <div className=" add-account-container">
              <Switch>
                <Route exact path={url}>
                  <UsersList />
                </Route>
                <Route exact path={url + addUser}>
                  <CreateUser />
                </Route>
                <Route exact path={url + "/users-list/update-user/:id"}>
                  <UpdateUser />
                </Route>
              </Switch>
            </div>
          </div>
        </Jumbotron>
      </Router>
    </React.Fragment>
  );
}

export default User;
