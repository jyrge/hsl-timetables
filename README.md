# hsl-timetables

Fetches simple timetables for public transportation in Helsinki area (HSL) between two locations. Made as pre-assignment for Eficode summer job application in spring 2020 (https://github.com/eficode/assignment-timetables).

## Features

* Search locations by their known names / addresses (uses the closest interpretation from Digitransit Geocoding API, so try to be specific)
* Fetch and display itineraries (1-10, default 3) from Digitransit Routing API, in real time or delayed.
* Responsive user interface.

## Libraries

Uses React 16.12.0 and Bootstrap 4.4 for UI and Apollo Client for GraphQL queries.

* React 16.12.0
* react-bootstrap 1.0.0-beta.16
* react-datetime 2.16.3
* bootstrap 4.4.1
* moment.js 2.24.0
* apollo-boost 0.4.7
* @apollo/react-hooks 3.1.3

## Deployment

### Building and running Docker image locally

Clone this Git repository with

`git clone git@github.com:jyrge/hsl-timetables.git`

In the project root, build the Docker image, e.g.

`docker build . -t jyrge/hsl-timetables`

Run with (on localhost:8080, you can change the port to something else if you wish):

`docker run -d -p 8080:80 jyrge/hsl-timetables`
