import React, { Component } from 'react'
import { Menu } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import '../../style/NavBar.module.scss'

export default class NavBar extends Component {
  render() {
    return (
      <Menu pointing secondary>
        <Link to='/home'>
          <Menu.Item active={this.props.active==='home'} name='home'>
          </Menu.Item>
        </Link>
        <Link to="/gallery">
          <Menu.Item active={this.props.active==='gallery'} name='gallery'>
          </Menu.Item>
        </Link>
        <Link to='/list'>
          <Menu.Item active={this.props.active==='list'} name='list'>
          </Menu.Item>
        </Link>
      </Menu>
    )
  }
}
