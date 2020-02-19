import React from 'react';
import Table from 'react-bootstrap/Table';
import Card from 'react-bootstrap/Card';
import Alert from 'react-bootstrap/Alert'
import { useQuery } from '@apollo/react-hooks';
import { loader } from 'graphql.macro';

const ROUTE_QUERY = loader("../queries/routes.graphql");

function renderStep(row, index, tab) {
    let key_base = tab.toString() + "-" + index.toString();

    let distance = row.distance >= 1000 ? (Math.round(row.distance / 100) / 10).toString() + " km" : Math.round(row.distance).toString() + " m";
    
    return (
        <tr key={key_base}>
            <td key={key_base + "-0"}>{index}</td>
            <td key={key_base + "-1"}>{row.mode}</td>
            <td key={key_base + "-2"}>{row.startTime}</td>
            <td key={key_base + "-3"}>{row.fromPlace}</td>
            <td key={key_base + "-4"}>{row.toPlace}</td>
            <td key={key_base + "-5"}>{row.endTime}</td>
            <td key={key_base + "-6"}>{distance}</td>
            <td key={key_base + "-7"}>{row.route}</td>
            <td key={key_base + "-8"}>{row.headSign}</td>
        </tr>
    );
}

function renderRoute(route, num, dur) {

    let key_base = num.toString();

    let dur_minutes = Math.ceil(dur / 60);
    
    return (
        <Card key={"c" + key_base}>
            <Card.Body>
                <Card.Title># {num} | Duration {dur_minutes} min</Card.Title>
                <Table striped hover key={"t" + key_base}>
                    <thead>
                        <tr key={key_base + "h"}>
                            <th key={key_base + "h0"}>#</th>
                            <th key={key_base + "h1"}>Mode</th>
                            <th key={key_base + "h2"}>Departure</th>
                            <th key={key_base + "h3"}>From</th>
                            <th key={key_base + "h4"}>To</th>
                            <th key={key_base + "h5"}>Arrival</th>
                            <th key={key_base + "h6"}>Distance</th>
                            <th key={key_base + "h7"}>Route</th>
                            <th key={key_base + "h8"}>Headsign</th>
                        </tr>
                    </thead>
                    <tbody>
                        {route.map( (data, index) => renderStep(data, index, num)) }
                    </tbody>
                </Table>
            </Card.Body>
        </Card>
    );
}

export default function Timetable(props) {

    let coordinates = props.coordinates;

    const { loading, error, data } = useQuery(ROUTE_QUERY, {
        skip: Object.keys(coordinates).length === 0,
        variables: {
            fromLat: coordinates.fromLat,
            fromLon: coordinates.fromLon,
            toLat: coordinates.toLat,
            toLon: coordinates.toLon,
            num_itineraries: props.num_itineraries
        },
        pollInterval: Object.keys(coordinates).length === 0 ? 0 : 30000,
        fetchPolicy: "network-only"
    });

    if (loading) {
        return (
            <Card className="text-center">
                <Card.Body>
                    <Card.Title>Loading...</Card.Title>
                    <Card.Text>Please wait!</Card.Text>
                </Card.Body>
            </Card>
        );
    }
    
    if (error) {
        return (
            <Alert variant="danger">
                Error: {error.message}
            </Alert>
        );
    }

    if (data) {
        let routes = data.plan.itineraries.map(
            x => {
                return {
                    legs: x.legs.map(
                        y => {
                            return {
                                mode: y.mode,
                                fromPlace: y.from.name,
                                toPlace: y.to.name,
                                startTime: new Date(y.startTime).toLocaleString("en-GB"),
                                endTime: new Date(y.endTime).toLocaleString("en-GB"),
                                distance: y.distance,
                                route: y.trip ? y.trip.routeShortName : "",
                                headSign: y.trip ? y.trip.tripHeadsign : ""
                            };      
                        }
                    ),
                    duration: x.duration
                };
        });

        return (
            <div>
                {routes.map( (route, index) => renderRoute(route.legs, index, route.duration) )}
            </div>
        );
    }

    return (
        <Card className="text-center">
            <Card.Body>
                <Card.Title>Nothing here!</Card.Title>
                <Card.Text>
                    To get timetables, search with endpoint names.
                </Card.Text>
            </Card.Body>
        </Card>
    );

}