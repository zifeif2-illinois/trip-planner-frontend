import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Card } from 'semantic-ui-react'
import TagList from '../common/TagList.jsx'

import '../../style/DetailView.scss'

export default class PokemonCardView extends Component {

  render() {
      return (
        <Card>
          <Card.Content className='card-container'>
            <Card.Header className='card-header'>
              {this.props.pokemon.name}
            </Card.Header>
            <Card.Meta>
              Pokemon Index{this.props.pokemon.id}
            </Card.Meta>
            <img
              src={this.props.pokemon.sprites.front_default}
              alt={`Sprite of ${this.props.pokemon.name}`}
            />
            <TagList label='types' content={this.props.pokemon.types}/>
            <TagList label='abilities' content={this.props.pokemon.abilities}/>
            <TagList label='holding items' content={this.props.pokemon.held_items}/>
          </Card.Content>
        </Card>
      )
    }
  }

PokemonCardView.propTypes = {
  pokemon: PropTypes.shape({
    name: PropTypes.string,
    id: PropTypes.number,
    abilities: PropTypes.arrayOf(PropTypes.string),
    sprites: PropTypes.object,
  }),
}
