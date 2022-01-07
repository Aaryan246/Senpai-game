var gamePattern = [];
var userClickedPattern = [];
var buttonColours = ["red","blue","green","yellow"];

var gameActive = false;
var level = 0;

$(document).keypress(function(){
  if (!gameActive){
    $("#level-title").text("Level " + level);
    nextSequence();
    gameActive = true;
  }
});

$(".btn").click(function(){

  var userChosenColour = $(this).attr('id');
  userClickedPattern.push(userChosenColour);

  playSound(userChosenColour);
  animatePress(userChosenColour);

  checkAnswer(userClickedPattern.length-1);
});

function checkAnswer(currentLevel){

  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]){
    console.log("success");

    if (gamePattern.length === userClickedPattern.length){

      setTimeout(function(){
        nextSequence();
      },1000);
    }
  }

  else {
    var overSound = new Audio("sounds/wrong.mp3");
    overSound.play();
    $("body").addClass("game-over");
    setTimeout(function(){
      $("body").removeClass("game-over");
    },200);
    $("#level-title").text("Game Over, Press Any Key to Restart");
    startOver();
  }

}

function nextSequence(){

  userClickedPattern = [];

  level++;
  $("#level-title").text("Level " + level);

  var randomNumber = Math.floor(Math.random()*4);
  var randomChosenColour = buttonColours[randomNumber];

  gamePattern.push(randomChosenColour);

  playSound(randomChosenColour);

  $("#" + randomChosenColour).fadeOut(100).fadeIn(100);

}

function playSound(name){
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(colour){
  $("#" + colour).addClass("pressed");
  setTimeout(function(){
    $("#" + colour).removeClass("pressed");
  },100);
}

function startOver(){
  level = 0;
  gamePattern = [];
  gameActive = false;
}
