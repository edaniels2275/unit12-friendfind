//Receives data from friends.js file -- all the friend objects in the friendsArray
var friendData = require("../data/friends");

//Returns absolute value of difference between two survey scores
function compare(survey1, survey2) {
    var difference = 0;
    for (var i = 0; i < survey1.length; i++) {
        difference += Math.abs(survey1[i] - survey2[i]);
    }
    return difference;
}

//Routing
module.exports = function(app) {

    // Recieves 
    app.get("/api/friends", function(req, res) {
        res.json(friendData);
    });

    // Sends
    app.post("/api/friends", function(req, res) {

        //posts newFriend object to the friends.js api
        newFriend = req.body;
        console.log(req.body);

        console.log(newFriend);
        //set scoreToBeat to a high value
        var scoreToBeat = 99;

        //initializes variable that will hold data for the best match
        var match;

        //Loops through each friend object in friendsArray and compares to user's score, returns lowest difference (closest match)
        for (var i = 0; i < friendData.length; i++) {
            var diff = compare(newFriend.scores, friendData[i].scores);
            console.log("Score for " + friendData[i].name + ": " + diff);
            if (diff < scoreToBeat) {
                match = friendData[i];
                scoreToBeat = diff;
            }
        }

        console.log("Here's your best match:");
        console.log(match);

        // Return best match
        friendData.push(newFriend);
        res.json(match);
    });

};