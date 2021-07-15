import './App.css';
import InitWallet from './wallet';
import { Route, Switch, BrowserRouter as Router } from 'react-router-dom';
import ViewTransaction from './viewTransaction';

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact={true} path={"/view"} component={ViewTransaction} />
          <Route exact={true} path="" component={InitWallet} />
        </Switch>
      </Router>

    </div>
  );
}

export default App;