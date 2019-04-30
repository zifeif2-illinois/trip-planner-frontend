import React, {Component} from 'react';
import { Card, Button, Image, List } from 'semantic-ui-react';
import Script from 'react-load-script';
import {GOOGLE_PLACES_API_KEY} from '../../config.js';
import '../../style/SearchView.scss';

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
          <Image floated='right' size='mini' src={this.props.result.photos[0].getUrl({maxWidth: 400, maxHeight: 400})}/>
          <Card.Header>{this.props.result.name}</Card.Header>
          <Card.Meta>Location: {this.props.result.formatted_address}</Card.Meta>
          <Button onClick={()=>this.props.addToBoard(this.props.result)}> Add </Button>
        </Card.Content>
      </Card>)
  }
}
