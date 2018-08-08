import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Consumer } from '../../context.js';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './Contact.css';
import copy from 'copy-to-clipboard';

class Contact extends Component {
  state = {
    showContactInfo: false
  };
  //arrow function binds this just as  this.onShowClick = this.onShowClick.bind(this)
  onShowClick = event => {
    this.setState({
      showContactInfo: !this.state.showContactInfo
    });
    console.log(this.state);
  };
  //use axios to make a delete request and pass the id in.
  //when the promise returns , call the dispatch method defined in context.js and passes ID as payload with DELETE_CONTACT request
  onDeleteClick = async (id, dispatch) => {
    //try
    try {
      //this simulates a request to delete from a backend
      //not getting anything back, no need to assign a variable
      await axios.delete(`https://jsonplaceholder.typicode.com/users/${id}`);
      dispatch({ type: 'DELETE_CONTACT', payload: id });
    } catch (exception) {
      dispatch({ type: 'DELETE_CONTACT', payload: id });
    }
  };

  //copy values to clipboard
  copyToClipboard(text) {
    //check that text is a string and return otherwise
    if (typeof text !== 'string') {
      return;
    }
    return () => {
      console.log('copied to clipboard');
      copy(text);
    };
  }

  render() {
    const { name, email, phone, id, username, address } = this.props.contact;

    //destructuring
    const { showContactInfo } = this.state;

    return (
      //we can get anything in the context state inside of the consumer
      <Consumer>
        {value => {
          const { dispatch } = value;
          return (
            <div className="card card-body mb-3">
              <h4>
                {name}{' '}
                <i
                  onClick={this.onShowClick}
                  className="fas fa-sort-down"
                  style={{ cursor: 'pointer' }}
                />
                <i
                  className="fas fa-times"
                  style={{
                    cursor: 'pointer',
                    float: 'right',
                    padding: '0',
                    color: 'red'
                  }}
                  onClick={this.onDeleteClick.bind(this, id, dispatch)}
                />
                <Link to={`contacts/edit/${id}`}>
                  <i
                    className="fas fa-pencil-alt"
                    style={{
                      cursor: 'pointer',
                      float: 'right',
                      marginRight: '1.5em',
                      color: 'lightblue',
                      padding: '0'
                    }}
                  />
                </Link>
              </h4>

              {showContactInfo ? (
                <ul className="list-group">
                  <li className="list-group-item">
                    <h4 className="text-danger">Contact Information</h4>
                  </li>
                  <li className="list-group-item">
                    <span className="text-info"> Name</span> : {name}
                    <span className="copyText">
                      {'Copy name | '}
                      <i
                        className="far fa-copy ml-2"
                        onClick={this.copyToClipboard(name)}
                      />
                    </span>
                  </li>
                  <li className="list-group-item">
                    <span className="text-info">Username</span> : {username}
                    <span className="copyText">
                      {'Copy username | '}
                      <i
                        className="far fa-copy ml-2"
                        onClick={this.copyToClipboard(username)}
                      />
                    </span>
                  </li>
                  <li className="list-group-item">
                    <span className="text-info">Email</span> : {email}
                    <span className="copyText">
                      {'Copy email | '}
                      <i
                        className="far fa-copy ml-2"
                        onClick={this.copyToClipboard(email)}
                      />
                    </span>
                  </li>
                  <li className="list-group-item">
                    <span className="text-info">Phone</span> : {phone}
                    <span className="copyText">
                      {'Copy phone | '}
                      <i
                        className="far fa-copy ml-2"
                        onClick={this.copyToClipboard(phone)}
                      />
                    </span>
                  </li>
                </ul>
              ) : null}
            </div>
          );
        }}
      </Consumer>
    );
  }
}

//validate prop types
Contact.propTypes = {
  contact: PropTypes.object.isRequired
};

export default Contact; //exporting default means you don't need to use curly braces when importing
