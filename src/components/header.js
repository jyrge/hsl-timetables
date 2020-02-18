import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import Form from 'react-bootstrap/Form';
import Button from 'react-bootstrap/Button';

export default class Header extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            time: new Date().toLocaleString("en-GB")
        };

        this.startText = React.createRef();
        this.endText = React.createRef();

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleClear = this.handleClear.bind(this);
    }

    componentDidMount() {
        setInterval(
          () => this.setState({ time: new Date().toLocaleString("en-GB") }),
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

    handleClear() {
        this.startText.current.value = "";
        this.endText.current.value = "";
        this.props.onClear();
    }
     
    render() {
        return (
            <Navbar expand="lg" bg="dark" variant="dark" collapseOnSelect>
                <Navbar.Brand>HSL Timetables</Navbar.Brand>
                <Navbar.Text>
                    {this.state.time}
                </Navbar.Text>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse className="justify-content-end" id="responsive-navbar-nav">
                    <Form onSubmit={this.handleSubmit} inline>
                        <Form.Control ref={this.startText} name="start" type="text" placeholder="Starting point" className="m-2" required />
                        <Form.Control ref={this.endText} name="end" type="text" placeholder="End point" className="m-2" required />
                        <Button variant="outline-success" type="submit" className="m-2">Get routes</Button>
                        <Button variant="outline-danger" onClick={this.handleClear} className="m-2">Clear</Button>            
                    </Form>
                </Navbar.Collapse>
            </Navbar>
        );
    }
}