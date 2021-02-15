import React, { Component } from 'react';
import fire from '../config/fire';
import firebase from 'firebase/app';
import {  FaTrash } from 'react-icons/fa'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Button, Navbar, Form, Badge } from 'react-bootstrap';

class Todo extends Component {
    constructor() {
        super()
        this.state = {
            text: '',
            todoList: [],
        }
    }
    componentDidMount() {
        const todoRef = firebase.database().ref('authtodoapp');
        todoRef.on('value', (snapshot) => {
            const todos = snapshot.val();
            const todoList = [];
            for (let id in todos) {
                todoList.push({ id, ...todos[id] });
            }
            this.setState({ todoList });
            console.log("Todo List", todoList)
        });
    }
    logout = () => {
        fire.auth().signOut();
        toast("Logged Out Successfully!")
    }
    clearText=()=>this.setState({text:''})
    handleOnChange = (e) => {
        this.setState({ [e.target.name]: e.target.value });
        console.log("HHHHA", e.target.value)
    };
    createTodo = () => {
        const todoRef = fire.database().ref('authtodoapp');
        let text = this.state.text;
        const todo = {
            text,
        };
        todoRef.push(todo);
        this.setState({ text: '' })
        console.log("KKKKKKKKK")
    };
    deleteTodo = (event,id) => {
       if(window.confirm("Are you ready to delete this items?")){
        const todoRef = fire.database().ref('authtodoapp').child(id);
        todoRef.remove();
    }
    };
    render() {
        return (
            <React.Fragment>
                <Navbar bg="primary" variant="dark">
                    <Navbar.Brand href="#home">Todo-App</Navbar.Brand>
                    <Button variant="outline-light" onClick={this.logout}
                        style={{ float: 'right' }}>Logout</Button>
                </Navbar>

                <div className="card" style={{ marginTop: 5 }}>
                    <div className="card-body">
                        <div className="row">
                            <div className="col-md-3"></div>
                            <div className="col-md-6">
                                <Form.Control as="textarea" rows={4} type="text" name="text" id="text" value={this.state.text}
                                    onChange={this.handleOnChange} placeholder="Add a note" width="80%" />
                            </div>
                            <div className="col-md-2">
                            <button type="button" onClick={this.createTodo} class="btn btn-dark">ADD+</button>
                               <br></br><br></br>
                               <button type="button" onClick={this.clearText} class="btn btn-dark">CLEAR</button>
                               
                            </div>
                            <ToastContainer />
                        </div>
                    </div>
                </div>
                <div style={{ alignItems: 'center'  }}>
                    {
                        this.state.todoList.map((item, idx) => <div key={idx}style={{
                            marginTop: 15, width: "48%",
                            alignItems: 'center', marginLeft: '26%',
                        }}>
                            <span class="badge  bg-primary">{idx +1}</span>
                           
                            <div className="card" style={{ 
                                alignItems: 'center', padding: 25,
                                borderBottom: '6px solid #2196F3'
                            }} >  <FaTrash style={{ marginLeft: '100%', color: 'blue' }}
                                onClick={event => this.deleteTodo(event, item.id)} />
                                <div className="card-body" >
                                    <div className="row">
                                        <div className="col-md-10">
                                    <p><strong>{item.text}</strong></p>
                                    </div>
                                    <div className="col-md-2">
                                    
                                    </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        )
                    }
                </div>
            </React.Fragment>
        );
    }
}

export default Todo;