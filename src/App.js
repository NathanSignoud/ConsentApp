import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import NavBar from './NavBar';
import PrivateRoute from './PrivateRoute'
import HubDoctor from './HubDoctor';
import HubAdmin from './HubAdmin';
import HubPatient from './HubPatient';
import Create from './Create';
import Login from './Login';
import PatientDetail from './PatientDetail'
import NotFound from './NotFound';
import { useState } from 'react';
import Register from './Register';
import { Redirect } from 'react-router-dom/cjs/react-router-dom';
import PdfViewer from './PdfViewer';

function App() {

  const [logged, setLogged] = useState(false);
  const [currentUser, setCurrentUser] = useState(null)

  return (
    <Router>
      <div className="App">
        <NavBar logged={logged} setLogged={setLogged} />
        <div className="content">
          <Switch>
            <Route exact path="/">
              <Redirect to={
                currentUser?.role === 'Administrator'
                  ? '/hub/admin'
                  : currentUser?.role === 'Doctor'
                  ? '/hub/medecin'
                  : '/hub/patient'
              } />
            </Route>
            <PrivateRoute path="/hub/admin" logged={logged} currentUser={currentUser} allowedRoles={['Administrator']}>
              <HubAdmin />
            </PrivateRoute>
            <PrivateRoute path="/hub/medecin" logged={logged} currentUser={currentUser} allowedRoles={['Doctor']}>
              <HubDoctor />
            </PrivateRoute>
            <PrivateRoute path="/hub/patient" logged={logged} currentUser={currentUser} allowedRoles={['Patient']}>
              <HubPatient />
            </PrivateRoute>
            <Route exact path="/create">
              <Create />
            </Route>
            <Route exact path="/login">
              <Login setLogged={setLogged} setCurrentUser={setCurrentUser} />
            </Route>
            <Route exact path="/patient/:id">
              <PatientDetail />
            </Route>
            <Route path="/patient/:id/pdf/:pdfId">
              <PdfViewer />
            </Route>
            <Route exact path="/register">
              <Register />
            </Route>
            <Route exact path="*">
              <NotFound />
            </Route>
          </Switch>
        </div>
      </div>
    </Router>
  );
}

export default App;