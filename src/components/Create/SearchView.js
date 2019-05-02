import React, {Component} from 'react';
import { Card, Button, Image, Segment, Icon, Header} from 'semantic-ui-react';
import '../../style/SearchView.scss';

// Parent: CreateTripBody
export default class SearchView extends Component {

  componentDidMount() {
    console.log(this.props.searchResult)
  }

  render() {
    if (!this.props.searchResult.length) {
      return (<Segment placeholder>
          <Header icon>
            <Icon name='search' />
              The places searched from right panel will show up here
          </Header>
        </Segment>)
    }
    let listOfResults = this.props.searchResult.map(result=>
      <SearchResultCard addToBoard={result=>this.props.addToBoard(result)}
    result={result} key={result.id}/>)

    return (<div className='search-view-container'>
        <h2>
          Day {this.props.day+1}
        </h2>
        <h4>
          <span className='keywords'> keywords: {this.props.keyword}</span>
          <span> type: {this.props.type} </span>
        </h4>
        {listOfResults}
    </div>)
  }
}

class SearchResultCard extends Component {
  render() {
    return (
      <Card className='search-result'>
        <Card.Content>
          <Image floated='right' size='mini' src={this.props.result.photos[0].getUrl({maxWidth: 400, maxHeight: 400})}/>
          <Card.Header>{this.props.result.name}</Card.Header>
          <Card.Meta>Location: {this.props.result.formatted_address}</Card.Meta>
          <Button color='teal' onClick={()=>this.props.addToBoard(this.props.result)}> Add </Button>
        </Card.Content>
      </Card>)
  }
}
