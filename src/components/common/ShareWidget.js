import React, {Component} from 'react'
import {Button, Modal, List, Input, Search} from 'semantic-ui-react'
import '../../style/ShareWidget.scss'
import _ from 'lodash'

const dummy = [{name: 'Jack', email: 'jacky@example.com'},{name: 'Mary', email: 'mary@example.com'},{name: 'Amy', email: 'amy@example.com'}]
export default class ShareWidget extends Component {
  constructor(props) {
    super(props)

    this.state = {
      value: '',
      results: [],
      listOfUsers: [],
      matchedResult:[]
    }
  }
  componentDidMount() {
    this.setState({results: dummy.map(dum => ({...dum, title: dum.name, description: dum.email}))})
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

  render() {
    let listOfUsers = this.state.listOfUsers.map((user, idx)=>
      <List.Item  key={idx} onClick={()=>this.deselectUser(user)}>
        <List.Content>
          <List.Header>{user.name}</List.Header>
          <List.Description>
            {user.email}
          </List.Description>
        </List.Content>
      </List.Item>
    )
    return (<Modal closeIcon
      trigger={<Button content='Share Your Trip' className='share-button' onClick={this.shareTrip} color='teal'/>}>
    <Modal.Header>Share Your Trip!</Modal.Header>
    <Modal.Content>
      <Modal.Description>
          <div className='search-bar'>
            <Search onResultSelect={this.handleResultSelect} loading={this.state.isLoading}
            onSearchChange={_.debounce(this.handleSearchChange, 500, { leading: true })}
            value={this.state.value}
            results={this.state.matchedResult}/>
             <List divided>
              {listOfUsers}
             </List>
            <Button className='ui button teal'> Share </Button>
          </div>
        </Modal.Description>
    </Modal.Content>
  </Modal>)
  }
}
