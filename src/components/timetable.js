import React from 'react';
import Table from 'react-bootstrap/Table';
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

    let coordinates = props.coordinates || {
        fromLat: 0.0,
        fromLon: 0.0,
        toLat: 0.0,
        toLon: 0.0
    };

    const { loading, error, data } = useQuery(ROUTE_QUERY, {
        variables: {
            fromLat: coordinates.fromLat,
            fromLon: coordinates.fromLon,
            toLat: coordinates.toLat,
            toLon: coordinates.toLon
        },
    });

    if (loading)
        return "Loading...";
    
    if (error)
        return "Error: " + error.message;

    let routes = data.plan.itineraries.map(
        x => x.legs.map(
            y => {
                return {
                    mode: y.mode,
                    fromPlace: y.from.name,
                    toPlace: y.to.name,
                    startTime: new Date(y.startTime).toLocaleString(),
                    endTime: new Date(y.endTime).toLocaleString(),
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