var request = require("request");
var https = require("https");
var fs = require("fs");
require('dotenv').config();

var repoOwner = process.argv[2];
var repoName = process.argv[3];

var GITHUB_USER = process.env.GIT_USER;
var GITHUB_TOKEN = process.env.GIT_TOKEN;
//LHL Exercise = ab8e2c32ebb6caa3317578f011d3cf48a25c4b74
//LHL token 1 - 3a93ef87edec239305026b8f501a3cd878fb7160

function getRepoContributors(repoOwner, repoName, callback){
  var requestOptions = {
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
  });
}

function downloadImageByURL(url, filePath) {
  request.get(url)
  .on('error', function(error){
    return console.error(error);
  })
  .on('response', function(response){
    //console.log("Status Code : ", response.statusCode);
  })
  .pipe(fs.createWriteStream(filePath))
}

//downloadImageByURL("https://avatars2.githubusercontent.com/u/2741?v=3&s=466", "./avatars/kvirani.jpg")

if(repoOwner && repoName){
  getRepoContributors(repoOwner, repoName, function(contributors){
    Object.keys(contributors).forEach((index) => {
      downloadImageByURL(contributors[index].avatar_url, "./avatars/"+contributors[index].login+".jpg");
    });
  });
  console.log("Images Downloaded!")
}
else{
  console.log("Enter Repo-Owner and Repo-Name to download avatars.")
}
