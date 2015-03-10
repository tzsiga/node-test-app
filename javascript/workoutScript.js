function startSessionTimer () {

    var h1 = $('#sessionTimeH5').text(),
    seconds = 0, minutes = 0, hours = 0,
    t;

    function add() {
        seconds++;
        if (seconds >= 60) {
            seconds = 0;
            minutes++;
            if (minutes >= 60) {
                minutes = 0;
                hours++;
            }
        }
        
        var newTime = "WORKOUT TIME: " + (hours ? (hours > 9 ? hours : "0" + hours) : "00") + ":" + (minutes ? (minutes > 9 ? minutes : "0" + minutes) : "00") + ":" + (seconds > 9 ? seconds : "0" + seconds);
        $('#sessionTimeH5').html(newTime);

        timer();
    }

    function timer() {
        t = setTimeout(add, 1000);
    }

    timer();
    //start.onclick = timer;
    
    // clear.onclick = function() {
    //     h1.textContent = "00:00:00";
    //     seconds = 0; minutes = 0; hours = 0;
    // }

};


function workoutSetsSizer () {
    var windowHeight = window.innerHeight;
    var body = $("#workout01Sets");
    body.css("max-height", windowHeight/3.7);
    console.log(windowHeight);
}
