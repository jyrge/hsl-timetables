import React from 'react';
import Clock from "./clock.js";
import Navbar from 'react-bootstrap/Navbar';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';
import Dropdown from 'react-bootstrap/Dropdown';
import Datetime from 'react-datetime';
import moment from 'moment';

import './react-datetime.css';

export default class Header extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            depart_date: "Real time",
            datepicker_value: "",
            routeOptions: new Array(10).fill().map( (el, i) => i + 1),
            currentRouteOption: 3
        };

        this.startText = React.createRef();
        this.endText = React.createRef();

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleClear = this.handleClear.bind(this);
        this.selectRouteOption = this.selectRouteOption.bind(this);
        this.pickDate = this.pickDate.bind(this);
        this.toggleRealtime = this.toggleRealtime.bind(this);
    }

    handleSubmit(event) {
        event.preventDefault();
        let elements = event.target.elements;
        this.props.onSubmit({
            start_point: elements.start.value,
            end_point: elements.end.value
        });
    }

    handleClear() {
        this.startText.current.value = "";
        this.endText.current.value = "";
        this.setState({
            currentRouteOption: 3
        }, () => {
            this.props.onRouteOptionsUpdate(this.state.currentRouteOption);
        });
        this.toggleRealtime();
        this.props.onClear();
    }

    selectRouteOption(event) {
        this.setState({
            currentRouteOption: event.target.innerText
        }, () => {
            this.props.onRouteOptionsUpdate(this.state.currentRouteOption);
        });
    }

    pickDate(event) {
        if (event._isValid) {
            let dateObj = {
                date: moment(event).format("YYYY-MM-DD"),
                time: moment(event).format("HH:mm")
            };
            this.props.onDatePick(dateObj);
            this.setState({
                depart_date: moment(event).format("DD/MM/YYYY HH:mm"),
                datepicker_value: moment(event).format("DD/MM/YYYY HH:mm")
            });
        }
    }

    toggleRealtime() {
        this.setState({
            depart_date: "Real time",
            datepicker_value: ""
        }, () => {
            this.props.onDatePick({});
        });
    }
     
    render() {
        return (
            <Navbar expand="lg" bg="dark" variant="dark" collapseOnSelect>
                <Navbar.Brand>HSL Timetables</Navbar.Brand>
                <Navbar.Text>
                    <Clock />
                </Navbar.Text>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse className="justify-content-end" id="responsive-navbar-nav">
                    <Form onSubmit={this.handleSubmit} inline>
                        <Form.Control ref={this.startText} name="start" type="text" placeholder="Starting point" className="m-2" required />
                        <Form.Control ref={this.endText} name="end" type="text" placeholder="End point" className="m-2" required />
                        <Dropdown>
                            <Dropdown.Toggle variant="info" className="m-2">{this.state.depart_date}</Dropdown.Toggle>
                            <Dropdown.Menu className="p-1">
                                <Dropdown.Item disabled>Departure time</Dropdown.Item>
                                <Dropdown.Item onClick={this.toggleRealtime}>Real time</Dropdown.Item>
                                <Dropdown.Item disabled>
                                    Delayed &#x25BC; <br />
                                    (close to accept)
                                </Dropdown.Item>
                                <Datetime dateFormat="DD/MM/YYYY" timeFormat="HH:mm" inputProps={{ value: this.state.datepicker_value }} onBlur={this.pickDate} />
                            </Dropdown.Menu>
                        </Dropdown>
                        <Dropdown>
                            <Dropdown.Toggle variant="info">{this.state.currentRouteOption}</Dropdown.Toggle>
                            <Dropdown.Menu>
                                <Dropdown.Item disabled>Itineraries</Dropdown.Item>
                                {this.state.routeOptions.map( (option, index) => <Dropdown.Item onClick={this.selectRouteOption} key={"d" + index}>{option}</Dropdown.Item> )}
                            </Dropdown.Menu>
                        </Dropdown>
                        <Button variant="success" type="submit" className="m-2">Get routes</Button>
                        <Button variant="danger" onClick={this.handleClear} className="m-2">Clear</Button>            
                    </Form>
                </Navbar.Collapse>
            </Navbar>
        );
    }

}