import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';

export default class Timetable extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            start_coordinates: {
                lat: 0.0,
                lon: 0.0
            },
            end_coordinates: {
                lat: 0.0,
                lon: 0.0
            }
        };
        this.getCoordinatesForAddresses = this.getCoordinatesForAddresses.bind(this);
    }

    async getCoordinatesForAddresses() {
        let api_url = "http://api.digitransit.fi/geocoding/v1/search";
        let start_query = api_url + "?text=" + this.props.start_point.replace(" ","%20") + "&size=1";
        let end_query = api_url + "?text=" + this.props.end_point.replace(" ", "%20") + "&size=1";
        let start_res = await (await fetch(start_query)).json();
        let end_res = await (await fetch(end_query)).json();
        try {
            console.log(start_res.features[0].geometry.coordinates);
            console.log(end_res);
        } catch (err) {
            console.log("Error");
        }
    }

    componentDidUpdate(prevProps) {
        this.getCoordinatesForAddresses();
    }

    render() {

        return (
            <div>

            </div>
        );
    }
    
}