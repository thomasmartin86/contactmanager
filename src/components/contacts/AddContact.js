import React, { Component } from 'react';
import { Consumer } from '../../context.js';
import TextInputGroup from '../layout/TextInputGroup.js';
import axios from 'axios';
import uuid from 'uuid';

class AddContact extends Component {
  state = {
    name: '',
    email: '',
    phone: '',
    errors: {}
  };

  //use event.target.name rather than hard code the state keys
  //make sure name of elements match state keys
  onChange = event =>
    this.setState({ [event.target.name]: event.target.value });

  //prevent from writing to file
  //calls the dispatch method defined in context.js and passes ID as payload with DELETE_CONTACT request
  onSubmit = async (dispatch, event) => {
    event.preventDefault();
    const { name, email, phone } = this.state;
    //check for errors
    if (name === '') {
      this.setState({
        errors: {
          name: 'Name is required'
        }
      });
      return;
    }
    if (email === '') {
      this.setState({
        errors: {
          email: 'Email is required'
        }
      });
      return;
    }
    if (phone === '') {
      this.setState({
        errors: {
          phone: 'Phone is requires'
        }
      });
      return;
    }

    const newContact = { name, email, phone };
    //use axios to simulate a put request to backend
    const res = await axios.post(
      'https://jsonplaceholder.typicode.com/users/',
      newContact
    );
    dispatch({ type: 'ADD_CONTACT', payload: res.data });

    //clear state after dispatch
    this.setState({
      name: '',
      email: '',
      phone: '',
      errors: {}
    });

    //redirect using props.history
    this.props.history.push('/');
  };

  render() {
    const { name, email, phone, errors } = this.state;

    return (
      //value contains entire state
      <Consumer>
        {value => {
          const { dispatch } = value;
          return (
            <div className="card mb-3">
              <div className="card-header">
                <h1 className="display-4">
                  <span className="text-danger">Add</span> Contact
                </h1>
              </div>
              <div className="card-body">
                <form onSubmit={this.onSubmit.bind(this, dispatch)}>
                  <TextInputGroup
                    label="Name"
                    name="name"
                    placeholder="Enter name..."
                    value={name}
                    onChange={this.onChange}
                    error={errors.name}
                  />
                  <TextInputGroup
                    label="Email"
                    type="email" //default type is text so we only need to specify when we want something else
                    name="email"
                    placeholder="Enter email..."
                    value={email}
                    onChange={this.onChange}
                    error={errors.email}
                  />
                  <TextInputGroup
                    label="Phone"
                    name="phone"
                    placeholder="Enter phone..."
                    value={phone}
                    onChange={this.onChange}
                    error={errors.phone}
                  />
                  <input
                    type="submit"
                    value="Submit Contact"
                    className="btn btn-primary btn-block"
                  />
                </form>
              </div>
            </div>
          );
        }}
      </Consumer>
    );
  }
}

export default AddContact;
