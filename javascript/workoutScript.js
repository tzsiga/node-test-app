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

function kgRepButtonSetter () {

  // document.getElementById("increaseKgBtn").addEventListener("click", increaseKg);
  // function increaseKg () {
  //   var actualKg = parseFloat($('#setKgH4').val());
  //   actualKg = actualKg + 2.5;
  //   $('#setKgH4').val(actualKg);
  // }

  // document.getElementById("decreaseKgBtn").addEventListener("click", decreaseKg);
  // function decreaseKg () {
  //   var actualKg = parseFloat($('#setKgH4').val());
  //   actualKg = actualKg - 2.5;
  //   $('#setKgH4').val(actualKg);
  //   $("#setKgH4").on("input change", function() { });
  // }

  // document.getElementById("increaseRepBtn").addEventListener("click", increaseRep);
  // function increaseRep () {
  //   var actualRep = parseFloat($('#setRepH4').val());
  //   actualRep = actualRep + 1;
  //   $('#setRepH4').val(actualRep);
  // }

  // document.getElementById("decreaseRepBtn").addEventListener("click", decreaseRep);
  // function decreaseRep () {
  //   var actualRep = parseFloat($('#setRepH4').val());
  //   actualRep = actualRep - 1;
  //   $('#setRepH4').val(actualRep);
  // }

  // document.getElementById("increaseKgBtn").addEventListener("click", increaseKg);
  // function increaseKg () {
  //   var actualKg = parseFloat($('#setKgH4').text());
  //   actualKg = actualKg + 2.5;
  //   $('#setKgH4').html(actualKg);
  // }

  // document.getElementById("decreaseKgBtn").addEventListener("click", decreaseKg);
  // function decreaseKg () {
  //   var actualKg = parseFloat($('#setKgH4').text());
  //   actualKg = actualKg - 2.5;
  //   $('#setKgH4').html(actualKg);
  // }

  // document.getElementById("increaseRepBtn").addEventListener("click", increaseRep);
  // function increaseRep () {
  //   var actualRep = parseFloat($('#setRepH4').text());
  //   actualRep = actualRep + 1;
  //   $('#setRepH4').html(actualRep);
  // }

  // document.getElementById("decreaseRepBtn").addEventListener("click", decreaseRep);
  // function decreaseRep () {
  //   var actualRep = parseFloat($('#setRepH4').text());
  //   actualRep = actualRep - 1;
  //   $('#setRepH4').html(actualRep);
  // }
};