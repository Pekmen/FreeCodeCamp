$(document).ready(function() {

  var plSign;
  var aiSign;

  $(".button").click(function() {
    if ($(this).attr("id") == "button-x") {
      plSign = "X";
      aiSign = "O";
    } else {
      plSign = "O";
      aiSign = "X";
    }
    $(".modalxo").css("visibility", "hidden");
    game.refresh();
  });

  var winMoves = ['012', '048', '036', '147', '246', '258', '345', '678'];

  function randomAiPosition() {
    return (Math.floor(Math.random() * 9));
  }

  var game = {  
    board: [0, 0, 0, 0, 0, 0, 0, 0, 0]
  };

  //za brisanje
  game.pl = 1;
  game.ai = -1;

  game.board[randomAiPosition()] = game.ai;

  game.refresh = function() {
    for (var i = 0; i <= 9; i++) {
      if (game.board[i] != 0) {
        $("#" + i).html('<p>' + game.translateSign(game.board[i]) + '</p>');
      }
    }
  }

  game.translateSign = function(n) {
    var sign = n == 1 ? plSign : aiSign;
    return sign;
  }

  game.reset = function() {
    for (var i = 0; i <= 9; i++) {
      if (game.board[i] === 0) {
        $("#" + i).html("<p></p>");
      } else {
        $("#" + i).html("<p>" + game.translateSign(game.board[i]) + "</p>");
      }
    }
  }

  game.restart = function() {
    game.board = [0, 0, 0, 0, 0, 0, 0, 0, 0];
    game.board[randomAiPosition()] = game.ai;
    game.reset();
  };

  function isWin(board, animate) {
    var move;
    var res = false; //not yet
    for (var i = 0; i < winMoves.length; i++) {
      move = winMoves[i].split('').map(function(num) {
        return parseInt(num)
      });
      if (board[move[0]] !== 0 && board[move[0]] === board[move[1]] && board[move[1]] === board[move[2]]) {
        res = true; //yes
        if (animate === true) {
          $('#' + move[0] + ' p,#' + move[1] + ' p,#' + move[2] + ' p').animate({
            'font-size': "150%"
          }, 1200, function() {
            // Animation complete.
            game.restart();
          });;
        }
        break;
      }
    }
    return res;
  }

  var chooseSide = function(num) {
    game.pl = num;
    game.ai = -num;
  };

  //List possible movements
  function possibleMovements(board) {
    return board.reduce(function(pos, current, idx) {
      if (current === 0) pos.push(idx);
      return pos;
    }, []);
  }

  //Minimax Algorithm
  var Minimax = function(currentBoard, maxDepth, ai) {

    function min(board, depth) {
      if (depth > maxDepth) return 0;
      if (isWin(board)) return 1;
      var movements = possibleMovements(board);
      var newBoard = board.slice();
      var minV = 2;
      var maxV = -2;
      var minMovement;
      for (var i = 0; i < movements.length; i++) {
        newBoard[movements[i]] = -ai;
        maxV = max(newBoard, depth + 1, false);
        if (maxV < minV) {
          minV = maxV;
          minMovement = movements[i];
        }
        newBoard[movements[i]] = 0;
      }
      if (depth === 0) {
        return minMovement;
      }
      return minV * depth;
    }

    function max(board, depth) {
      if (depth > maxDepth) return 0;
      if (isWin(board)) return -1;
      var movements = possibleMovements(board);
      var newBoard = board.slice();
      var minV = 2;
      var maxV = -2;
      var maxMovement;
      for (var i = 0; i < movements.length; i++) {
        newBoard[movements[i]] = ai;
        minV = min(newBoard, depth + 1);
        if (maxV < minV) {
          maxV = minV;
          maxMovement = movements[i];
        }
        newBoard[movements[i]] = 0;
      }

      if (depth === 0) {
        return maxMovement;
      }
      return maxV / depth;
    }
    return max(currentBoard, 0);
  };

  //Get next move using minimax
  function getBestMove() {
    return Minimax(game.board, 5, game.ai);
  }

  //AI turn
  game.cpuPlay = function() {
    var bestMove = getBestMove();
    game.board[bestMove] = game.ai;
    game.refresh();
    isWin(game.board, true);
    var movements = possibleMovements(game.board);
    if (movements.length === 0) {
      setTimeout(function() {
        game.restart();
      }, 1000);

    }
  }

  //Player turn
  game.play = function(pos) {
    if (isWin(game.board, true)) return;
    if (game.board[pos] !== 0) return;
    game.board[pos] = game.pl;
    game.refresh();
    isWin(game.board, true);
    game.cpuPlay();
  };

  //Get next move (x or o)
  game.getMove = function(move) {
    if (move > 0) return 'X';
    else if (move == 0) return ''
    return 'O';
  }

  $(".square").click(function() {
    var pos = $(this).attr("id");
    game.play(pos);
  })

})