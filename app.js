document.addEventListener('DOMContentLoaded', () => {
  const grid = document.querySelector('.grid')
  const scoreDisplay = document.querySelector('#score')
  var score = 0
	var level = 1

  function initialize(lvl) {
		//Remove old game if there was one
		squares = Array.from(document.querySelectorAll('.grid div'))
		squares.forEach(square => grid.removeChild(square))	

		//Load info
		width = level_info[level][0]
		height = level_info[level][1]
		currentPosition = level_info[level][2]
		initial = level_info[level][3]

		//Create the grid
		grid.style.width = 32*width + "px";
		grid.style.height = 32*height + "px";
		for (const x of Array(width*height).keys()) {
			var foo = document.createElement('DIV')
			grid.appendChild(foo)
		}

		squares = Array.from(document.querySelectorAll('.grid div'))

		for (const x of Array(width*height).keys()) {
			squares[x].classList.add(initial[Math.floor(x/width)][x%width])
		}
	}

	initialize(level)

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
        squares[currentPosition + shift].classList.add('guy')
        squares[currentPosition + shift].classList.remove('floor')
        moved = true
    //Move onto a dock tile?
    } else if(squares[currentPosition + shift].classList.contains('dock')) {
        squares[currentPosition + shift].classList.add('guy_in')
        squares[currentPosition + shift].classList.remove('dock')
        moved = true
    //Moving a box?
    } else if(squares[currentPosition + shift].classList.contains('box')) {
        //Check we can move the box
        if(squares[currentPosition + 2*shift].classList.contains('floor')) {
            squares[currentPosition + shift].classList.add('guy')
            squares[currentPosition + shift].classList.remove('box')
            squares[currentPosition + 2*shift].classList.add('box')
            squares[currentPosition + 2*shift].classList.remove('floor')
            moved = true
        } else if(squares[currentPosition + 2*shift].classList.contains('dock')) {
            squares[currentPosition + shift].classList.add('guy')
            squares[currentPosition + shift].classList.remove('box')
            squares[currentPosition + 2*shift].classList.add('box_in')
            squares[currentPosition + 2*shift].classList.remove('dock')
            moved = true
        }
    } else if(squares[currentPosition + shift].classList.contains('box_in')) {
        //Check we can move the box
        if(squares[currentPosition + 2*shift].classList.contains('floor')) {
            squares[currentPosition + shift].classList.add('guy_in')
            squares[currentPosition + shift].classList.remove('box_in')
            squares[currentPosition + 2*shift].classList.add('box')
            squares[currentPosition + 2*shift].classList.remove('floor')
            moved = true
        } else if(squares[currentPosition + 2*shift].classList.contains('dock')) {
            squares[currentPosition + shift].classList.add('guy_in')
            squares[currentPosition + shift].classList.remove('box_in')
            squares[currentPosition + 2*shift].classList.add('box_in')
            squares[currentPosition + 2*shift].classList.remove('dock')
            moved = true
        }
    }

    if(moved) {
        //Draw an empty dock or floor
        if(squares[currentPosition].classList.contains('guy')) {
            squares[currentPosition].classList.add('floor')
            squares[currentPosition].classList.remove('guy')
        } else if(squares[currentPosition].classList.contains('guy_in')) {
            squares[currentPosition].classList.add('dock')
            squares[currentPosition].classList.remove('guy')
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
        alert('Well done! Total moves: ' + score)
				level += 1
				initialize(level)
    }

  }

})
