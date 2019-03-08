import React, { Component } from 'react'
import PokemonCardView from './PokemonCardView.jsx'
import { Button } from 'semantic-ui-react'
import PokemonContext from '../App/PokemonContext'
import NavBar from '../common/NavBar.jsx'

export default class DetailView extends Component {
  constructor(props) {
    super(props)

    this.state = {
      pokemon: null,
      currentId: -1
    }
  }

  fetchData = (pathname) => {
    let id = parseInt(this.props.match.params.id);
    let pokemon = this.context.find(pokemon=>pokemon.id===id)
    this.setState(() => ({pokemon, currentId: id}))
  }

  componentDidMount() {
    this.fetchData()
  }

  switchPokemon = (change) => {
    let newIndex = this.state.currentId + change
    if(newIndex < this.context[0].id) newIndex = this.context.length + this.context[0].id-1
    else if(newIndex  >= this.context.length + this.context[0].id)
      newIndex = this.context[0].id
    this.props.history.push(`/detail/${newIndex}`)
  }

  componentDidUpdate(prevProps) {
    if (this.props.location.pathname !== prevProps.location.pathname) {
      this.fetchData();
    }
  }

  render() {
    return (
    <div>
      <NavBar/>
      <div className='detail-container'>
        <div className='buttons'>
          <Button content='Prev' color='pink' icon='left arrow' labelPosition='left' onClick={(e) => this.switchPokemon(-1)}/>
          <Button content='Next' color='pink' icon='right arrow' labelPosition='right' onClick={(e) => this.switchPokemon(1)}/>
        </div>
        {
          this.state.pokemon != null ?
          <PokemonCardView className='card' pokemon={this.state.pokemon}/> :
          <span>wait for a second </span>
        }
      </div>
    </div>)
  }
}
DetailView.contextType = PokemonContext
