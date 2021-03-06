timerStarted = false; 					// initial timer status, page loads with stopped timer
var timerType = "session";
var timerTypeText = "Session";
var secondsOnes;
var secondsTens;
var minutesOnes;
var minutesTens;
var audio = new Audio('http://soundfxnow.com/soundfx/DoorBell.mp3');
function sessionMinus() { 				// reduces the session time by one minute
	if (!timerStarted) {
		var sessionTime = document.getElementById("session-time").innerHTML;
		var num = Number(sessionTime);
		if (num > 1){
			num -= 1;
		}
		document.getElementById("session-time").innerHTML = num;
		document.getElementById("timer-countdown").innerHTML = num;
	}
}

function sessionPlus() {				// increases session time by one minute
	if (!timerStarted) {
		var sessionTime = document.getElementById("session-time").innerHTML;
		var num = Number(sessionTime);
		num += 1;
		document.getElementById("session-time").innerHTML = num;
		document.getElementById("timer-countdown").innerHTML = num;
	}
}

function breakMinus() {					// reduces break time by one minute
	if (!timerStarted) {
		var breakTime = document.getElementById("break-time").innerHTML;
		var num = Number(breakTime);
		if (num > 1) {
			num -= 1;
		} 
		document.getElementById("break-time").innerHTML = num;
	}
}

function breakPlus() {					// increases break time by one minute
	if (!timerStarted) {
		var breakTime = document.getElementById("break-time").innerHTML;
		var num = Number(breakTime);
		num += 1;
		document.getElementById("break-time").innerHTML = num;
	}
}

function toggleTimer() {				// checks timerStarted status and toggles
	if (!timerStarted) {
		startTimer(timerType);
	} else {
		stopTimer();
	}
}

function startTimer(timerType) {					// starts the timer
	timerStarted = true;
	document.getElementById("countdown-type").innerHTML = timerTypeText;
	if (document.getElementById("timer-countdown").innerHTML.length <= 2){
		var time = Number(document.getElementById(timerType + "-time").innerHTML);
		time -= 1;
		document.getElementById("timer-countdown").innerHTML = '<div id="minutes-tens" class="unselectable inline-block">' + Math.floor(time/10) + '</div><div id="minutes-ones" class="unselectable inline-block">' + (time % 10) + '</div>:<div id="seconds-tens" class="unselectable inline-block">5</div><div id="seconds-ones" class="unselectable inline-block">9</div>'
	}
	tickTock();
}

function tickTock() {
	timerInterval = setInterval(countdown, 1000);
}

function countdown() {
   secondsOnes = Number(document.getElementById("seconds-ones").innerHTML);
   secondsTens = Number(document.getElementById("seconds-tens").innerHTML);
   minutesOnes = Number(document.getElementById("minutes-ones").innerHTML);
   minutesTens = Number(document.getElementById("minutes-tens").innerHTML);
   if (secondsOnes > 0) {
   	secondsOnes -= 1;
		document.getElementById("seconds-ones").innerHTML = secondsOnes;
	} else {
	if (secondsTens > 0) {
		secondsTens -= 1;
		document.getElementById("seconds-tens").innerHTML = secondsTens;
		document.getElementById("seconds-ones").innerHTML = 9;
	} else {
	if (minutesOnes > 0) {
		minutesOnes -= 1;
		document.getElementById("minutes-ones").innerHTML = minutesOnes;
		document.getElementById("seconds-tens").innerHTML = 5;
		document.getElementById("seconds-ones").innerHTML = 9;
	} else {
	if (minutesTens > 0) {
		minutesTens -= 1;
		document.getElementById("minutes-tens").innerHTML = minutesTens;
		document.getElementById("minutes-ones").innerHTML = 9;
		document.getElementById("seconds-tens").innerHTML = 5;
		document.getElementById("seconds-ones").innerHTML = 9;
	} else {
	audio.play();
	clearInterval(timerInterval);
	toggleTimerType();
	}
	}
	}	
	} 
}

function stopTimer() {					// stops the timer
	timerStarted = false;
	clearInterval(timerInterval);
}

function toggleTimerType() {			// switches between session and break
	if (timerType == "break") {
		timerType = "session";
		timerTypeText = "Session";
		document.getElementById("timer-countdown").innerHTML = document.getElementById("session-time").innerHTML;
	} else {
		timerType = "break";
		timerTypeText = "Break!";
		document.getElementById("timer-countdown").innerHTML = document.getElementById("break-time").innerHTML;
	}
	startTimer(timerType);
}