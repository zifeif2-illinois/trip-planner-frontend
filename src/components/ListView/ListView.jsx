import React, { Component } from 'react'
import { Button, Input, List, Dropdown } from 'semantic-ui-react'
import _ from 'lodash'
import PokemonContext from '../App/PokemonContext'

import CardView from './CardView'

import '../../style/ListView.scss'
import NavBar from '../common/NavBar.jsx'

export default class ListView extends Component {

  constructor() {
    super();

    this.state = {
      value: '',
      results: [],
      isSortedDecrease: false,
      sortedField: 'id'
    };
  }

  componentDidMount() {
    // Form the URL
    // let data = await getPokemonList()
    console.log(this.context)
    this.setState(() => ({
      results: this.context,
    }))
  }

  handleSortFilterChange = (e, {value})=> {
    this.setState(() => ({
      sortedField: value
    }))
  }

  inputChangeHandler = (event, {value}) => {
    this.setState(()=>({value}));
  }

  onClickHandler = (event, idx) => {
    this.props.history.push(`detail/${idx}`)
  }

  isMatch = (result) => {
    let re = new RegExp(_.escapeRegExp(this.state.value), 'i')
    return re.test(result.name)
  }

  handleSortingOrderChange = (event) =>{
      let id = event.target.id
      this.setState({isSortedDecrease: id=== 'decrease'})
  }

  listOfPokemon = (pokemons)=> {
    let listOfPokemon = pokemons.filter(this.isMatch)
    let sortOrder = this.state.isSortedDecrease? 1: -1
    listOfPokemon.sort((poke1, poke2) => (poke1[this.state.sortedField] - poke2[this.state.sortedField])*sortOrder)
    return listOfPokemon.map((result) =>
     ( <CardView key={result['id']} index={result['id']} data={result} onClick={this.onClickHandler} />))
  }

  render() {

    let sortingOptions = [ { text: 'height', value: 'height'},{ text: 'weight', value: 'weight'}]
    return (
      <div>
        <NavBar active='list'/>
        <div className='container'>
          <h1 className='list-view-label'>List View</h1>
          <Input
            onChange={this.inputChangeHandler}
            placeholder='e.g. Pikachu'
            value={this.state.value}
            action={{ color: 'pink', content: 'Search' }}
            icon='search'
            iconPosition='left'
          />
          <div className='sortContainer'>
            <Dropdown selection options={sortingOptions} onChange={this.handleSortFilterChange}/>
            <Button.Group>
              <Button basic={this.state.isSortedDecrease} color='pink' onClick={this.handleSortingOrderChange} id='increase' active={!this.state.isSortedDecrease}>
                From Low to High
              </Button>
              <Button.Or className='or-btn'/>
              <Button basic={!this.state.isSortedDecrease} color='pink' onClick={this.handleSortingOrderChange} id='decrease' active={this.state.isSortedDecrease}>
                From High to Low
              </Button>
            </Button.Group>
          </div>
          { this.state.results.length?
            <List divided relaxed='very' animated verticalAlign='middle' size='huge' items={this.listOfPokemon(this.state.results)}>
            </List>
            : <div> Loading ... </div>
          }

        </div>
      </div>
    )
  }
}

ListView.contextType = PokemonContext
