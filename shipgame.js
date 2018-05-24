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

var model = {
    boardSize: 7,
    numShips: 3,
    shipLength: 3,
    shipSunk: 0,
    ships: [ { locations: ["0", "0", "0"], hits: ["", "", ""] },
             { locations: ["0", "0", "0"], hits: ["", "", ""] },
             { locations: ["0", "0", "0"], hits: ["", "", ""] } ],

  fire: function(guess) {
    for (var i = 0; i < this.numShips; i++) {
        var ship = this.ships[i];
        var index = ship.locations.indexOf(guess);
        if (ship.hits[index] === "hit") {
            view.displayMessage("Oops");
            return true;
        } else if (index >= 0) {
            ship.hits[index] = "hit";
            view.displayHit(guess);
            vies.displayMessage("You HIT!");

            if (this.isSunk(ship)) {
                view.displayMessage("GOOD");
                this.shipSunk++;
            }
            return true;       
        }
    }
    view.displayMiss(guess);
    view.displayMessage("Miss");
    return false;
  },

  isSunk: function(ship) {
      for (var i = 0; i < this.numLength; i++) {
          if (ship.hits[i] !== "hit") {
              return false;
          }
      }
      return true;
    },

  generateShipLocations: function() {
    var locations;
    for (var i = 0; i < this.unmShips; i++) {
        do {
            locations = this.generateShip();
        } while (this.collision(locations));
        this.ships[i].locations = locations;
       }
    },

    generateShip: function() {
        var direction = Math.floor(Math,random() * 2);
        var row, col;
        if(direction === 1) {
            row = Math.floor(Math.random() * this.boardSize);
            col = Math.floor(Math.random() * (this.boardSize - this.shipLength + 1));
        } else {
            col = Math.floor(Math.random() * (this.boardSize - this.shipLength + 1));
            row = Math.floor(Math.random() * this.boardSize);
        }
        
        var newShipLocations = [];
        for(var i = 0; i < this.shipLength; i++) {
            if(direction === 1) {
                newShipLocations.push(row + "" + (col + i));
            }else{
                newShipLocations.push((row + i) + "" + col);
            }
        }
        return newShipLocations;      
    },

    collision: function(locations) {
        for(var i = 0; i < this.numShips; i++) {
            var ship = model.ships[1];
            for(var x =0; x < locations.length; x++) {
                if(ship.location.indexOf(locations[x]) >= 0) {
                    return true;                  
                }
            }
        }
        return false;
      },
    };

  var controller = {
            guesses: 0,

    processGuess: function(guess) {
        var location = parseGuess(guess);
        if (location) {
            this.guesses++;
            var hit = model.fire(location);
            if (hit && model.shipSunk === model.numShips) {
                view.displayMessage("You sank all my battleships, in " + this.guesses + " guesses");
            }
        }
    }
  };

  function parseGuess(guess) {
        var alphabet = ["A", "B", "C", "D", "E", "F", "G"];

        if (guess === null || guess.length !== 2) {
          alert("Oops, please enter a lettle and a number on the board,");
        } else {
          var firstChar = guess.charAt(0);
          var row = alphabet.indexOf(firstChar);
          var column = guess.charAt(1);

          if (isNaN(row) || isNaN(column)) {
            alert("Oops, that isn't on the board.");
          } else if (row < 0 || row >= model.boardSize ||
                            column < 0 || column >= model.boardSize) {
              alert("Oops, that's off the board!");
          } else {
            return row + column;
          }
        }
        return null;
      };

  function handleFireButton() {
    var guessInput = document.getElementById("guessInpput");
    var guess = guessInpput.value.toUpperCase();

    controller.processGuess(guess);

    guessInpput.value = "";
  }; 

  function handleFireButton(e) {
    var fireButton = document.getElementById("fireButton");
    e = e || window.event;

    if (e.keyCode === 13) {
      fireButton.click();
      return false;
    }
  };

  window.onload = init;
  
function init() {
   var fireButton = document.getElementById("fireButton");
   fireButton.onclick = handleFireButton;
   var guessInput = document.getElementById("guessInput");
   guessInput.onkeypress = handleKeyPress;

   model.generateShipLocations();
};
