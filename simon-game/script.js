$(document).ready(function() {

  var display = $(".display p");
  var green = $(".green");
  var red = $(".red");
  var yellow = $(".yellow");
  var blue = $(".blue");
  var buttons = [green, red, yellow, blue];

  var greenAudio = new Audio("https://s3.amazonaws.com/freecodecamp/simonSound1.mp3");
  var redAudio = new Audio("https://s3.amazonaws.com/freecodecamp/simonSound2.mp3");
  var yellowAudio = new Audio("https://s3.amazonaws.com/freecodecamp/simonSound3.mp3");
  var blueAudio = new Audio("https://s3.amazonaws.com/freecodecamp/simonSound4.mp3");
  var audios = [greenAudio, redAudio, yellowAudio, blueAudio];

  var Game = {};

  Game.power = false;
  Game.strict = false;

  Game.default = function() {
    this.sequence = [];
    this.sequenceLength = null;
    this.seqStep = 0;
    this.highestStep = 0;
    this.usrTurn = false;
    this.clickable = true;
  }

  Game.generateSequence = function() {
    for (var i = 0; i < 20; i++) {
      this.sequence.push(Math.floor((Math.random() * 4)));
    }
    this.sequenceLength = this.sequence.length;
  }

  function flashButton(button) {
    button.addClass("flash");
    setTimeout(function() {
      button.removeClass("flash");
    }, 500);
  }

  function displayMessage(msg) {
    display.text(msg);
  }

  function playSequence(steps) {
    setTimeout(function() {

      //takes care of adding 0 in front of number if < 10
      displayMessage(("0" + (Game.highestStep + 1)).slice(-2));
      Game.usrTurn = false;
      var pass = 0;
      var seqInterval = setInterval(function() {
        if (pass == steps) {
          Game.usrTurn = true;
          clearInterval(seqInterval);
        }
        flashButton($("#" + Game.sequence[pass]));
        audios[Game.sequence[pass]].play();
        pass++;
      }, 1000);
    }, 500);
  }

  function isGoodGuess(button) {
    return button.attr("id") == Game.sequence[Game.seqStep];
  }

  function startGame() {
    Game.default();
    Game.generateSequence();
    playSequence(Game.highestStep);
  }

  function toggleStrictMode() {
    if (Game.strict == true) {
      Game.strict = false;
    } else {
      Game.strict = true;
    }
  }

  function togglePower() {
    $("#power").toggleClass("on");
    if (Game.power == true) {
      Game.power = false;
      Game.default();
      displayMessage("--");
      $(".strict-led").removeClass("lit");
    } else {
      Game.power = true;
    }
  }

  function timeout() {
    setTimeout(function() {;
    }, 1000);
  }

  function toggleLed() {
    console.log("lel");
    if (Game.power == true) {
      display.removeClass("non-led");
      display.addClass("led");
    } else {
      display.removeClass("led");
      display.addClass("non-led");
    }
  }

  function isWin() {
    return Game.highestStep == 19;
  }

  $(".start").click(function() {
    if (Game.power) {
      startGame();
    }
  })

  $(".button-area").click(function() {
    if (Game.usrTurn) {
      flashButton($(this));
      audios[$(this).attr("id")].play();

      if (isGoodGuess($(this))) {
        if (Game.seqStep == Game.highestStep) {
          if (isWin()) {
            togglePower();
            displayMessage("WIN!");
            makeUnclickable();
            alert("CONGRATULATIONS! YOU WON!");
          } else {
            Game.highestStep++;
            Game.seqStep = 0;
            playSequence(Game.highestStep);
          }
        } else {
          Game.seqStep++;
        }

        // User guesses wrong
      } else {
        Game.seqStep = 0;
        displayMessage("!!!");
        if (Game.strict) {
          startGame();
        } else {
          playSequence(Game.highestStep);
        }
      }
    }
  });

  $(".switcher").click(function() {
    togglePower();
    toggleLed();
    console.log("hue");
  })

  $(".strict").click(function() {
    if (Game.power) {
      $(".strict-led").toggleClass("lit");
      toggleStrictMode();
    }
  });

  $("h1").click(function() {
    console.log(Game.usrTurn);
  })
});