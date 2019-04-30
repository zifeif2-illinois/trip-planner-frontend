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
// <<<<<<< HEAD
// ||||||| merged common ancestors
//
// export default class SearchView extends Component {
//   constructor(props) {
//     super(props)
//   }
//
//   render() {
//     return (<div className='search-view-container'>
//     <SearchResultCard result={{name: 'Japan house', location: '2110 S White Street'}}/>
//     <SearchResultCard result={{name: 'Japan house', location: '2110 S White Street'}}/>
//     <SearchResultCard result={{name: 'Japan house', location: '2110 S White Street'}}/>
//     <SearchResultCard result={{name: 'Japan house', location: '2110 S White Street'}}/>
//     <SearchResultCard result={{name: 'Japan house', location: '2110 S White Street'}}/>
//         <SearchResultCard result={{name: 'Japan house', location: '2110 S White Street'}}/>
//         <SearchResultCard result={{name: 'Japan house', location: '2110 S White Street'}}/>
//         <SearchResultCard result={{name: 'Japan house', location: '2110 S White Street'}}/>
//         <SearchResultCard result={{name: 'Japan house', location: '2110 S White Street'}}/>
//         <SearchResultCard result={{name: 'Japan house', location: '2110 S White Street'}}/>
//     </div>)
//   }
// }
// =======
//
// export default class SearchView extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
//       results: []
//     };
//
//     this.handleScriptLoad = this.handleScriptLoad.bind(this);
//   }
//
//   handleScriptLoad() {
//     /*global google*/
//     const service = new google.maps.places.PlacesService(document.getElementById('map'));
//
//     const city = this.props.city || 'Chicago';
//     const query_city = city.toLowerCase();
//     const request = {
//       query: `${query_city} points of interest`
//     };
//
//     service.textSearch(request, (results, status) => {
//       if (status == google.maps.places.PlacesServiceStatus.OK) {
//         // for (var i = 0; i < results.length; i++) {
//         //   var place = results[i];
//         //   createMarker(results[i]);
//         // }
//         this.setState({results: results})
//       }
//     });
//   }
//
//   render() {
//     return (
//       <div className='search-view'>
//         <Script
//           url={`https://maps.googleapis.com/maps/api/js?key=${GOOGLE_PLACES_API_KEY}&libraries=places`}
//           onLoad={this.handleScriptLoad}
//         />
//         <List className='search-view-container'>
//           {this.state.results.map(result =>
//             <SearchResultCard result={result}/>
//           )}
//         </List>
//         <div id='map'></div>
//       </div>
//     );
//   }
// }
// >>>>>>> master
