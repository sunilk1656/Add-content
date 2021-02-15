import React, { Component } from 'react';
import fire from "./config/fire";
import Login from "./components/Login";
import Todo from "./components/Todo";

class App extends Component {
  constructor() {
    super()
    this.state = {
      user: {}
    }
  }
  componentDidMount() {
    this.authListener()
  }
  authListener() {
    fire.auth().onAuthStateChanged((user) => {
      if (user) {
        this.setState({ user });
      }
      else {
        this.setState({ user: null })
      }

    })
  }
  render() {
    return (
      <div>
        {this.state.user ? <Todo /> : <Login />}
      </div>
    );
  }
}

export default App;
