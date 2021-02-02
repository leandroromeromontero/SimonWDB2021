var buttonColours = ["red", "green", "blue", "yellow"]; //array con colores del juego
var gamePattern = []; //array que se va llenando con los colores random que genere la funcion
var userClickedPattern = []; //array que va guardando los colores clickeados por el usuario
var started = false; //booleano que permite saber si el juego comenzó
var level = -1; //arranca en -1 asi toma el primer nivel como level 0

$(document).keypress(function() {
  if (!started) {

    $("#level-title").text("Level " + level);
    nextSequence();
    started = true;

  }
});

$(".btn").click( function() {

  var userChosenColour = $(this).attr("id"); //this permite devolver el id del elemento que desencadeno el evento
  userClickedPattern.push(userChosenColour);
  playSound(userChosenColour);
  animatePress(userChosenColour);
  checkAnswer(userClickedPattern.length - 1);


});

function nextSequence() {
  userClickedPattern = [];
  level++;

  $("#level-title").text("Level " + level);

  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  started = true;
  gamePattern.push(randomChosenColour);
  $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);
  playSound(randomChosenColour);

}

function playSound(name) //funcion que reproduce sonido cuando el usuario hace click en un boton
{
  var audio = new Audio("sounds/" + name + ".mp3");
  audio.play();
}

function animatePress(currentColour) //funcion que anima el boton que clickea el usuario
{

  $("#" + currentColour).addClass("pressed");
  setTimeout(function() {
    $("#" + currentColour).removeClass('pressed');
  }, 100);
}

function checkAnswer(currentLevel) {

  if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {

      console.log("success");

    if (userClickedPattern.length === gamePattern.length){

        setTimeout(function () {
          nextSequence();
        }, 1000);

      }

    } else {

      console.log("wrong");
      playSound("wrong");
      $("body").addClass("game-over");
      setTimeout(function() {
        $("body").removeClass('game-over');
      }, 200);
      $("#level-title").text("Game Over, Press Any Key to Restart");
      startOver();
      $(document).keypress(function() {
        startOver();
        if (!started) {

          $("#level-title").text("Level " + level);
          nextSequence();
          started = true;

        }
      });
    }

}

function startOver(){

  level = -1;
  gamePattern = [];
  started = false;
}
