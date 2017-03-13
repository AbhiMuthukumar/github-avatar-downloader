var request = require("request");
var https = require("https");

var fs = require("fs");

var GITHUB_USER = "AbhiMuthukumar";
var GITHUB_TOKEN = "ab8e2c32ebb6caa3317578f011d3cf48a25c4b74";
//LHL Exercise = ab8e2c32ebb6caa3317578f011d3cf48a25c4b74
//LHL token 1 - 3a93ef87edec239305026b8f501a3cd878fb7160

function getRepoContributors(repoOwner, repoName, callback){
  var requestOptions ={
    url : "https://" + GITHUB_USER + ":" + GITHUB_TOKEN + "@api.github.com/repos/" + repoOwner + "/" + repoName + "/contributors",
    headers : {
      "User-Agent" : "Github Avatar Downloader"
    }
  }
  request.get(requestOptions, function(error, response){
    if(error){
      return console.error(error);
    }
    if(response.statusCode === 200){
      callback(JSON.parse(response.body));
    }
  })
}

function downloadImageByURL(url, filePath) {
  request.get(url)
  .on('error', function(error){
    return console.error(error);
  })
  .on('response', function(response){
    console.log("Status Code : ", response.statusCode);
  })
  .pipe(fs.createWriteStream(filePath))
}

//downloadImageByURL("https://avatars2.githubusercontent.com/u/2741?v=3&s=466", "./avatars/kvirani.jpg")

getRepoContributors("jquery", "jquery", function(contributors){
  Object.keys(contributors).forEach((index) => {
    downloadImageByURL(contributors[index].avatar_url, "./avatars/"+contributors[index].login+".jpg");
  });
});
