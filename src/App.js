import React from 'react';
import Header from "./components/header"
import Timetable from "./components/timetable"

export default class App extends React.Component {

  state = {
    start_point: "",
    end_point: ""
  }

  getEndpoints = (data) => {
    this.setState({
      start_point: data.start_point,
      end_point: data.end_point
    }, () => {
      console.log(this.state);
    });
  }

  render() { 
    return (
      <div id="app">
        <Header onSubmit={this.getEndpoints} />
        <Timetable start_point={this.state.start_point} end_point={this.state.end_point} />
      </div>
    );
  }
  
}
