
alert("About Simon Game : One person is Simon, and the other players follow Simon’s instructions. Standing in front of the group Simon tells the players what they must do. The players must obey all commands that begin with the words “Simon says”. If Simon says, “Simon says touch your nose” then all players must touch their nose. However, if Simon says, “jump” without saying “Simon says” first the players must not jump.If they do jump, that player is out until the next game.");
alert("Instruction\n1.Press any key to Start the Game.\n2.Simon will give only the first signal.\n3.Repeat Simon's signal, and imme- diately add one. In this game, don't wait for Simon to repeat signals!\n4.Repeat the first two signals and add one more.\n5.Continue repeating the signals of the previous sequence and increas- ing that sequence by one. Try to reach the longest sequence of 31!\n6.If you make an error or take more than 5 seconds to play any signal, you'll hear the \"RAZZ\" sound. This means the game is over.")
var buttonColours = ["red", "blue", "green", "yellow"];
var gamePattern = [];
var userClickedPattern = [];

var started = false;
var level = 0;

$(document).keypress(function () {
    if (!started) {
        $("#level-title").text("Level " + level);
        nextSequence();
        started = true;
    }
});


$(".btn").click(function () {
    var userChosenColour = $(this).attr("id");
    userClickedPattern.push(userChosenColour);

    playSound(userChosenColour);
    animatePress(userChosenColour);

    checkAnswer(userClickedPattern.length - 1);
}
);

//1. Create a new function called checkAnswer(), it should take one input with the name currentLevel
function checkAnswer(currentLevel) {

    //3. Write an if statement inside checkAnswer() to check if the most recent user answer is the same as the game pattern. If so then log "success", otherwise log "wrong".
    if (gamePattern[currentLevel] === userClickedPattern[currentLevel]) {

        console.log("success");

        //4. If the user got the most recent answer right in step 3, then check that they have finished their sequence with another if statement.
        if (userClickedPattern.length === gamePattern.length) {

            //5. Call nextSequence() after a 1000 millisecond delay.
            setTimeout(function () {
                nextSequence();
            }, 1000);

        }

    }
    else {
        console.log("wrong");
        var audio = new Audio("sounds/wrong.mp3");
        audio.play();
        $("body").addClass("game-over");
        setTimeout(function () {
            $("body").removeClass("game-over");
        }, 200);
        $("#level-title").text("Game Over!, Press Any Key To Restart");

        startOver();
    }

}

function nextSequence() {
    userClickedPattern = [];

    level++;
    $("#level-title").text("Level " + level);
    var randomNumber = Math.floor(Math.random() * 4);

    var randomChosenColour = buttonColours[randomNumber];
    gamePattern.push(randomChosenColour);

    $("#" + randomChosenColour).fadeIn(100).fadeOut(100).fadeIn(100);

    playSound(randomChosenColour);

}

function playSound(name) {
    var audio = new Audio("sounds/" + name + ".mp3");
    audio.play();
}

function animatePress(currentColour) {
    $("#" + currentColour).addClass("pressed");
    setTimeout(function () {
        $("#" + currentColour).removeClass("pressed");
    }, 100);
}

function startOver() {
    level = 0;
    started = false;
    gamePattern = [];
}