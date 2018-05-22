////////////////////////////////////////////////////////////////////
// RANDOM LETTERS AND USER INPUT AND OUTPUT FUNCTIONALITY
/////////////////////////////////////////////////////////////////////
let out = $("#out");

function generateRandomLetters() {
  let randomNum = Math.floor(Math.random() * 15) + 5;
  console.log(randomNum);
  let text = "";
  let possible = "abcdefghijklmnopqrstuvwxyz";

  for (let i = 0; i < randomNum; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }

  out.html(text);
  console.log(text);

  return text;
}

let input = $(".userInput");
let results = $(".results");
let output = "";

function getUserInput() {
  console.log("output", output);
  output = input.val();
  results.append(`${output} `);
  // console.log(output);
  return output;
}

input.on("keydown", function(e) {
  if (e.keyCode == 13) {
    getUserInput();
    input.val("");
  }
});

///////////////////////////////////////////////////////////////
// TIMER function
//////////////////////////////////////////////////////////////
const btnCountDown = document.getElementById("count-down-btn");
const timePanel = document.getElementById("count-down-btn");
const snd1 = document.getElementById("audiofile");
const snd2 = document.getElementById("audiofile2");
const music = document.getElementById("music");
// const video = document.getElementById("video");
const sally = document.getElementById("sally");
let round = document.getElementById("round");

// ************ TIMER LOGIC ************
let newTimer = false;
let menuwrap = $("#menuwrap");
let overlay = $("#overlay");
let startTimer = function(start, end, numOfIterations) {
  let currentTime = start,
    minutes,
    seconds;
  let counter = 1;
  let round = 1;
  let timer = setInterval(function() {
    minutes = parseInt(currentTime / 60, 10);
    seconds = parseInt(currentTime % 60, 10);
    minutes = minutes < 10 ? "0" + minutes : minutes;
    seconds = seconds < 10 ? "0" + seconds : seconds;
    timePanel.textContent = minutes + ":" + seconds;

    if (currentTime > end) {
      currentTime--;
    } else if (currentTime < end) {
      currentTime++;
    } else if (currentTime === end && counter < numOfIterations) {
      // document.querySelector("body").style.backgroundColor = colorChange();
      counter++;

      currentTime = start;
      // round.innerHTML = "Round: " + counter;
      console.log("repeating timer, round number ", counter);
    } else if (currentTime === end && counter === numOfIterations) {
      // sally.pause();
      // overlay.css({
      //   display: "flex"
      // });
      // menuwrap.css({ display: "block" });

      clearInterval(timer);
      newTimer = newTimer ? false : true;
      console.log("should I start a new timer? ", newTimer);
      if (newTimer) {
        round.innerHTML = "Round:" + counter;

        startTimer(1, 4, 1);
        if (startTimer) {
          generateRandomLetters();

          // sally.play();
        }
      }

      if (currentTime - 1 == end) {
        snd2.play();
      }
    } else if (currentTime === end && counter >= numOfIterations) {
      overlay.css({
        display: "flex"
      });
      menuwrap.css({ display: "block" });
    }

    if (currentTime < 3 && currentTime >= end) {
      snd1.play();
    }
    if (currentTime == end && newTimer == true) {
      snd2.play();
    }
  }, 1000);
};
// ************ EVENT LISTENERS ************
btnCountDown.addEventListener("click", function() {
  startTimer(3, 0, 1);
});

(function closeOverlay() {
  const closebtn = $(".closebtn");
  overlay.on("click", function() {
    if (menuwrap.css("display", "block")) {
      menuwrap.css({ display: "none", left: "100%" });
      overlay.css("display", "none");
    }
  });

  closebtn.eq(0).on("click", function() {
    //hier muss bei closebtn eine Indexzahl angegeben werden, weil es ein Array ist,
    // weil es eben eine Klasse ist und die nicht unique ist!
    menuwrap.css({ display: "none", left: "100%" });
    overlay.css("display", "none");
  });
})();
