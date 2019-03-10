import React, { Component } from 'react'
import { Menu } from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import '../../style/NavBar.module.scss'

export default class NavBar extends Component {
  render() {
    return (
      <Menu pointing secondary>
        <Link to='/sp19-cs498rk-mp2/home'>
          <Menu.Item active={this.props.active==='home'} name='home'>
          </Menu.Item>
        </Link>
        <Link to="/sp19-cs498rk-mp2/gallery">
          <Menu.Item active={this.props.active==='gallery'} name='gallery'>
          </Menu.Item>
        </Link>
        <Link to='/sp19-cs498rk-mp2/list'>
          <Menu.Item active={this.props.active==='list'} name='list'>
          </Menu.Item>
        </Link>
      </Menu>
    )
  }
}
