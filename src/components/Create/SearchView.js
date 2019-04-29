import React, {Component} from 'react'
import { Card, Button, Image} from 'semantic-ui-react'
import '../../style/SearchView.scss'

class SearchResultCard extends Component {
  render() {
    return (
      <Card className='search-result'>
        <Card.Content>
          <Image floated='right' size='mini' src='https://react.semantic-ui.com/images/avatar/large/steve.jpg' />
          <Card.Header>{this.props.result.name}</Card.Header>
          <Card.Meta>Location: {this.props.result.location}</Card.Meta>
          <Button onClick={()=>this.addToBoard(this.props.result)}> Add </Button>
        </Card.Content>
      </Card>)
  }
}

export default class SearchView extends Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (<div className='search-view-container'>
    <SearchResultCard result={{name: 'Japan house', location: '2110 S White Street'}}/>
    <SearchResultCard result={{name: 'Japan house', location: '2110 S White Street'}}/>
    <SearchResultCard result={{name: 'Japan house', location: '2110 S White Street'}}/>
    <SearchResultCard result={{name: 'Japan house', location: '2110 S White Street'}}/>
    <SearchResultCard result={{name: 'Japan house', location: '2110 S White Street'}}/>
        <SearchResultCard result={{name: 'Japan house', location: '2110 S White Street'}}/>
        <SearchResultCard result={{name: 'Japan house', location: '2110 S White Street'}}/>
        <SearchResultCard result={{name: 'Japan house', location: '2110 S White Street'}}/>
        <SearchResultCard result={{name: 'Japan house', location: '2110 S White Street'}}/>
        <SearchResultCard result={{name: 'Japan house', location: '2110 S White Street'}}/>
    </div>)
  }
}
