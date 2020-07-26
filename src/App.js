import React from 'react';
import './App.css';
import { Link, Switch, Route, BrowserRouter as Router } from 'react-router-dom';
import Home from './Home';
import Secret from './Secret';

function App() {
  return (
    <Router>
      <section>
        <nav>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/secret">Secret</Link></li>
          </ul>
        </nav>
        <Switch>
          <Route path="/" exact component={Home} />
          <Route path="/secret" component={Secret} />
        </Switch>
      </section>
    </Router>
  );
}

export default App;
