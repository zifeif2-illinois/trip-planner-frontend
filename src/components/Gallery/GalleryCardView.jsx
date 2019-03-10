import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Card, Image } from 'semantic-ui-react'
import '../../style/Gallery.scss'
import TagList from '../common/TagList.jsx'

export default class GalleryCardView extends Component {

  render() {
      return (
        <Card onClick={(e) => this.props.onClick(e, this.props.pokemon.id)}>
          <Image className='icon' src={this.props.pokemon.sprites.front_default?this.props.pokemon.sprites.front_default:'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/master-ball.png'} />
          <Card.Content>
            <Card.Header className='card-header'>{this.props.pokemon.name}</Card.Header>
            <Card.Meta><TagList label='types' content={this.props.pokemon.types}/></Card.Meta>
          </Card.Content>
        </Card>
      )
    }
  }

GalleryCardView.propTypes = {
  pokemon: PropTypes.shape({
    name: PropTypes.string,
    id: PropTypes.number,
    abilities: PropTypes.arrayOf(PropTypes.string),
    sprites: PropTypes.object
  }),
}
