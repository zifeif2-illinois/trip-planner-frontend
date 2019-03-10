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
      selectedItem: 'whatever',
      items:['whatever', 'no held item', 'has items'],
      types:[]
    };
  }

  componentDidMount() {
    getAllTypes().then((types) => {
      this.setState(() => ({
        results: this.context,
        types: ['all'].concat(types),
      }))
    })
  }

  onClickType = (event) => {
    let selectedType = event.target.id
    this.setState(() => ({selectedType}))
  }

  onClickItem = (event) => {
    let selectedItem = event.target.id
    this.setState(() => ({selectedItem}))
  }

  onClickCardView = (event, idx) => {
    this.props.history.push(`detail/${idx}`)
  }

  render() {
    let listOfType = this.state.types.map((result) => (<Button active={this.state.selectedType===result} onClick={this.onClickType} key={result} id={result} content={result}/>))
    let listOfItems = this.state.items.map((result) => (<Button  active={this.state.selectedItem===result} onClick={this.onClickItem} key={result} id={result} content={result}/>))
    return (
      <div>
        <NavBar active='gallery'/>
        <div className='gallery-container'>
          <h1>Pokemon Gallery</h1>
            <Grid className='grid'>
              <span> <b>Types</b> </span>
              {listOfType}
            </Grid>

            <Grid className='grid'>
              <span> <b>Items</b> </span>
              {listOfItems}
            </Grid>
            <Grid centered columns={5}>
            {this.state.results.length ?
              this.state.results.filter(result =>
                (this.state.selectedType==='all' || result.types.includes(this.state.selectedType))
                && (this.state.selectedItem==='whatever' || (result.held_items.length &&this.state.selectedItem==='has items')||(!result.held_items.length &&this.state.selectedItem==='no held item'))
              )
              .map((result, idx) => ( <Grid.Column key={result['id']} index={result['id']}>
                  <GalleryCardView pokemon={result} onClick={this.onClickCardView}/>
                </Grid.Column>))
              : <div> Loading... </div>}
            </Grid>
        </div>
      </div>
    )
  }
}

Gallery.contextType = PokemonContext
