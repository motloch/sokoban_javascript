document.addEventListener('DOMContentLoaded', () => {
  const grid = document.querySelector('.grid')
  const scoreDisplay = document.querySelector('#score')

  const width = 8
  const height = 9

  for (const x of Array(width*height).keys()) {
	var foo = document.createElement('DIV')
	grid.appendChild(foo)
  }

  let squares = Array.from(document.querySelectorAll('.grid div'))

  var score = 0
  var currentPosition = 18

  var initial = [
      ['floor', 'floor', 'wall'  , 'wall'      , 'wall' , 'wall' , 'wall' , 'floor'],
      ['wall' , 'wall' , 'wall'  , 'floor'     , 'floor', 'floor', 'wall' , 'floor'],
      ['wall' , 'dock' , 'worker', 'box'       , 'floor', 'floor', 'wall' , 'floor'],
      ['wall' , 'wall' , 'wall'  , 'floor'     , 'box'  , 'dock' , 'wall' , 'floor'],
      ['wall' , 'dock' , 'wall'  , 'wall'      , 'box'  , 'floor', 'wall' , 'floor'],
      ['wall' , 'floor', 'wall'  , 'floor'     , 'dock' , 'floor', 'wall' , 'wall' ],
      ['wall' , 'box'  , 'floor' , 'box_docked', 'box'  , 'box'  , 'dock' , 'wall' ],
      ['wall' , 'floor', 'floor' , 'floor'     , 'dock' , 'floor', 'floor', 'wall' ],
      ['wall' , 'wall' , 'wall'  , 'wall'      , 'wall' , 'wall' , 'wall' , 'wall' ]
    ]

  for (const x of Array(width*height).keys()) {
      squares[x].classList.add(initial[Math.floor(x/width)][x%width])
  }

  //assign functions to KeyCodes
  function control(e) {
    if(e.keyCode === 37) {
      console.log('left')
      move(-1)
    } else if(e.keyCode == 38) {
      move(-width)
    } else if(e.keyCode == 39) {
      move(1)
    } else if(e.keyCode == 40) {
      move(width)
    }
  }
  document.addEventListener('keyup', control)

  function move(shift) {
    var moved = false

    //Move onto a floor tile?
    if(squares[currentPosition + shift].classList.contains('floor')) {
        squares[currentPosition + shift].classList.add('worker')
        squares[currentPosition + shift].classList.remove('floor')
        moved = true
    //Move onto a dock tile?
    } else if(squares[currentPosition + shift].classList.contains('dock')) {
        squares[currentPosition + shift].classList.add('worker_dock')
        squares[currentPosition + shift].classList.remove('dock')
        moved = true
    //Moving a box?
    } else if(squares[currentPosition + shift].classList.contains('box')) {
        //Check we can move the box
        if(squares[currentPosition + 2*shift].classList.contains('floor')) {
            squares[currentPosition + shift].classList.add('worker')
            squares[currentPosition + shift].classList.remove('box')
            squares[currentPosition + 2*shift].classList.add('box')
            squares[currentPosition + 2*shift].classList.remove('floor')
            moved = true
        } else if(squares[currentPosition + 2*shift].classList.contains('dock')) {
            squares[currentPosition + shift].classList.add('worker')
            squares[currentPosition + shift].classList.remove('box')
            squares[currentPosition + 2*shift].classList.add('box_docked')
            squares[currentPosition + 2*shift].classList.remove('dock')
            moved = true
        }
    } else if(squares[currentPosition + shift].classList.contains('box_docked')) {
        //Check we can move the box
        if(squares[currentPosition + 2*shift].classList.contains('floor')) {
            squares[currentPosition + shift].classList.add('worker_dock')
            squares[currentPosition + shift].classList.remove('box_docked')
            squares[currentPosition + 2*shift].classList.add('box')
            squares[currentPosition + 2*shift].classList.remove('floor')
            moved = true
        } else if(squares[currentPosition + 2*shift].classList.contains('dock')) {
            squares[currentPosition + shift].classList.add('worker_dock')
            squares[currentPosition + shift].classList.remove('box_docked')
            squares[currentPosition + 2*shift].classList.add('box_docked')
            squares[currentPosition + 2*shift].classList.remove('dock')
            moved = true
        }
    }

    if(moved) {
        //Draw an empty dock or floor
        if(squares[currentPosition].classList.contains('worker')) {
            squares[currentPosition].classList.add('floor')
            squares[currentPosition].classList.remove('worker')
        } else if(squares[currentPosition].classList.contains('worker_dock')) {
            squares[currentPosition].classList.add('dock')
            squares[currentPosition].classList.remove('worker')
        }
        currentPosition += shift
        score += 1
        scoreDisplay.innerHTML = score
    }

    var gameOver = true
    for (const x of Array(width*height).keys()) {
       if(squares[x].classList.contains('box')) {
        gameOver = false
      }
    }
    if(gameOver) {
        alert('Game over! Total moves: ' + score)
    }

  }

})
