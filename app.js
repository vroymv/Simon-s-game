var buttonColors = ["greed", "red", "yellow", "blue"];

var gamePattern = [];
var userClickedPattern = [];

var selector;
var level = 1;
var started = false;
//Listen for user key press

$(document).on("keypress", function (e) {
  if (e.key == "A" || e.key == "a") {
    if (!started) {
      procedeToGame();
      started = true;
    }
  }
});

function procedeToGame() {
  selector = Math.floor(Math.random() * 4);
  $('#level-title').text('level');
  level++;
  var randColor = buttonColors[selector];

  gamePattern.push(randColor);

  $("#" + randColor)
    .fadeOut(100)
    .fadeIn(100);

  playSound(randColor);
  listenClick(randColor);
}

function listenClick(randColor) {
  $(".btn").click(function () {
    userClickedPattern.push($(this).attr("id"));

    animatePressed(randColor);
    playSound(randColor);
    checkAnswer(userClickedPattern.length-1);
  });
}

function checkAnswer(currentlevel) {
  if (gamePattern[currentlevel] == userClickedPattern[currentlevel]) {
    if(gamePattern.length == userClickedPattern.length){
        setTimeout(function(){
            procedeToGame();
        },1000);
    }
  } else {
    playSound("wrong");
    $(body).addClass("game-over");
    $("#level-title").text("Game Over");
    setTimeout(function () {
      $(body).removeClass("game-over");
    }, 200);
    startOver();
  }
}

function startOver() {
  userClickedPattern = [];
  gamePattern = [];
  started = false;
}

function playSound(color) {
  var audio = new Audio();
  audio.src = "sounds/" + color + ".mp3";
  audio.play();
}

function animatePressed(color) {
  $("#" + color).addClass("pressed");
  setTimeout(function () {
    $("#" + color).removeClass("pressed");
  }, 100);
}
