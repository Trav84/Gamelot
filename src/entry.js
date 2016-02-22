/**
 * Created by trav84 on 2/21/16.
 */
require('./styles.css');

var React = require('react');
var ReactDOM = require('react-dom');

import Header from './components/Header.js';
import AddGame from './components/AddGame.js';

export default ReactDOM.render(
  <section>
    <Header />
    <AddGame />
  </section>,
  document.getElementById('react-mount')
);

$(document).ready(function() {
  $(".button-collapse").sideNav();
});