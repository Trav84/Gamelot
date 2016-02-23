/**
 * Created by trav84 on 2/21/16.
 */
import React from 'react';
import ReactDOM from 'react-dom';

class AddGame extends React.Component {
  searchGame = (e) => {
    e.preventDefault();

    var baseURL = "http://www.boardgamegeek.com/xmlapi/search?search=";
    var urlSuffix = "&exact=1";
    var searchedGame = ReactDOM.findDOMNode(this.refs.gameInput).value;
    var self = this;

    console.log(searchedGame);

    $.get(baseURL + searchedGame + urlSuffix, function(result) {
      var jsonResult = self.convertXML($(result)[0]);
      self.parseResults(jsonResult);
    });
  };
  //TODO: Maybe find better way to convert to JSON from XML
  convertXML = (xml) => {
    var result = xmlToJson(xml);
    return result;

    function xmlToJson(xml) {
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
        for (var i = 0; i < xml.childNodes.length; i++) {
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
    }
  };
  //TODO: Better iteration over this
  parseResults = (JSON) => {
    var boardGames = JSON.boardgames.boardgame;
    console.log(boardGames);

    for(var x=0; x < boardGames.length; x++) {
      console.log(boardGames[x]);
    }
  };
  buildItems = () => {
    return this.props.gridItems.map(function(item, index) {
      return <div className="item" key={index}>
        <img src={item.image} />
        <h5>{item.title}</h5>
        <p>{item.body}</p>
      </div>
    });
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
        {this.buildItems}
      </section>
    );
  }
}

export default AddGame;