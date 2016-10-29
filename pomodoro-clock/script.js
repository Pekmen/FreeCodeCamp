$(document).ready(function() {

  var clockInterval; // id used in clearInterval() during pauses
  var paused = true;
  var breakTime = 5;
  var sessionTime = 25;
  var minutes = 25
  var seconds = 0;
  var currentTimeType = "Session";
  var display = $("#time");
  var typeDescriptor = $("#stopwatch-type");
  var alarm = $("audio")[0];

  /*
   Calculates minutes and seconds, toggles time after 0 is reached
  */
  function startTimer(duration, display) {
    var timer = duration;

    clockInterval = setInterval(function() {
      minutes = parseInt(timer / 60, 10);
      seconds = parseInt(timer % 60, 10);
      minutes = minutes < 10 ? "0" + minutes : minutes;
      seconds = seconds < 10 ? "0" + seconds : seconds;
      display.text(minutes + ":" + seconds);

      if (--timer < 0) {
        alarm.play();

        // returns new time after reset
        timer = toggleTimeType();

      }
    }, 1000);
  }

  /*
   Toggles descriptor name and returns new time after reset
  */
  function toggleTimeType() {
    if (currentTimeType == "Session") {
      currentTimeType = "Break";
      typeDescriptor.text("Break");
      minutes = breakTime;
      seconds = 0;
    } else {
      currentTimeType = "Session";
      typeDescriptor.text("Session");
      minutes = sessionTime;
      seconds = 0;
    }
    return (60 * minutes);
  }

  /*
   Updates minutes for Break and Session controlls after buttons are pressed
  */
  function updateControlls() {
    $(".break-length").text(breakTime);
    $(".session-length").text(sessionTime);
  }

  /*
    Updates countdown time on clock display and resets time.
  */
  function updateDisplayTime(timeType) {
    if (timeType == "Session") {
      $("#time").text(sessionTime);
      minutes = sessionTime;
      seconds = 0;
    } else if (timeType == "Break") {
      $("#time").text(breakTime);
      minutes = breakTime;
      seconds = 0;
    }
  };

  /* plus/minus buttons */
  $("#break-len-plus").click(function() {
    if (paused) {
      breakTime++;
      updateControlls();
      if (currentTimeType == "Break") {
        updateDisplayTime("Break");
      }
    }
  });

  $("#break-len-minus").click(function() {
    if (breakTime > 1 && paused) {
      breakTime--;
      updateControlls();
      if (currentTimeType == "Break") {
        updateDisplayTime("Break");
      }
    }
  });
  
  $("#sess-len-plus").click(function() {
    if (paused) {
      sessionTime++;
      updateControlls();
      typeDescriptor.text("Session");
      currentTimeType = "Session";
      updateDisplayTime("Session");

    }
  });

  $("#sess-len-minus").click(function() {
    if (sessionTime > 1 && paused) {
      sessionTime--;
      updateControlls();
      typeDescriptor.text("Session");
      currentTimeType = "Session";
      updateDisplayTime("Session");
    }
  });

  $("#clock").click(function() {

    // continues paused time
    if (paused) {
      startTimer(60 * minutes + seconds - 1, display);
      paused = false;
    }

    // clears timer
    else {
      clearInterval(clockInterval);
      paused = true;
    }
  });
});