import React, { Component } from 'react';
import { Consumer } from '../../context.js';
import TextInputGroup from '../layout/TextInputGroup.js';
import axios from 'axios';
import uuid from 'uuid';

class EditContact extends Component {
  state = {
    name: '',
    email: '',
    phone: '',
    errors: {}
  };

  //asyncronously fetch data from jsonplaceholder api
  async componentDidMount() {
    //bring in id from this.props.match.params
    const { id, username } = this.props.match.params;
    //set res to promise result
    const res = await axios.get(
      `http://jsonplaceholder.typicode.com/users/${id}`
    );
    //set contact to res data
    const contact = res.data;
    //set the state to the data from axios call
    this.setState({
      name: contact.name,
      email: contact.email,
      phone: contact.phone,
      username: contact.username
    });
  }

  //use event.target.name rather than hard code the state keys
  //make sure name of elements match state keys
  onChange = event =>
    this.setState({ [event.target.name]: event.target.value });

  //prevent from writing to file
  //calls the dispatch method defined in context.js and passes ID as payload with DELETE_CONTACT request
  onSubmit = async (dispatch, event) => {
    event.preventDefault();
    const { name, email, phone, username } = this.state;
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
    const updateContact = { name, email, phone, username };
    const { id } = this.props.match.params;
    //use axios to simulate a put request to backend
    const res = await axios.put(
      `https://jsonplaceholder.typicode.com/users/${id}`,
      updateContact
    );
    dispatch({ type: 'UPDATE_CONTACT', payload: res.data });

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
                  <span className="text-danger">Update</span> Contact
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

export default EditContact;
