import React, { Component } from 'react'
import { Button, Grid} from 'semantic-ui-react'
import PokemonContext from '../App/PokemonContext'
import {getAllTypes} from '../../api/api.js'
import GalleryCardView from './GalleryCardView'
import NavBar from '../common/NavBar.jsx'
import '../../style/Gallery.scss'

export default class Gallery extends Component {

  constructor(props) {
    super(props);

    this.state = {
      value: '',
      results: [],
      selectedType:'all',
      types:[]
    };
  }

  componentDidMount() {
    getAllTypes().then((types) => {
      this.setState(() => ({
        results: this.context,
        types: ['all'].concat(types)
      }))
    })
  }

  onClickType = (event) => {
    let selectedType = event.target.id
    this.setState(() => ({selectedType}))
  }

  onClickCardView = (event, idx) => {
    this.props.history.push(`/detail/${idx}`)
  }

  render() {
    let listOfPokemon = this.state.results.filter(result =>
      this.state.selectedType==='all' || result.types.includes(this.state.selectedType))
      .map((result, idx) => ( <Grid.Column key={result['id']} index={result['id']}>
          <GalleryCardView pokemon={result} onClick={this.onClickCardView}/>
        </Grid.Column>))
    let listOfType = this.state.types.map((result) => (<Button onClick={this.onClickType} key={result} id={result} content={result}/>))
    return (
      <div>
        <NavBar active='gallery'/>
        <div className='gallery-container'>

          <h1>Pokemon Gallery</h1>
            <Grid centered>
              {listOfType}
            </Grid>
            <Grid centered columns={5}>
            {listOfPokemon}
            </Grid>
        </div>
      </div>
    )
  }
}

Gallery.contextType = PokemonContext
