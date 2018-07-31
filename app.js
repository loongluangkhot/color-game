var h1 = document.querySelector("h1")
var rgbTarget_display = document.querySelector("#rgb-target")

var newColours_button = document.querySelector("#menu-new-colours")
var easy_button = document.querySelector("#menu-easy")
var hard_button = document.querySelector("#menu-hard")
var textDisplay = document.querySelector(".text-display")

var cells = document.querySelectorAll(".cell")

var gameMode = "hard"
var rgbValue_target = []
var rgbValues_array = []

function start_game() {
  reset_game()
  rgbValues_array = generateRandomColours(6)
  if (gameMode === "easy") {
    easy_button.classList.add("selected")
    hard_button.classList.remove("selected")
    rgbValue_target = rgbValues_array[randomInt(3)] // return index 0, 1, or 2
    for (var i = 0; i < 6; i++) {
      if (i < 3) {
        console.log("setting colours")
        cells[i].style.backgroundColor = rgbValues_array[i]
      } else {
        cells[i].style.backgroundColor = "#2E2C2F" // body's backgroundColor
      }
    }
  } else {
    easy_button.classList.remove("selected")
    hard_button.classList.add("selected")
    rgbValue_target = rgbValues_array[randomInt(6)] // return index 0, 1, or 2
    for (var i = 0; i < 6; i++) {
      cells[i].style.backgroundColor = rgbValues_array[i]
    }
  }
  rgbTarget_display.textContent = rgbValue_target
}

function randomInt(max_exclusive) {
  return Math.floor(Math.random() * Math.floor(max_exclusive))
}

function generateRandomColours(num) {
  var rgbValues_array = []
  for (var i = 0; i < num; i++) {
    rgbValues_array.push(randomColour())
  }
  return rgbValues_array
}

function randomColour() {
  var rgbValue = []
  for (var i = 0; i < 3; i++) {
    rgbValue.push(randomInt(256))
  }
  return `rgb(${rgbValue[0]}, ${rgbValue[1]}, ${rgbValue[2]})`
}

function addEventHandlers() {
  // event handler for new colours button
  newColours_button.addEventListener("click", function() {
    start_game()
  })
  // event handler for game mode
  easy_button.addEventListener("click", function() {
    if (gameMode !== "easy") {
      gameMode = "easy"
      start_game()
    }
  })
  hard_button.addEventListener("click", function() {
    if (gameMode !== "hard") {
      gameMode = "hard"
      start_game()
    }
  })
  // event handler for each cell
  for (var i = 0; i < cells.length; i++) {
    cells[i].addEventListener("click", function() {
      if (this.style.backgroundColor === rgbValue_target) {
        // win visuals
        textDisplay.textContent = "Correct!"
        newColours_button.textContent = "NEW GAME?"
        h1.style.backgroundColor = rgbValue_target
        for (var j = 0; j < cells.length; j++) {
          cells[j].style.backgroundColor = rgbValue_target
        }
      } else {
        // lose visuals
        textDisplay.textContent = "Try again!"
        this.style.backgroundColor = "#2E2C2F"
      }
    })
  }
}

function reset_game() {
  textDisplay.textContent = ""
  newColours_button.textContent = "NEW COLOURS"
  h1.style.backgroundColor = "#729B79";
}
addEventHandlers()
start_game()