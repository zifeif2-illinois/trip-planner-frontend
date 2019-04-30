import React, { Component } from 'react'
import { Card, Image, Input, Icon, Button} from 'semantic-ui-react'
import SearchInput from '../common/SearchInput'
import '../../style/NewActivityCard.scss'
import SelectionButtons from '../common/SelectionButtons'

export default class ActivityCard extends Component {
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
                placeholder='search activity...' value={this.state.searchAttraction}/>
                :
              <SearchInput onChange={event=>this.setState({searchFood: event.target.value})}
                placeholder='search food...' value={this.state.searchFood}/>
            }
            <SelectionButtons option1='Activity' option2='Food'
            selectOption1={this.state.isSearchingAttraction} onToggle={()=>this.setState({isSearchingAttraction:!this.state.isSearchingAttraction})}/>
          </div>
            :
          <Input className='personal' onChange={()=>this.setState({customActivity: this.state.customActivity})} value={this.state.customActivity}
            action={{ color: 'teal', icon: 'check' }}/>
        }
        <Button.Group>
          <Button positive>Save</Button>
          <Button>Cancel</Button>
        </Button.Group>
      </Card.Content>
    </Card>)
  }
}
