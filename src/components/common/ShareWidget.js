import React, {Component} from 'react'
import {Button, Modal, List, Search, Icon} from 'semantic-ui-react'
import '../../style/ShareWidget.scss'
import _ from 'lodash'
import { shareTrip} from '../../api/trip.js'
import {getAllUsers} from '../../api/user.js'

export default class ShareWidget extends Component {
  constructor(props) {
    super(props)

    this.state = {
      value: '',
      results: [],
      open: false,
      listOfUsers: this.props.sharedUsers.map(user=>({email: user})),
      message: '',
      matchedResult:[],
      tripId: this.props.tripId
    }
  }
  componentDidMount() {
    //TODO: query all the users here in future
    getAllUsers().then(users =>
        this.setState({results: users.map(user => ({...user, title: user.email}))})
    )
  }

  handleResultSelect = (e, { result }) => {
    let listOfUsers = [...this.state.listOfUsers]
    let listOfEmails = listOfUsers.map(user=>user.email)
    if(listOfEmails.includes(result.email)) { return this.setState({value: ''}) }
    listOfUsers.push(result)
    this.setState({listOfUsers})
    this.resetComponent()
  }

  resetComponent = () => this.setState({ isLoading: false, matchedResult: [], value: '' })

  handleSearchChange =  (e, { value }) => {
    console.log(this.state.results)
    this.setState({ isLoading: true, value })
    setTimeout(() => {
      if (this.state.value.length < 1) return this.resetComponent()

      const re = new RegExp(_.escapeRegExp(this.state.value), 'i')
      const isMatch = result => re.test(result.title)

      this.setState({
        isLoading: false,
        matchedResult: _.filter(this.state.results, isMatch),
      })
    }, 300)
  }

  deselectUser = (user) => {
    let listOfUsers = this.state.listOfUsers
    _.pull(listOfUsers, user)
    this.setState({listOfUsers})
  }

  shareTrip = ()=>{
    //TODO: add share logic in future
    this.setState({ message: 'Trip has been shared' })
    shareTrip(this.state.tripId, this.state.listOfUsers.map(user=>user.email))

  }

  render() {
    let listOfUsers = this.state.listOfUsers.map((user, idx)=>
      <List.Item key={idx}>
        <Icon name='close'onClick={()=>this.deselectUser(user)} />
        <List.Content>
          <List.Header>{user.email}</List.Header>
        </List.Content>
      </List.Item>
    )
    return (<Modal closeIcon
      trigger={this.props.trigger}>
    <Modal.Header>Share Your Trip!</Modal.Header>
    <Modal.Content>
      <Modal.Description>
          <div className='search-bar'>
            <Search onResultSelect={this.handleResultSelect} loading={this.state.isLoading}
            onSearchChange={_.debounce(this.handleSearchChange, 500, { leading: true })}
            value={this.state.value}
            results={this.state.matchedResult}/>
             <List divided className='share-list'>
              {listOfUsers}
             </List>
             <div>{this.state.message}</div>
            <Button className='ui button teal' onClick={this.shareTrip}> Share </Button>
          </div>
        </Modal.Description>
    </Modal.Content>
  </Modal>)
  }
}
