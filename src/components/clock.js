import React from 'react';


export default class Clock extends React.Component {

    constructor() {
        super();
        this.state = {
            time: new Date().toLocaleString("en-GB"),
        };
    }

    componentDidMount() {
        setInterval(
          () => this.setState({
              time: new Date().toLocaleString("en-GB")
          }), 1000
        );
    }

    render() {
        return(
            <div>
                {this.state.time}
            </div>
        );

    }
}