import React, { Component } from 'react'
import { Menu, Modal, Button, Input, Dropdown} from 'semantic-ui-react'
import { Link } from 'react-router-dom'
import * as firebaseApi from '../../api/firebaseAuth'
import '../../style/NavBar.scss'

export default class NavBar extends Component {
  constructor(props) {
    super(props)

    this.state = {
      currentUser: firebaseApi.getCurrentUser()
    }
  }

  componentDidMount() {
    let currentUser = firebaseApi.getCurrentUser()
    if(currentUser) {
      this.setState({currentUser: {...currentUser, name:'Zifei'}})
    }
  }

  hasLogin = () => {
    this.setState({currentUser: {...firebaseApi.getCurrentUser(), name: 'Zifei'}}) // TODO: call backend api to get user basic information
  }

  logout = () => {
    firebaseApi.logout().then(() => {
      this.setState({currentUser: null})
      this.props.history.push(`/`)
    })
  }

  render() {
    // TODO: add link to dropdown.item
    return (
      <Menu className='navbar' fixed='top'>
        <Menu.Item link position='left'> <Link to='/'>Trip Planner</Link></Menu.Item>
        {!this.state.currentUser?null
        :
        <Menu.Menu position='right'>
          <Dropdown text={`Hi, ${this.state.currentUser.name}`}item>
            <Dropdown.Menu>
              <Dropdown.Item>My Trips</Dropdown.Item>
              <Dropdown.Item><Link to='/trip-planner/profile'>Profile</Link></Dropdown.Item>
              <Dropdown.Item onClick={this.logout}>Logout</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </Menu.Menu>
        }
        {!this.state.currentUser? <Menu.Item link> <ModelLoginAndRegister status='Login' hasLogin={this.hasLogin}/> </Menu.Item>: null}
        {!this.state.currentUser? <Menu.Item link> <ModelLoginAndRegister status='Register' hasLogin={this.hasLogin}/> </Menu.Item>:null}
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
      registerName: '',
      error: '',
    }
  }

  login=()=>{
    firebaseApi.login(this.state.email, this.state.loginPassword).then(result => {
      if(result.user) {
        this.setState({error: ''})
        this.props.hasLogin()
      }
      else {
        this.setState({error: result.error})
      }
    })
  }

  register = () => {
    firebaseApi.register(this.state.email, this.state.registerPassword).then(result=> {
      if(result.user) {
        this.setState({error: '', status: 'Login'})
      }
      else {
        this.setState({error: result.error})
      }
    })
  }

  render() {
      return (<Modal trigger={<span>{this.props.status}</span>} closeIcon>
      <Modal.Header>Trip Planner -{this.state.status}</Modal.Header>
      <Modal.Content>
          {
            this.state.status === 'Login' ?
            <Modal.Description>
              <div className='login-register-content'>
                <Input icon='envelope' placeholder='Email' type='email' value={this.state.email} onChange={event=>this.setState({email: event.target.value})}/>
                <Input icon='lock' placeholder='Password' type='password' value={this.state.loginPassword} onChange={event=>this.setState({loginPassword: event.target.value})}/>
                <Button className='ui button green' onClick={this.login}> Login </Button>
                <a className='subButton' onClick={()=>this.setState({status: 'Register'})}> Create an account </a>
              </div>
            </Modal.Description>
          : <Modal.Description>
              <div className='login-register-content'>
                <Input icon='user' placeholder='Name' value={this.state.registerName} onChange={event=>this.setState({registerName: event.target.value})}/>
                <Input icon='envelope' placeholder='Email' type='email' value={this.state.email} onChange={event=>this.setState({email: event.target.value})}/>
                <Input icon='lock' placeholder='Password' type='password'  value={this.state.registerPassword} onChange={event=>this.setState({registerPassword: event.target.value})}/>
                <Button className='ui button green' onClick={this.register}> Register </Button>
                <a className='subButton'  onClick={()=>this.setState({status: 'Login'})}> Already have an account? </a>
              </div>
            </Modal.Description>
          }
          <span className='error'> {this.state.error} </span>
      </Modal.Content>
    </Modal>
  )
  }
}
