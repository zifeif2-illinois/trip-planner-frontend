import React from 'react'
import { List, Image } from 'semantic-ui-react'
import PropTypes from 'prop-types'
import '../../style/ListView.scss'

export default function CardView(props) {
  return (
  <List.Item className='list-card-view' onClick={(e) => props.onClick(e, props.index)}>
      <Image avatar src={props.data.sprites.front_default} />
      <List.Content>
        <List.Header className='list-card-header'>{props.data['name']}</List.Header>
        <List.Description>
          <span><b>Height</b> {props.data['height']}cm</span>
          <span><b>Weight</b> {props.data['weight']}kg</span>
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
