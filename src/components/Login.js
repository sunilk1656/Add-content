import React, { Component } from 'react';
import fire from "../config/fire";
import { Button, Navbar, Form, Modal } from 'react-bootstrap';
class Login extends Component {
    constructor() {
        super()
        this.state = {
            email: '',
            password: '',
            show: false,
            regis: false,
        }
    }
    login = (event) => {
        event.preventDefault();
        fire.auth().signInWithEmailAndPassword(this.state.email, this.state.password).then((u) => {
            console.log(u)
            console.log("HHHHHHHlll", u)
        }).catch((err) => {
            console.log(err);
        })
    }
    signUp = (event) => {
        event.preventDefault();
        fire.auth().createUserWithEmailAndPassword(this.state.email, this.state.password).then((u) => {
            console.log("HHHHHHH", u)
            this.render("signup sucessful")

        }).catch((err) => {
            console.log(err);
        })
      
    }
    handleChange = event => {
        this.setState({ [event.target.name]: event.target.value })
    }
    handleRegister = () => this.setState({ regis: true })
    handleClose = () => this.setState({ show: false, regis: false });
    handleShow = () => this.setState({ show: true });
    render() {
        return (
            <div>
                <Navbar bg="primary" variant="dark">
                    <Navbar.Brand href="#home">Todo-App</Navbar.Brand>
                        <Button variant="outline-light "  style={{ position:'absolute',right:200 }}
                            onClick={this.handleShow}
                        >LOGIN</Button>
                        <Button variant="outline-light"  style={{ position:'absolute',right:100 }} onMouseOver={this.handleRegister}
                            onClick={this.handleShow}>SIGNUP</Button>
                </Navbar>
                <Modal
                    show={this.state.show}
                    onHide={this.handleClose}
                    backdrop="static"
                    keyboard={false}>
                    <Modal.Header closeButton>
                        {this.state.regis ? <Modal.Title>Please Register here</Modal.Title> :
                            <Modal.Title>Login Here</Modal.Title>}
                    </Modal.Header>
                    <Modal.Body>
                        <Form.Control type="email" name="email"
                            placeholder="Enter email"
                            onChange={this.handleChange} />
                        <Form.Control type="password" name="password"
                            placeholder="Enter password"
                            onChange={this.handleChange} />
                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.handleClose}>
                            Close
                        </Button>
                        {this.state.regis ? <Button variant="primary"
                            onClick={this.signUp}>SignUp</Button> :
                            <Button onClick={this.login}>Login</Button>
    }
                    </Modal.Footer>
                </Modal>
            </div>
        );
    }
}
export default Login;