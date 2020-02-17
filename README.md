# hsl-timetables

Fetches simple timetables for public transportation in Helsinki area (HSL) between two locations. Made as pre-assignment for Eficode summer job application on spring 2020 (https://github.com/eficode/assignment-timetables).

## Features

* Search locations by their known names / addresses (uses the closest interpretation from Digitransit Geocoding API, so try to be specific)

* Fetches and displays three next itineraries from Digitransit Routing API, in real time.

Well, atm it doesn't do anything else.

## Libraries

Uses React 16.12.0 and Bootstrap 4.3 for UI component and Apollo Client for GraphQL queries.

* React 16.12.0
* react-bootstrap (Bootstrap 4.3)
* react-time 4.3.0
* apollo-boost 0.4.7
* @apollo/react-hooks 3.1.3

## Deployment

### Building and running Docker image locally

Clone this Git repository with

`git clone git@github.com:jyrge/hsl-timetables.git`

In the project root, build the Docker image, e.g.

`docker build . -t jyrge/hsl-timetables`

Run with (on localhost:8080):

`docker run -p 8080:80 jyrge/hsl-timetables`
