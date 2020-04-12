var buttonColours=["red","blue","green","yellow"];

var gamePattern = [];

var userClickedPattern = [];

var started = false;

var level = 0;


$(document).on("keydown",function() {

  if (!started)        //This means that if started is false or not true then we enter this conditional statement.
  {
    $("#level-title").text("Level "+level);
    nextSequence();
    started = true;
  }

});


$(".btn").on("click",function() {
  var userChosenColour = $(this).attr("id");     //We use $(this) to select the button we have clicked on and we use attr to gwt its id attribute
  userClickedPattern.push(userChosenColour);     //We add every colour we click in this array and this array is used to compare it to gamePattern's same element.

  playSound(userChosenColour);
  animatePress(userChosenColour);

  checkAnswer(userClickedPattern.length-1);
});


function checkAnswer(currentLevel)
{

  if (gamePattern[currentLevel] === userClickedPattern[currentLevel])   //This check the current level which is defined above.
  {
    if(gamePattern.length === userClickedPattern.length)  //To check if we have reached the end of the array where last elements have matched and hence the foloowing code is carried out.
    {
      setTimeout (function()
      {
        nextSequence();
      },1000);
    }   // Here no else statement is added because if both arrays are not equal in length then we go back to click function.
  }
  else
    {
      playSound("wrong");
      $("body").addClass("game-over");
      $("#level-title").text("Game Over, Press Any Key to Restart");

      setTimeout(function () {
        $("body").removeClass("game-over");
      }, 200);

      startover();

    }
}




function nextSequence() {

  userClickedPattern = [];  //As user has to rematch the pattern everytime the

  level++;                     //We increment level here so that it gets incremented every time nextSequence() is called.

  $("#level-title").text("Level "+level);   //We use this so the incremented level can be displayed on the h1

  var randomNumber = Math.floor(Math.random() * 4);
  var randomChosenColour = buttonColours[randomNumber];
  gamePattern.push(randomChosenColour);

  $("#"+randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);   // used to animate the flash feeling

  playSound(randomChosenColour);
}


function playSound(name) {
  var audio = new Audio("sounds/" + name + ".mp3");     //used to play our audio
  audio.play();
}


function animatePress(currentColour) {
  var pressedButton = $("#"+currentColour);
  $(pressedButton).addClass("pressed");
  setTimeout(function() {      //This javascript method can be used to introduce time delay or timeout
    $(pressedButton).removeClass("pressed");
  }, 100);
}


function startover() {

  level=0;
  gamePattern = [];
  started = false;

}
