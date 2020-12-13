import React from "react";
import Navbar from "react-bootstrap/Navbar";
import Routes from "./Routes";
import "./App.css";

function App() {
  return (
    <div className="App container py-3">
      <Navbar collapseOnSelect bg="light" expand="md" className="mb-3">
        <Navbar.Brand className="font-weight-bold text-muted">
          Scratch
        </Navbar.Brand>
        <Navbar.Toggle />
      </Navbar>
      <Routes />
    </div>
  );
}

export default App;

/* import React, {Component} from 'react'
import Table from './Table'
import Form from './Form'


class App extends Component {

    handleSubmit = (character) => {
        this.setState({characters: [...this.state.characters, character]})
    }

    removeCharacter = (index) => {
        const {characters} = this.state
      
        this.setState({
          characters: characters.filter((character, i) => {
            return i !== index  //and returning all but the one that is passed through.
          }),
        })
      }
   
    state = {
        characters: [],
      }

      render() {
        const {characters} = this.state
      
        return (
          <div className="container">
            <Table characterData={characters} 
                removeCharacter={this.removeCharacter} />
            <Form handleSubmit={this.handleSubmit} />
          </div>
        )
      }
}
export default App */