import React from 'react';
import Header from "./components/header"
import Timetable from "./components/timetable"

export default class App extends React.Component {

  state = {
    start_point: "",
    end_point: "",
    coordinates: {},
    num_itineraries: 3
  }

  async getCoordinatesForAddresses() {
    let coordinates = {};
    let api_url = "http://api.digitransit.fi/geocoding/v1/search";
    let start_query = api_url + "?text=" + this.state.start_point.replace(" ","%20") + "&size=1";
    let end_query = api_url + "?text=" + this.state.end_point.replace(" ", "%20") + "&size=1";
    let start_res = await (await fetch(start_query)).json();
    let end_res = await (await fetch(end_query)).json();
    try {
      coordinates = {
        fromLat: start_res.features[0].geometry.coordinates[1],
        fromLon: start_res.features[0].geometry.coordinates[0],
        toLat: end_res.features[0].geometry.coordinates[1],
        toLon: end_res.features[0].geometry.coordinates[0] 
      };

      this.setState({
        coordinates: coordinates
      });
      
    } catch(error) {
      // No error handling here, yet.
    }
  }
  
  getEndpoints = (data) => {
    this.setState({
      start_point: data.start_point,
      end_point: data.end_point
    }, () => {
      this.getCoordinatesForAddresses();
    });
  }

  getRouteOptions = (num) => {
    this.setState({
      num_itineraries: num
    });
  }

  clearData = () => {
    this.setState({
      start_point: "",
      end_point: "",
      coordinates: {}
    });
  }

  render() { 
    return (
      <div id="app">
        <Header onSubmit={this.getEndpoints} onClear={this.clearData} onRouteOptionsUpdate={this.getRouteOptions} />
        <Timetable coordinates={this.state.coordinates} num_itineraries={this.state.num_itineraries} />
      </div>
    );
  }
  
}
