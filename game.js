var Tetris = function (parentElement) {

  var board = parentElement,
    scoreTag = document.getElementById("score"),
    canvasOffset = {}
  canvasOffset.x = 200,
    canvasOffset.y = 2;

  var score,
    shape,
    delay,
    interval,
    context,
    queue,
    gameOver,
    boardState;

  let rng_num = 3

  var getShadowPos = function () {
    var y = shape.corner.y;
    var x = shape.corner.y;
    while (noOverlap()) {
      y = ++shape.corner.y;
    }
    --y;
    shape.corner.y = x;
    return y;
  }

  var createShape = function () {
    var shapeSkeletons = [{
        size: 4,
        cells: [{
          y: Math.floor(Math.random() * rng_num),
          x: Math.floor(Math.random() * rng_num)
        }, {
          y: Math.floor(Math.random() * rng_num),
          x: Math.floor(Math.random() * rng_num)
        }, {
          y: Math.floor(Math.random() * rng_num),
          x: Math.floor(Math.random() * rng_num)
        }, {
          y: Math.floor(Math.random() * rng_num),
          x: Math.floor(Math.random() * rng_num)
        }],
        color: "red"
      },
      {
        size: 3,
        cells: [{
          y: Math.floor(Math.random() * rng_num),
          x: Math.floor(Math.random() * rng_num)
        }, {
          y: Math.floor(Math.random() * rng_num),
          x: Math.floor(Math.random() * rng_num)
        }, {
          y: Math.floor(Math.random() * rng_num),
          x: Math.floor(Math.random() * rng_num)
        }, {
          y: Math.floor(Math.random() * rng_num),
          x: Math.floor(Math.random() * rng_num)
        }],
        color: "green"
      },
      {
        size: 3,
        cells: [{
          y: Math.floor(Math.random() * rng_num),
          x: Math.floor(Math.random() * rng_num)
        }, {
          y: Math.floor(Math.random() * rng_num),
          x: Math.floor(Math.random() * rng_num)
        }, {
          y: Math.floor(Math.random() * rng_num),
          x: Math.floor(Math.random() * rng_num)
        }, {
          y: Math.floor(Math.random() * rng_num),
          x: Math.floor(Math.random() * rng_num)
        }],
        color: "blue"
      },
      {
        size: 2,
        cells: [{
          y: Math.floor(Math.random() * rng_num),
          x: Math.floor(Math.random() * rng_num)
        }, {
          y: Math.floor(Math.random() * rng_num),
          x: Math.floor(Math.random() * rng_num)
        }, {
          y: Math.floor(Math.random() * rng_num),
          x: Math.floor(Math.random() * rng_num)
        }, {
          y: Math.floor(Math.random() * rng_num),
          x: Math.floor(Math.random() * rng_num)
        }],
        color: "purple"
      },
      {
        size: 3,
        cells: [{
          y: Math.floor(Math.random() * rng_num),
          x: Math.floor(Math.random() * rng_num)
        }, {
          y: Math.floor(Math.random() * rng_num),
          x: Math.floor(Math.random() * rng_num)
        }, {
          y: Math.floor(Math.random() * rng_num),
          x: Math.floor(Math.random() * rng_num)
        }, {
          y: Math.floor(Math.random() * rng_num),
          x: Math.floor(Math.random() * rng_num)
        }],
        color: "magenta"
      },
      {
        size: 3,
        cells: [{
          y: Math.floor(Math.random() * rng_num),
          x: Math.floor(Math.random() * rng_num)
        }, {
          y: Math.floor(Math.random() * rng_num),
          x: Math.floor(Math.random() * rng_num)
        }, {
          y: Math.floor(Math.random() * rng_num),
          x: Math.floor(Math.random() * rng_num)
        }, {
          y: Math.floor(Math.random() * rng_num),
          x: Math.floor(Math.random() * rng_num)
        }],
        color: "orange"
      },
      {
        size: 3,
        cells: [{
          y: Math.floor(Math.random() * rng_num),
          x: Math.floor(Math.random() * rng_num)
        }, {
          y: Math.floor(Math.random() * rng_num),
          x: Math.floor(Math.random() * rng_num)
        }, {
          y: Math.floor(Math.random() * rng_num),
          x: Math.floor(Math.random() * rng_num)
        }, {
          y: Math.floor(Math.random() * rng_num),
          x: Math.floor(Math.random() * rng_num)
        }],
        color: "cyan"
      }
    ];
    var newShape = shapeSkeletons[Math.floor(Math.random() * shapeSkeletons.length)];
    newShape.storable = true;
    newShape.corner = {};
    newShape.corner.y = 0;
    if (newShape.size == 2) {
      newShape.corner.x = 4;
    } else {
      newShape.corner.x = 3;
    }
    if (newShape.size == 4) {
      --newShape.corner.y;
    }
    return newShape;
  }

  var rotateCW = function () {
    shape.storable = false;
    for (var i = 0; i < 4; ++i) {
      var y = shape.cells[i].x;
      var x = shape.size - 1 - shape.cells[i].y;
      shape.cells[i].y = y;
      shape.cells[i].x = x;
    }
    if (checkBorders() && noOverlap()) {
      render();
      return true;
    } else if (!checkBorders()) {
      rotateCCW();
      if (shape.corner.x < 0) {
        ++shape.corner.x;
        if (!rotateCW()) {
          --shape.corner.x;
          return false;
        } else {
          return true;
        }
      } else {
        --shape.corner.x;
        if (!rotateCW()) {
          ++shape.corner.x;
          return false;
        } else {
          return true;
        }
      }
    } else {
      rotateCCW();
      render();
      return false;
    }
  }

  var rotateCCW = function () {
    shape.storable = false;
    for (var i = 0; i < 4; ++i) {
      var y = shape.size - 1 - shape.cells[i].x;
      var x = shape.cells[i].y;
      shape.cells[i].y = y;
      shape.cells[i].x = x;
    }
    if (checkBorders() && noOverlap()) {
      render();
      return true;
    } else if (!checkBorders()) {
      rotateCW();
      if (shape.corner.x < 0) {
        ++shape.corner.x;
        if (!rotateCCW()) {
          --shape.corner.x;
          return false;
        } else {
          return true;
        }
      } else {
        --shape.corner.x;
        if (!rotateCCW()) {
          ++shape.corner.x;
          return false;
        } else {
          return true;
        }
      }
    } else {
      rotateCW();
      render();
      return false;
    }
  }
  var drop = function () {
    while (noOverlap()) {
      ++shape.corner.y;
    }
    --shape.corner.y;
    saveShape();
    setTimeout(function () {
      clearRows();
    }, 0);
    shape = queue.shift();
    queue.push(createShape());
    render();
  }

  var checkBorders = function () {
    for (var i = 0; i < 4; ++i) {
      var posX = shape.cells[i].x + shape.corner.x;
      var posY = shape.cells[i].y + shape.corner.y;
      if (posX >= 10 || posX < 0) {
        return false;
      }
    }
    return true;
  }

  var noOverlap = function () {
    for (var i = 0; i < 4; ++i) {
      var posX = shape.cells[i].x + shape.corner.x;
      var posY = shape.cells[i].y + shape.corner.y;
      if (posY >= 20 || (posY >= 0 && boardState[posY][posX].occupied)) {
        return false;
      }
    }
    return true;
  }

  var clearRows = function () {
    var scoreToAdd = 10;
    for (var y = 0; y < 20; ++y) {
      var flag = true;
      for (var x = 0; x < 10; ++x) {
        if (boardState[y][x].occupied == false)
          flag = false;
      }
      if (flag) {
        boardState.splice(y, 1);
        boardState.unshift([])
        for (var j = 0; j < 10; ++j) {
          boardState[0][j] = {
            "occupied": false,
            "color": "white"
          };
        }
        score += scoreToAdd;
        scoreToAdd += 10;
        console.log(score)
        scoreTag.innerText = score
        if (delay > 80) {
          delay -= 5;
          clearInterval(interval);
          interval = setInterval(tick.bind(this), delay);
        }
      }
    }
  }

  var moveLeft = function () {
    shape.corner.x -= 1;
    if (checkBorders() && noOverlap()) {
      render();
      return true;
    } else {
      shape.corner.x += 1;
      return false;
    }
  }

  var moveRight = function () {
    shape.corner.x += 1;
    if (checkBorders() && noOverlap()) {
      render();
      return true;
    } else {
      shape.corner.x -= 1;
      return false;
    }
  }

  var drawShape = function (shape, posX, posY, border, color) {
    if (color == undefined) {
      color = shape.color;
    }
    if (posX == undefined || posY == undefined) {
      var xStart = shape.corner.x * 40 + canvasOffset.x;
      var yStart = shape.corner.y * 40 + canvasOffset.y;
    } else {
      var xStart = posX;
      var yStart = posY;
    }
    for (var i = 0; i < 4; ++i) {
      posY = yStart + shape.cells[i].y * 40;
      posX = xStart + shape.cells[i].x * 40;
      drawSquare(posX, posY, color, border);
    }
  }

  var drawSquare = function (posX, posY, color, border) {
    if (border == undefined) {
      border = true;
    }
    context.beginPath();
    context.fillStyle = color;
    context.fillRect(posX, posY, 40, 40);
    if (border) {
      context.rect(posX, posY, 40, 40);
    }
    context.stroke();
  }

  var render = function () {
    context.clearRect(0, 0, board.width, board.height);
    context.lineWidth = "5";

    //render piece shadow
    var y_pos = getShadowPos() * 40 + canvasOffset.y;
    var x_pos = shape.corner.x * 40 + canvasOffset.x;
    drawShape(shape, x_pos, y_pos, false, '#DDD');
    //draw stationary pieces
    for (var y = 0; y < boardState.length; ++y) {
      for (var x = 0; x < boardState[y].length; ++x) {
        if (boardState[y][x].occupied === true) {
          var color = boardState[y][x].color;
          posY = canvasOffset.y + y * 40;
          posX = canvasOffset.x + x * 40;
          drawSquare(posX, posY, color);
        }
      }
    }
    //draw current shape
    drawShape(shape);
    //draw shapes in queue;
    context.lineWidth = 1;
    for (var x = 0; x < 10; ++x) {
      context.beginPath();
      context.moveTo(canvasOffset.x + x * 40, canvasOffset.y);
      context.lineTo(canvasOffset.x + x * 40, canvasOffset.y + 800);
      context.stroke();
    }
    for (var y = 0; y < 20; ++y) {
      context.beginPath();
      context.moveTo(canvasOffset.x, canvasOffset.y + y * 40);
      context.lineTo(canvasOffset.x + 400, canvasOffset.y + y * 40);
      context.stroke();
    }
    if (gameOver) {
      alert('Game Over')
    }
    context.stroke();
    //draw board rectangle
    context.beginPath();
    var posY = canvasOffset.y;
    var posX = canvasOffset.x;
    context.rect(posX, posY, 400, 800);
    context.stroke();
  }

  var saveShape = function () {
    for (var i = 0; i < 4; ++i) {
      if (shape.cells[i] != undefined) {
        console.log(shape.cells[i])
        var posY = shape.corner.y + shape.cells[i].y;
        var posX = shape.corner.x + shape.cells[i].x;
        if (shape.color != undefined) {
          boardState[posY][posX].color = shape.color;
          boardState[posY][posX].occupied = true;
        }

      }
    }
  }

  var tick = function () {
    ++shape.corner.y;
    if (!checkBorders() || !noOverlap()) {
      --shape.corner.y;
      saveShape();
      clearRows();
      shape = queue.shift();
      queue.push(createShape());
      if (!noOverlap()) {
        gameOver = true;
        clearInterval(interval);
      }
    }
    render();
  }




  window.onkeydown = function (e) {
    var code = e.keyCode ? e.keyCode : e.which;
    console.log(code)
    if (!gameOver) {
      switch (code) {
        case 32:
          drop();
          e.preventDefault();
          break;
        case 37:
          moveLeft();
          e.preventDefault();
          break;
        case 68:
          rotateCW();
          e.preventDefault();
          break;
        case 39:
          moveRight();
          e.preventDefault();
          break;
        case 65:
          rotateCCW();
          e.preventDefault();
          break;
        case 40:
          tick();
          e.preventDefault();
          break;
      }
    }
  }

  return {
    start: function () {
      boardState = [];
      if (interval)
        clearInterval(interval);
      for (var y = 0; y < 20; ++y) {
        boardState[y] = [];
        for (var x = 0; x < 20; ++x)
          boardState[y][x] = {
            "occupied": false,
            "color": "white"
          };
      }
      gameOver = false;
      queue = [];
      queue.push(createShape());
      queue.push(createShape());
      queue.push(createShape());
      score = 0;
      shape = createShape();
      delay = 400;
      interval = setInterval(tick.bind(this), delay);
      board.width = 800;
      board.height = 804;
      context = board.getContext("2d");
      render();
    }
  }
}

var tetris = Tetris(document.getElementById("tetrisCanvas"));
tetris.start();
var restart = document.getElementById("restart");

restart.onclick = function () {
  tetris.start()
}