$(document).ready(function() {

	  // Initialize Firebase
  var config = {
    apiKey: "AIzaSyC_TmyNfXwAjIYRKNxwF_dPmkpjlvds2_I",
    authDomain: "train-6ed64.firebaseapp.com",
    databaseURL: "https://train-6ed64.firebaseio.com",
    projectId: "train-6ed64",
    storageBucket: "train-6ed64.appspot.com",
    messagingSenderId: "657784193710"
  };
  firebase.initializeApp(config);

  var database = firebase.database();

  $("form").submit(function(){

  		// Makes sure the submit button does not refresh page
  		event.preventDefault();

  		var trainName = $("#input-train").val().trim();
  		var destinationName = $("#input-destination").val().trim();
  		var timeStart = $("#input-time").val().trim();
  		var frequency = $("#input-frequency").val().trim();


      // time conversion
      var firstTimeStart = moment(timeStart, 'hh:mm').subtract(1,"years");
      console.log("firstTimeStart: " + firstTimeStart);

      var diffTime = moment().diff(moment(firstTimeStart), "minutes");
      console.log("diffTime: " + diffTime);

      var tRemainder = diffTime % frequency;
      console.log("tRemainder: " + tRemainder);

      var minutes = frequency - tRemainder;
      console.log("minutes: " + minutes);
      var nextArrival = moment().add(minutes,"minutes");
      console.log("nextArrival: " + nextArrival);
      nextArrival = moment(nextArrival).format("hh:mm A");
      console.log("nextArrival again: " + nextArrival);

  		database.ref().push({
  			trainName: trainName,
  			destinationName: destinationName,
  			timeStart: timeStart,
  			frequency: frequency,
  			nextArrival: nextArrival,
  			minutes: minutes
  		});

  		$("#input-train").val("");
  		$("#input-destination").val("");
  		$("#input-time").val("");
  		$("#input-frequency").val("");
  });

  database.ref().on("child_added",function(childSnapshot, prevChildKey){

  	console.log(childSnapshot.val());

  		$("tbody").append("<tr><td>" + childSnapshot.val().trainName 
  			+ "</td><td>" + childSnapshot.val().destinationName
  			+ "</td><td>" + childSnapshot.val().frequency 
  			+ "</td><td>" + childSnapshot.val().nextArrival
  			+ "</td><td>" + childSnapshot.val().minutes
  			+ "</td></tr>");


  });



})