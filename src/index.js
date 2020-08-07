import {
  BackendError,
  Lockscreen,
  NotFound,
  PasswordReset,
  Signin,
  Signup
} from "./pages";
import { BrowserRouter, Route, Switch, Redirect,useHistory } from "react-router-dom";
import { authenticationService } from './../src/_services/authentication.service';
import AppProvider from "./components/AppProvider/AppProvider";
import Dashboard from "./containers/Dashboard";
import DashboardMagang from "./containers/Dashboard_magang";
import React from "react";
import DashboardMentor from "./containers/Dashboard_mentor";
import registerServiceWorker from "./registerServiceWorker";
import { render } from "react-dom";


// const history = useHistory()
// const handleRedirect = () => {
//   history.push('/supervisor')
// }

render(
  <AppProvider>
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <Switch>
        <Route exact path="/404" component={NotFound} />
        <Route exact path="/500" component={BackendError} />
        <Route exact path="/Lockscreen" component={Lockscreen} />
        <Route exact path="/forgot" component={PasswordReset} />
        <Route exact path="/signin" component={Signin} />
        <Route exact path="/signup" component={Signup} />
        <Route path="/supervisor" component={Dashboard}/>
        <Route path="/magang" component={DashboardMagang}/>
        <Route path="/" component={Signin}/>
        {/* <Route path="Magang" component={DashboardMagang} />
        <Route path="Mentor" component={DashboardMentor} /> */}
      </Switch>
    </BrowserRouter>
  </AppProvider>,
  document.getElementById("root")
);

registerServiceWorker();
