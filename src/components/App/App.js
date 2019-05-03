import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import 'semantic-ui-css/semantic.min.css';

// Include your new Components here
import Home from './Home.jsx';
import CreateTrip from '../Create/CreateTrip.js'
import ReviewTrip from '../Review/ReviewTrip.js'
import TripDetail from '../ReviewDetail/TripDetail.js'
import '../../style/App.module.scss'

class App extends Component {
  render() {
    return (
        <Router>
          <Switch>
              <Route exact path="/trip-planner" component={Home}/>
              <Route exact path="/trip-planner/create" component={CreateTrip} />
              <Route exact path="/trip-planner/review" component={ReviewTrip} />
              <Route exact path="/trip-planner/review/:id" component={TripDetail} />
          </Switch>
        </Router>
    );
  }
}

export default App;
