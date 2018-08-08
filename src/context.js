import React, { Component } from 'react';
import axios from 'axios';

const Context = React.createContext();

//reducer
const reducer = (state, action) => {
  switch (action.type) {
    case 'DELETE_CONTACT':
      return {
        ...state,
        contacts: state.contacts.filter(
          contact => contact.id !== action.payload
        )
      };
    case 'ADD_CONTACT':
      return {
        ...state,
        contacts: [action.payload, ...state.contacts]
      };
    case 'UPDATE_CONTACT':
      return {
        ...state,
        contacts: state.contacts.map(
          contact =>
            contact.id === action.payload.id
              ? (contact = action.payload)
              : contact
        )
      };
    default:
      return state;
  }
};

//provider class
export class Provider extends Component {
  state = {
    contacts: [],
    //dispatch function
    dispatch: action => {
      this.setState(state => reducer(state, action));
    }
  };

  async componentDidMount() {
    //native fetch api example here
    //fetch user data to fill state contact list
    //use .then since fetch returns a promise
    /*fetch('https://jsonplaceholder.typicode.com/users')
      .then(response => response.json())
      .then(data =>
        this.setState({
          contacts: data
        })
      );*/
    //same result as fetch about, but this is using axios
    //saves a bit of code since it auto formats to json for you
    //use async/await to help with syntax
    const res = await axios.get('https://jsonplaceholder.typicode.com/users');
    this.setState({ contacts: res.data });
  }

  render() {
    return (
      <Context.Provider value={this.state}>
        {this.props.children}
      </Context.Provider>
    );
  }
}

//export the consumer so other components can get the state
export const Consumer = Context.Consumer;
