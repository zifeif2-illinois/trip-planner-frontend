import React, {Component} from 'react'
import { Card, Button, Image} from 'semantic-ui-react'
import '../../style/SearchView.scss'

// Parent: CreateTripBody
export default class SearchView extends Component {

  componentDidMount() {
    console.log(this.props.searchResult)
  }

  render() {
    let listOfResults = this.props.searchResult.map(result=>
      <SearchResultCard addToBoard={result=>this.props.addToBoard(result)}
    result={result} key={result.id}/>)

    return (<div className='search-view-container'>
        {listOfResults}
    </div>)
  }
}

class SearchResultCard extends Component {
  render() {
    return (
      <Card className='search-result'>
        <Card.Content>
          <Image floated='right' size='mini' src='https://react.semantic-ui.com/images/avatar/large/steve.jpg' />
          <Card.Header>{this.props.result.name}</Card.Header>
          <Card.Meta>Location: {this.props.result.location}</Card.Meta>
          <Button onClick={()=>this.props.addToBoard(this.props.result)}> Add </Button>
        </Card.Content>
      </Card>)
  }
}
