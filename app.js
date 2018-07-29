var h1 = document.querySelector("h1")
var rgbValue_display = document.querySelectorAll(".rgb-value")

var newColours_button = document.querySelector("#menu-new-colours")
var easy_button = document.querySelector("#menu-easy")
var hard_button = document.querySelector("#menu-hard")
var textDisplay = document.querySelector(".text-display")

var cells = document.querySelectorAll(".cell")

var gameMode = "easy"
var rgbValue_target = []
var rgbValues_array = []

function start_game() {
  console.log("start game")
  reset_game()
  rgbValues_array = sixRandomColours()
  if (gameMode === "easy") {
    console.log(gameMode)
    rgbValue_target = rgbValues_array[randomInt(3)] // return index 0, 1, or 2
    for (var i = 0; i < 6; i++) {
      if (i < 3) {
        console.log("setting colours")
        cells[i].style.background = `rgb(${rgbValues_array[i][0]},${rgbValues_array[i][1]},${rgbValues_array[i][2]})`
      } else {
        cells[i].style.background = "#2E2C2F" // body's backgroundColor
      }
    }
  } else {
    console.log(gameMode)
    rgbValue_target = rgbValues_array[randomInt(6)] // return index 0, 1, or 2
    for (var i = 0; i < 6; i++) {
      cells[i].style.background = `rgb(${rgbValues_array[i][0]},${rgbValues_array[i][1]},${rgbValues_array[i][2]})`
    }
  }
  for (var i = 0; i < 3; i++) {
    rgbValue_display[i].textContent = rgbValue_target[i]
  }
}

function randomInt(max_exclusive) {
  return Math.floor(Math.random() * Math.floor(max_exclusive))
}

function sixRandomColours() {
  let rgbValues_array = []
  for (var i = 0; i < 6; i++) {
    let rgbValue = []
    for (var j = 0; j < 3; j++) {
      rgbValue.push(randomInt(256))
    }
    rgbValues_array.push(rgbValue)
  }
  return rgbValues_array
}

function addEventHandlers() {
  // event handler for new colours button
  newColours_button.addEventListener("click", function() {
    start_game()
  })
  // event handler for game mode
  easy_button.addEventListener("click", function() {
    if (gameMode !== "easy") {
      easy_button.classList.add("selected")
      hard_button.classList.remove("selected")
      gameMode = "easy"
      start_game()
    }
  })
  hard_button.addEventListener("click", function() {
    if (gameMode !== "hard") {
      easy_button.classList.remove("selected")
      hard_button.classList.add("selected")
      gameMode = "hard"
      start_game()
    }
  })
  // event handler for each cell
  for (var i = 0; i < cells.length; i++) {
    cells[i].addEventListener("click", function() {
      console.log("clicked!")
      if (compareColours(this.style.background)) {
        // win visuals
        textDisplay.textContent = "Correct!"
        h1.style.background = `rgb(${rgbValue_target[0]},${rgbValue_target[1]},${rgbValue_target[2]})`
        for (var j = 0; j < cells.length; j++) {
          cells[j].style.background = `rgb(${rgbValue_target[0]},${rgbValue_target[1]},${rgbValue_target[2]})`
        }
      } else {
        // lose visuals
        textDisplay.textContent = "Try again!"
        this.style.background = "#2E2C2F"
      }
    })
  }
}

function compareColours(colourStr) {
  console.log(colourStr)
  console.log(`rgb(${rgbValue_target[0]}, ${rgbValue_target[1]}, ${rgbValue_target[2]})`)
  return colourStr === `rgb(${rgbValue_target[0]}, ${rgbValue_target[1]}, ${rgbValue_target[2]})`
}

function reset_game() {
  textDisplay.textContent = ""
  h1.style.background = "#729B79";
}
start_game()
addEventHandlers()