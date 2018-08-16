
  var nextTrain=0;
  var minutesAway=0;
  var firstTrain="00:01"
  var trainTimes=[];
  var allTrainTimes=[];
// console.log(moment().format("DD/MM/YY hh:mm A"));  // Initialize Firebase///////////////////////////////////////////////////////
  var config = {
    apiKey: "AIzaSyCsg-nfIS20eX4KBZmAoJdy3wXL2NEViLM",
    authDomain: "train-a0032.firebaseapp.com",
    databaseURL: "https://train-a0032.firebaseio.com",
    projectId: "train-a0032",
    storageBucket: "train-a0032.appspot.com",
    messagingSenderId: "580808417196"
  };
  firebase.initializeApp(config);
  var database = firebase.database();
  console.log(database.ref("trainNameInput"));

/////////////button click/////////////////////////
$(".btn").on("click", function(event) {
  // Prevent form from submitting
  event.preventDefault();
  var trainNameInput=$(".train-name").val().trim();
  var trainNameDest=$(".train-destination").val().trim();
  var trainNameFirst=parseInt($(".train-first").val().trim());
  var trainNameFreq=parseInt($(".train-frequency").val().trim());
  if(trainNameInput==""||trainNameDest==""||trainNameFreq=="")
      {
        alert("Fill in all fields")
        return;
      }
  // if(isNaN(trainNameFirst)||isNaN(trainNameFreq))
  // {
  //   alert("Please enter times as numbers")
  //       return;
  // }
  timeConvert(trainNameFirst,trainNameFreq);
  // console.log(trainNameInput+" "+trainNameDest+" "+trainNameFirst+" "+trainNameFreq);
  database.ref().push({
    trainNameInput: trainNameInput,
    trainNameDest: trainNameDest,
    trainNameFirst: trainNameFirst,
    trainNameFreq: trainNameFreq
              
    });
// trainTimes.push(trainNameFirst,trainNameFreq)
// console.log(trainTimes);
  });
/////////////end button click/////////////////////////


/////////////on("child_added"/////////////////////////
database.ref().on("child_added", function(snapshot)  {
  var ohSnap=snapshot.val();
  // firstTrain=
  timeConvert(ohSnap.trainNameFirst , ohSnap.trainNameFreq);
  // console.log(ohSnap.trainNameInput)
$('#table-data').append(`<tr><td>${ohSnap.trainNameInput}</td>
                             <td>${ohSnap.trainNameDest}</td>
                             <td>${ohSnap.trainNameFreq}</td>
                             <td>${nextTrain}</td>
                             <td>${minutesAway}</td>
                             </tr>`)
  
});
/////////////end on("child_added"/////////////////////////


/////////////timeConvert/////////////////////////
function timeConvert(ft,frq)
{
  // console.log(ft+" "+frq)
  var tFrequency = frq;

// Time is 3:30 AM
var firstTime = ft;

// First Time (pushed back 1 year to make sure it comes before current time)
var firstTimeConverted = moment(firstTime, "HH:mm").subtract(1, "years");
// console.log(firstTimeConverted);

// Current Time
var currentTime = moment();
// console.log("CURRENT TIME: " + moment(currentTime).format("hh:mm"));

// Difference between the times
var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
// console.log("DIFFERENCE IN TIME: " + diffTime);

// Time apart (remainder)
var tRemainder = diffTime % tFrequency;
// console.log(tRemainder);

// Minute Until Train
var tMinutesTillTrain = tFrequency - tRemainder;
// console.log("MINUTES TILL TRAIN: " + tMinutesTillTrain);
minutesAway=tMinutesTillTrain;
var nextT = moment().add(tMinutesTillTrain, "minutes");
if(tMinutesTillTrain<=1)
{
  minutesAway="Arriving Now";
}
else if (minutesAway>1440)
{
  minutesAway=moment(nextT).format("MMMM Do YYYY");
  // minutesAway="Not arriving today";
}
else minutesAway=tMinutesTillTrain+ " minutes";
// Next Train

// console.log("ARRIVAL TIME: " + moment(nextT).format("HH:mm"));

// if (tMinutesTillTrain>1440)nextTrain=moment(nextT).format("MMMM Do YYYY, h:mm:ss a");
// else 
nextTrain=moment(nextT).format("h:mm A");
}
 /////////////end timeConvert/////////////////////////
 setInterval(function(){ UpdateTime(); }, 60000);
 function UpdateTime()
 {
  location.reload();////Bad idea. I know.
 }



//  database.ref().on("value", function(snapshot) {
//   var ohSnap=snapshot.val();
//   console.log(ohSnap.trainNameFirst)

//   // firstTrain=
//   timeConvert(ohSnap.trainNameFirst , ohSnap.trainNameFreq);
//   // console.log(ohSnap.trainNameInput)
// // $('#table-data').append(`<tr><td>${ohSnap.trainNameInput}</td>
// //                              <td>${ohSnap.trainNameDest}</td>
// //                              <td>${ohSnap.trainNameFreq}</td>
// //                              <td>${nextTrain}</td>
// //                              <td>${minutesAway}</td>
// //                              </tr>`)
  
//  })
