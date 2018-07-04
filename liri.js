

require("dotenv").config();
var request = require('request');


var fs = require('fs');

var keys = require('./key.js');


var Spotify = require('node-spotify-api');
var Twitter = require('twitter');

var spotify = new Spotify(keys.spotify);

var client = new Twitter(keys.twitter)


var params = process.argv.slice(2);
switch(params[0]) {
    case "my-tweets":
      myTweets();
      break;
    case "spotify-this-song":
      if(params[1]){  
        x = params[1]
      spotifyIt(x);
    
    } else { 
       x = '<I want it that way>'
      spotifyIt(x);
    }
      break;
    case "movie-this":
    if(params[1]){  
        x = params[1];
      myMovie(x);
    } else {  
       x = "Mr.Nobody"
      myMovie(x);
    }
      break;
    case "do-what-it-says":
    readfile();
    break;
};



function spotifyIt() {
    spotify.search({ type: 'track', query: x }, function(err, data) {
      if ( err ) {
          console.log('Error occurred: ' + err);
          return;  
      }
      else{
      var songInfo = data.tracks.items[0];
        console.log(songInfo.artists[0].name)
        console.log(songInfo.name)
        console.log(songInfo.album.name)
        console.log(songInfo.preview_url)
      };
    });
  }  



function twitter(){
 var twitterOptions = { screen_name: 'k_harrison34',
                        count: 20 };

        client.get('statuses/user_timeline', twitterOptions , function(err, tweets) {
        for (var i = 0; i < tweets.length ; i++) {
            console.log(tweets[i].text);
        }
        })
};


function myMovie(snapshot){

    request("http://www.omdbapi.com/?apikey=trilogy&"+snapshot+"&y=&plot=short&r=json&apikey=trilogy", function(error,data,body) {
     var obj = JSON.parse(data.body)
      console.log(obj.Title);
      console.log(obj.Year);
      console.log(obj.imdbRating);
      console.log(obj.Country);
      console.log(obj.Language);
      console.log(obj.Plot);
      console.log(obj.Actors);
           
    });
};



function readfile(){
    fs.readFile('random.txt', 'utf8', function(err, data) {  
      if (err) throw err;
      console.log(data);
      x=data.split(/"/)[1];
      spotifyIt(x);

    });
}


// };
