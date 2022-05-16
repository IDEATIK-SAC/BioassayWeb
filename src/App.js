
import React,{useState,useEffect} from "react";
import { ThemeProvider as MuithemeProvider } from "@material-ui/core/styles";
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import AppNavbar from './components/navigation/AppNavbar';
import { useStateValue } from './context/store';
import Theme from './theme/Theme';
import {Grid , Snackbar} from "@material-ui/core";
import Demand from './components/demand/Demand';
import Survey from './components/survey/ViewSurvey';
import ListDemand from './components/demand/ListDemand';
import ListSurvey from './components/survey/ListSurvey';
import Report from './components/report/Report'; 
import ListReport from './components/report/ListReport'; 
import RouteSecurity from './components/navigation/RouteSecurity';
import Login from './components/security/Login';
import Configuration from './components/configuration/Configuration';
import Dashboard from './components/dashboard/Dashboard';
import {getEmployeeActually} from './services/api/LoginService';
import ServicesConfig from './components/configuration/Services';
import BranchConfig from './components/configuration/Branch';
import ModelConfig from './components/configuration/Model';
import ListUser from './components/users/ListUser';
import Customer from './components/customers/Customer';

function App() {
  const [{ sessionUser,openSnackbar}, dispatch] = useStateValue();
  const [startApp, setStartApp] = useState(false); 
  
  useEffect(() => {
    if (!startApp) {
      getEmployeeActually(dispatch).then(response =>{
        setStartApp(true);
      }).catch(error=>{
        setStartApp(false);
      });
    }
  }, [startApp]);

  return startApp === false ? null :  (
    <React.Fragment>
      <Snackbar
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
        open={openSnackbar ? openSnackbar.open : false}
        autoHideDuration={3000}
        ContentProps={{ "aria-describedby": "message-id" }}
        message={<span id="message-id">{openSnackbar ? openSnackbar.message : ""}</span>}
        onClose={() => dispatch({
          type: "OPEN_SNACKBAR",
          openMessage: {
            open: false,
            message: ""
          }
        })}
      >

      </Snackbar>
      <Router>
        <MuithemeProvider theme={Theme}>
        <AppNavbar />
            <Grid container>
            <Switch>
              <Route
                exact
                path="/auth/login"
                component={Login}
              />
               <RouteSecurity
                exact
                path="/dashboard"
                component={Dashboard}
              />
              <RouteSecurity
                exact
                path="/demand/:demandid?"
                component={Demand}
              />
              <RouteSecurity
                exact
                path="/configuration"
                component={Configuration}
              />
              <RouteSecurity
                exact
                path="/"
                component={Demand}
              />
              <RouteSecurity
                exact
                path="/listdemand"
                component={ListDemand}
              />
               <RouteSecurity
                exact
                path="/report/:reportid?"
                component={Report}
              />
              <RouteSecurity
                exact
                path="/listreport"
                component={ListReport}
              />
               <RouteSecurity
                exact
                path="/listuser"
                component={ListUser}
              />
                <RouteSecurity
                exact
                path="/customers"
                component={Customer}
              />
              <RouteSecurity
                exact
                path="/survey"
                component={Survey}
              />
              <RouteSecurity
                exact
                path="/listsurvey"
                component={ListSurvey}
              />
                <RouteSecurity
                exact
                path="/servicesconfig"
                component={ServicesConfig}
              />
               <RouteSecurity
                exact
                path="/branchconfig"
                component={BranchConfig}
              />
               <RouteSecurity
                exact
                path="/modelconfig"
                component={ModelConfig}
              />
              </Switch>
            </Grid>
        </MuithemeProvider>
      </Router>
    </React.Fragment>
  );
}

export default App;
