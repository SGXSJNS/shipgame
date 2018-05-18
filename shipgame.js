var view = {
  displayMessage: function(msg) {
    var messageAreaå= document.getElementById("messageArea");
    messageArea.innerHTML = msg;
  },
  displayHit: function(location) {
    var cell = document.getElementById(location);
    cell.setAttribute("class", "hit");
  },
  displayMiss: function(location) {
    var cell = document.getElementById(location);
    cell.setAttribute("class", "miss");
  }
};

view.displayMiss("00");
view.displayHit("34");
view.displayMiss("55");
view.displayHit("12");
view.displayMiss("25");
view.displayHit("26");

view.displayMessage("Tap tap, is this thing on?");

var ship = { locations: ["06", "16", "26"], hits: ["", "", ""] };
locations: ship.locations.indexOf(guess);

var model = {
  boardSize: 7,
  numShips: 3,
  shipLength: 0,
  shipSunk: 3,

isSunk: function(ship) {
    for (var i = 0; i < this.numShips; i++) {
        if (ship.hits[i] !== "hit") {
            return false;
        }
    }
    return true;
  }
};