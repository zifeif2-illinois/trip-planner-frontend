import React from 'react'
import { List, Image } from 'semantic-ui-react'
import PropTypes from 'prop-types'
import '../../style/ListView.scss'

export default function CardView(props) {
  return (
  <List.Item className='list-card-view' onClick={(e) => props.onClick(e, props.index)}>
      <Image avatar src={props.data.sprites.front_default?props.data.sprites.front_default:'https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/master-ball.png'} />
      <List.Content>
        <List.Header className='list-card-header'>{props.data['name']}</List.Header>
        <List.Description>
          <div><b>Height</b> {props.data['height']}cm</div>
          <div><b>Weight</b> {props.data['weight']}kg</div>
        </List.Description>
      </List.Content>
  </List.Item>
)}

CardView.propTypes = {
  pokemon: PropTypes.shape({
    name: PropTypes.string,
    id: PropTypes.number,
    abilities: PropTypes.arrayOf(PropTypes.shape({
      ability: PropTypes.shape({
        name: PropTypes.string,
        url: PropTypes.string,
      })
    })),
    sprites: PropTypes.object,
  }),
}
