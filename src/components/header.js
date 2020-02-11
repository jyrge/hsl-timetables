import React from 'react';
import Time from 'react-time';
import Navbar from 'react-bootstrap/Navbar';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';

export default class Header extends React.Component {
    state = {
        time: new Date().now
    };

    componentDidMount() {
        setInterval(
          () => this.setState({ time: new Date() }),
          1000
        );
    }
    
    render() {
        return (
            <Navbar expand="lg" bg="dark" variant="dark" collapseOnSelect>
                <Navbar.Brand>HSL Timetables</Navbar.Brand>
                <Navbar.Text>
                    <Time value={this.state.time} format="HH:mm:ss" />
                </Navbar.Text>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse className="justify-content-end" id="responsive-navbar-nav">
                    <Form inline>
                        <FormControl type="text" placeholder="Starting point" className="mr-sm-2" />
                        <FormControl type="text" placeholder="End point" className="mr-sm-2" />
                        <Button variant="outline-success">Get routes</Button>
                    </Form>
                </Navbar.Collapse>
            </Navbar>
        );
    }
}