import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom'
import 'semantic-ui-css/semantic.min.css';
import {getAllPokemon} from '../../api/api.js'
import PokemonContext from './PokemonContext'

// Include your new Components here
import Home from './Home.jsx';
import Gallery from '../Gallery/Gallery.jsx'
import ListView from '../ListView/ListView.jsx'
import DetailView from '../DetailView/DetailView.jsx'
import '../../style/App.module.scss'

class App extends Component {

  constructor(props) {
    super(props)

    this.state = {
      pokemons:[]
    }
  }
  componentDidMount() {
    getAllPokemon().then((pokemons) => {
      this.setState(() => ({pokemons}))
    })
    // this.setState(() => ({pokemons: [1234]}))
  }

  render() {
    return (
        <Router>
          <PokemonContext.Provider value={this.state.pokemons}>
          <Switch>
              <Route exact path="sp19-cs498rk-mp2/home" component={Home}/>
              <Route exact path="sp19-cs498rk-mp2/list" component={ListView}/>
              <Route exact path="sp19-cs498rk-mp2/gallery" component={Gallery}/>
              <Route exact path="sp19-cs498rk-mp2/detail/:id" component={DetailView}/>
          </Switch>
          </PokemonContext.Provider>
        </Router>
    );
  }
}

export default App;
