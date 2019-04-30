import React, { Component } from 'react'
import { Menu, Modal, Button, Input} from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import '../../style/NavBar.scss'

export default class NavBar extends Component {
  render() {
    return (
      <Menu className='navbar' fixed='top'>
        <Menu.Item link position='left'> <Link to='/trip-planner'>Trip Planner</Link></Menu.Item>
        <Menu.Item link> <ModelLoginAndRegister status='Login'/> </Menu.Item>
        <Menu.Item link> <ModelLoginAndRegister status='Register'/> </Menu.Item>
      </Menu>
    )
  }
}

class ModelLoginAndRegister extends Component {
  constructor(props) {
    super(props)

    this.state = {
      status: props.status,
      email: '',
      loginPassword: '',
      registerPassword: '',
      registerName: ''
    }
  }
  render() {
      return (<Modal trigger={<span>{this.state.status}</span>}>
      <Modal.Header>Trip Planner -{this.state.status}</Modal.Header>
      <Modal.Content>
          {
            this.state.status === 'Login' ?
            <Modal.Description>
              <div className='login-register-content'>
                <Input icon='envelope' placeholder='Email' type='email' value={this.state.email} onChange={event=>this.setState({email: event.target.value})}/>
                <Input icon='lock' placeholder='Password' type='password' value={this.state.loginPassword} onChange={event=>this.setState({loginPassword: event.target.value})}/>
                <Button className='ui button green'> Login </Button>
                <a className='subButton' onClick={()=>this.setState({status: 'Register'})}> Create an account </a>
              </div>
            </Modal.Description>
          : <Modal.Description>
              <div className='login-register-content'>
                <Input icon='user' placeholder='Name' value={this.state.registerName} onChange={event=>this.setState({registerName: event.target.value})}/>
                <Input icon='envelope' placeholder='Email' type='email' value={this.state.email} onChange={event=>this.setState({email: event.target.value})}/>
                <Input icon='lock' placeholder='Password' type='password'  value={this.state.registerPassword} onChange={event=>this.setState({registerPassword: event.target.value})}/>
                <Button className='ui button green'> Register </Button>
                <a className='subButton'  onClick={()=>this.setState({status: 'Login'})}> Already have an account? </a>
              </div>
            </Modal.Description>
          }
      </Modal.Content>
    </Modal>
  )
  }
}
