import React, { Component } from 'react'
import { Card, Input, Button} from 'semantic-ui-react'
import SearchInput from '../common/SearchInput'
import '../../style/NewActivityCard.scss'
import SelectionButtons from '../common/SelectionButtons'


// This is the card view when adding new activity.
// Parent: DateCards
export default class NewActivityCard extends Component {
  constructor(props) {
    super(props)

    this.state={
      isSearchingPopular: true,
      searchAttraction: '',
      searchFood: '',
      isSearchingAttraction: true,
      customActivity: ''
    }
  }

  render() {
    return (<Card className='new-activity-container' fluid>
      <Card.Content>
        <SelectionButtons option1='Popular Activity' option2='Personal Activity'
        selectOption1={this.state.isSearchingPopular} onToggle={()=>this.setState({isSearchingPopular:!this.state.isSearchingPopular})}/>
        {this.state.isSearchingPopular?
          <div className='search-bar'>
            {this.state.isSearchingAttraction?
              <SearchInput onChange={event=>this.setState({searchAttraction: event.target.value})}
                placeholder='search activity...' value={this.state.searchAttraction}
                searchOnClick={()=>this.props.searchThings(this.state.searchAttraction, 'attraction')}/>
                :
              <SearchInput onChange={event=>this.setState({searchFood: event.target.value})}
                placeholder='search food...' value={this.state.searchFood}
                searchOnClick={()=>this.props.searchThings(this.state.searchFood, 'food')}/>
            }
            <SelectionButtons option1='Activity' option2='Food'
            selectOption1={this.state.isSearchingAttraction} onToggle={()=>this.setState({isSearchingAttraction:!this.state.isSearchingAttraction})}/>
          </div>
            :
          <Input className='personal' onChange={event=>this.setState({customActivity: event.target.value})} value={this.state.customActivity}
            action={{ color: 'teal', icon: 'check'}}/>
        }
        <Button onClick={this.props.onCancel}>Cancel</Button>
      </Card.Content>
    </Card>)
  }
}
