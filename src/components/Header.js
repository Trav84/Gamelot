/**
 * Created by trav84 on 2/21/16.
 */
import React from 'react';

class Header extends React.Component {
  render() {
    return (
      <nav>
        <div className="nav-wrapper">
          <a href="#!" className="brand-logo">Logo</a>
          <a href="#" data-activates="nav-mobile" className="button-collapse"><i className="material-icons">menu</i></a>
          <ul id="nav" className="right hide-on-med-and-down">
            <li><a href="#">Vault</a></li>
            <li><a href="#">Add Game</a></li>
            <li><a href="#">Quick Play</a></li>
            <li><a href="#">Sign Out</a></li>
          </ul>
          <ul id="nav-mobile" className="side-nav">
            <li><a href="#">Vault</a></li>
            <li><a href="#">Add Game</a></li>
            <li><a href="#">Quick Play</a></li>
            <li><a href="#">Sign Out</a></li>
          </ul>
        </div>
      </nav>
    );
  }
}

export default Header;