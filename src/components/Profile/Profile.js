import React, {Component} from 'react'
import { Button, Input, Header} from 'semantic-ui-react'
import NavBar from '../common/NavBar'
import {resetPassword, getCurrentUser} from '../../api/firebaseAuth.js'
import '../../style/Profile.scss'


export default class Profile extends Component {
  constructor(props) {
    super(props)

    this.state = {
      editName: '',
      isEditing: false,
      email: ''
    }
  }

  componentDidMount() {
    let user = getCurrentUser()
    let name = 'Zifei' //TODO: getUserNameByUID
    if(!user) return this.props.history.push('/trip-planner')
    this.setState({editName: name, email: user.email })
  }


  toggleEdit = () =>{
      this.setState({isEditing: !this.state.isEditing})
  }

  onNameChange = event => {
    this.setState({editName: event.target.value})
  }

  resetPassword = () => {
    resetPassword(this.props.email).then(result => {
      alert('An email has been sent to ' + this.state.email)
    })
  }

  render() {
    return (<div>
      <NavBar history={this.props.history}/>
      <div className='container'>
      <Header> Profile </Header>
      <div>Name</div>
      <Input value={this.state.editName} disabled={!this.state.isEditing} onChange={this.onNameChange}
      action={{color: 'teal', icon: this.state.isEditing?'check':'pencil', onClick:this.toggleEdit}} />
      <div> Email </div>
      <Input value={this.state.email} disabled={true}/>
      <Button onClick={this.resetPassword} color='teal'>Reset Password</Button>
      </div>
    </div>)
  }

}
