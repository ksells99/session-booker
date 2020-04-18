import React, { useEffect, Fragment } from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import "./App.css";

import Navbar from "./components/layout/Navbar";
import Landing from "./components/layout/Landing";
import Login from "./components/auth/Login";
import Register from "./components/auth/Register";
import Alert from "./components/layout/Alert";
import Sessions from "./components/sessions/Sessions";
import Session from "./components/sessions/Session";
import Members from "./components/members/Members";
import Member from "./components/members/Member";
import AddSessionForm from "./components/sessions/AddSessionForm";
import AddSessionBooking from "./components/sessions/AddSessionBooking";
import AddMemberForm from "./components/members/AddMemberForm";
import EditMemberForm from "./components/members/EditMemberForm";
import PrivateRoute from "./components/routing/PrivateRoute";

import { Provider } from "react-redux";
import store from "./store";
import { loadUser } from "./actions/authActions";
import setAuthToken from "./utils/setAuthToken";

// Check localstorage for token - if there is, pass into setAuthToken function (setAuthToken.js file)
if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const App = () => {
  useEffect(() => {
    store.dispatch(loadUser());
  }, []);
  return (
    <Provider store={store}>
      <Router>
        <Fragment>
          <Navbar />
          <Alert />
          <Switch>
            <Route exact path='/' component={Landing} />
            <Route exact path='/login' component={Login} />
            <Route exact path='/register' component={Register} />
            <PrivateRoute exact path='/sessions' component={Sessions} />
            <PrivateRoute
              exact
              path='/sessions/addsession'
              component={AddSessionForm}
            />
            <PrivateRoute
              exact
              path='/sessions/addbooking/:id'
              component={AddSessionBooking}
            />
            <PrivateRoute exact path='/members' component={Members} />
            <PrivateRoute
              exact
              path='/members/addmember'
              component={AddMemberForm}
            />
            <PrivateRoute exact path='/sessions/:id' component={Session} />
            <PrivateRoute exact path='/members/:id' component={Member} />
            <PrivateRoute
              exact
              path='/members/edit/:id'
              component={EditMemberForm}
            />
          </Switch>
        </Fragment>
      </Router>
    </Provider>
  );
};

export default App;
