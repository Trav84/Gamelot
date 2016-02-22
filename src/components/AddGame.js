/**
 * Created by trav84 on 2/21/16.
 */
import React from 'react';
import ReactDOM from 'react-dom';

class AddGame extends React.Component {
  searchGame = (e) => {
    var baseURL = "http://www.boardgamegeek.com/xmlapi/search?search=";
    var urlSuffix = "&exact=1";
    e.preventDefault();
    var searchedGame = ReactDOM.findDOMNode(this.refs.gameInput).value;
    console.log(searchedGame);
    $.get(baseURL + searchedGame + urlSuffix, function(result) {
      console.log(result);
      var JSON = this.convertXML(result);
      console.log(JSON);
    });
  };
  convertXML = (XML) => {
    console.log(XML);
    // Changes XML to JSON
      // Create the return object
      var obj = {};

      if (xml.nodeType == 1) { // element
        // do attributes
        if (xml.attributes.length > 0) {
          obj["@attributes"] = {};
          for (var j = 0; j < xml.attributes.length; j++) {
            var attribute = xml.attributes.item(j);
            obj["@attributes"][attribute.nodeName] = attribute.nodeValue;
          }
        }
      } else if (xml.nodeType == 3) { // text
        obj = xml.nodeValue;
      }

      // do children
      if (xml.hasChildNodes()) {
        for(var i = 0; i < xml.childNodes.length; i++) {
          var item = xml.childNodes.item(i);
          var nodeName = item.nodeName;
          if (typeof(obj[nodeName]) == "undefined") {
            obj[nodeName] = xmlToJson(item);
          } else {
            if (typeof(obj[nodeName].push) == "undefined") {
              var old = obj[nodeName];
              obj[nodeName] = [];
              obj[nodeName].push(old);
            }
            obj[nodeName].push(xmlToJson(item));
          }
        }
      }
      return obj;
  };
  render() {
    return (
      <section className="addGame">
        <h4 className="center-align">Add A Game</h4>
        <div className="row">
          <form className="col s12" onSubmit={this.searchGame}>
            <div className="input-field col s6 offset-s3">
              <input ref="gameInput" placeholder="Risk" id="add_game" type="text" className="validate" />
              <label htmlFor="add_game">Game Title</label>
            </div>
          </form>
        </div>
      </section>
    );
  }
}

export default AddGame;