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
  		var nextArrival = "";
  		var minutes = "" ;

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