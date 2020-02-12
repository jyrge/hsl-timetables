import React from 'react';
import Time from 'react-time';
import Navbar from 'react-bootstrap/Navbar';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import Button from 'react-bootstrap/Button';

export default class Header extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            time: new Date()
        };
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        setInterval(
          () => this.setState({ time: new Date() }),
          1000
        );
    }

    handleSubmit(event) {
        event.preventDefault();
        let elements = event.target.elements;
        this.props.onSubmit({
            start_point: elements.start.value,
            end_point: elements.end.value
        });
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
                    <Form onSubmit={this.handleSubmit} inline>
                        <FormControl name="start" type="text" placeholder="Starting point" className="m-2" required />
                        <FormControl name="end" type="text" placeholder="End point" className="m-2" required />
                        <Button variant="outline-success" type="submit" className="m-2">Get routes</Button>         
                    </Form>
                </Navbar.Collapse>
            </Navbar>
        );
    }
}