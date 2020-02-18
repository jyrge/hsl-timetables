import React from 'react';
import Table from 'react-bootstrap/Table';
import Card from 'react-bootstrap/Card';
import Alert from 'react-bootstrap/Alert'
import { useQuery } from '@apollo/react-hooks';
import { loader } from 'graphql.macro';

const ROUTE_QUERY = loader("../queries/routes.graphql");

function renderStep(row, index, tab) {
    let key_base = tab.toString() + "-" + index.toString();
    
    return (
        <tr key={key_base}>
            <td key={key_base + "-0"}>{index}</td>
            <td key={key_base + "-1"}>{row.mode}</td>
            <td key={key_base + "-2"}>{row.startTime}</td>
            <td key={key_base + "-3"}>{row.fromPlace}</td>
            <td key={key_base + "-4"}>{row.toPlace}</td>
            <td key={key_base + "-5"}>{row.endTime}</td>
            <td key={key_base + "-6"}>{row.route}</td>
            <td key={key_base + "-7"}>{row.headSign}</td>
        </tr>
    );
}

function renderTable(table, num) {
    let key_base = num.toString();
    
    return (
        <Table striped hover key={key_base}>
            <thead>
                <tr key={key_base + "h"}>
                    <th key={key_base + "h0"}>#</th>
                    <th key={key_base + "h1"}>Mode</th>
                    <th key={key_base + "h2"}>Departure</th>
                    <th key={key_base + "h3"}>From</th>
                    <th key={key_base + "h4"}>To</th>
                    <th key={key_base + "h5"}>Arrival</th>
                    <th key={key_base + "h6"}>Route</th>
                    <th key={key_base + "h7"}>Headsign</th>
                </tr>
            </thead>
            <tbody>
                {table.map( (data, index) => renderStep(data, index, num)) }
            </tbody>
        </Table>
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
            toLon: coordinates.toLon
        },
    });

    if (loading) {
        return (
            <Card className="text-center">
                <Card.Body>
                    <Card.Title>Loading...</Card.Title>
                    <Card.Text>
                        Please wait!
                    </Card.Text>
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
            x => x.legs.map(
                y => {
                    return {
                        mode: y.mode,
                        fromPlace: y.from.name,
                        toPlace: y.to.name,
                        startTime: new Date(y.startTime).toLocaleString("en-GB"),
                        endTime: new Date(y.endTime).toLocaleString("en-GB"),
                        route: y.trip ? y.trip.routeShortName : "",
                        headSign: y.trip ? y.trip.tripHeadsign : ""
                    };      
                }
        ));
    
        return (
            <div>
                {routes.map( (table, index) => renderTable(table, index) )}
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