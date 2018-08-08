import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import '../../App.css';

//import { homedir } from 'os';

//header
const Header = props => {
  const { branding } = props; //desctructuring
  return (
    <nav
      className="navbar navbar-expand-sm navbar-dark mb-3 py-0"
      style={{ backgroundColor: '#4389dced' }}
    >
      <div className="container">
        <Link to="/" className="navbar-brand">
          {branding}
        </Link>
        <div>
          <ul className="navbar-nav mr-auto">
            <li className="nav-item">
              <Link to="/" className="nav-link">
                <i className="fas fa-home mr-1" />
                <span className="headerLink"> Home</span>
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/contacts/add" className="nav-link">
                <i className="fas fa-plus mr-1" />
                <span className="headerLink"> Add</span>
              </Link>
            </li>
            <li className="nav-item">
              <Link to="/about" className="nav-link">
                <i className="fas fa-question mr-1" />
                <span className="headerLink"> About</span>
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
};

//set default props if none provided
Header.defaultProps = {
  branding: 'My App'
};

//validate property types
Header.propTyoes = {
  branding: PropTypes.object.isRequired
};

export default Header;
