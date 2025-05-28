import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import NavBar from './NavBar';
import HubDoctor from './HubDoctor';
import Create from './Create';
import Login from './Login';
import PatientDetail from './PatientDetail'
import NotFound from './NotFound';
import { useState } from 'react';

function App() {

  const [logged, setLogged] = useState(false);

  return (
    <Router>
      <div className="App">
        <NavBar logged={logged} setLogged={setLogged} />
        <div className="content">
          <Switch>
            <Route exact path="/">
              {logged && <HubDoctor />}
            </Route>
            <Route exact path="/create">
              <Create />
            </Route>
            <Route exact path="/login">
              <Login setLogged={setLogged}/>
            </Route>
            <Route exact path="/patient/:id">
              <PatientDetail />
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