// My variables to ref npm packages
const fs = require("fs");
const axios = require("axios");
const util = require("util");
const inquirer = require("inquirer");
const github = require("github-scraper");
const pdf = require('html-pdf');

const generateHTML = require("./generateHTML");

// My varibles for my github call
let profileImage;
let userName;
let userLocation;
let userGithubProfile;
let userBlog;
let userBio;
let numRepo;
let numFollowers;
let numGithubStars;
let numUsersFollowing;
let userCompany;

const writeFileAsync = util.promisify(fs.writeFile);
const appendFileAsync = util.promisify(fs.appendFile);

// Asking user for their github username and favorite color
function promptUser() {
  return inquirer.prompt([{
    message: "Enter your github name",
    name: "username"
  },
  {
    type: "list",
    name: "color",
    message: "What is your favorite color",
    choices: [
      "green",
      "blue",
      "pink",
      "red"
    ]
  }
  ])
    .then(function ({
      username,
      color,
    }) {
      const queryURL = `https://api.github.com/users/${username}`;
      // console.log(username);
      // console.log(color);

      let html = generateHTML(color);
      writeFileAsync("index.html", html);

      userFavColor = color;

      const queryURL2 = `https://api.github.com/users/${username}/starred`

      axios.get(queryURL).then(function (results) {
        profileImage = results.data.avatar_url;
        userName = results.data.login;
        userLocation = results.data.location;
        userGithubProfile = results.data.html_url;
        userBlog = results.data.blog;
        userBio = results.data.bio;
        numRepo = results.data.public_repos;
        numFollowers = results.data.followers;
        numUserFollowing = results.data.following;
        userCompany = results.data.company;

        // console.log(results);

        github(username, function (err, data) {
          var generatedHtml = generateHTML2(data.stars);
          appendFileAsync('index.html', generatedHtml).then(function () {
            // code to create pdf
            var readHtml = fs.readFileSync("index.html", "utf8");
            var options = {
              "height": "10.5in",
              "width": "8in",
            };
            pdf.create(readHtml, options).toFile(`./${username}-profile.pdf`, function (err, res) {
              console.log(res);
              if (err) {
                console.log(err);
              } else {
                console.log('works');
              }
            });
          })
        });

      })
    });
}

// function to append the index.html with the information from the github call
function generateHTML2(stars) {
  return `
      </head>
      <body>
      <div class="wrapper">
        <div class="container">
          <div class="photo-header">
            <img src="${profileImage}" alt="image">
            <h1>Hi!</h1>
            <h2>My name is ${userName}</h2>
            <h5 class = "company">Currently @ ${userCompany}</h5>
            <div class="links-nav">
              <div class="nav-link">
              <i class="fas fa-location-arrow"></i>
              <a href="https://www.google.com/maps/place/${userLocation}">${userLocation}</a>
              </div>
              <div class="nav-link">
                <i class="fab fa-github-alt"></i>
                <a href="${userGithubProfile}">GitHub</a>
              </div>
              <div class="nav-link">
                <i class="fas fa-blog"></i>
                <a href="${userBlog}">Blog</a>
              </div>
            </div>
          </div>
        </div>
        <div class="main">
          <div class="container">
            <div class="row">
              <div class="col">
                <h2>${userBio}</h2>
              </div>
            </div>
            <div class="row">
              <div class="card col">
                <h2>Public Repositories</h2>
                <h3>${numRepo}</h3>
              </div>
              <div class="card col">
                <h2>Followers</h2>
                <h3>${numFollowers}</h3>
              </div>
            </div>
            <div class="row">
              <div class="card col">
                <h2>GitHub Stars</h2>
                <!--arbitrary value-->
                <h3>${stars}</h3>
              </div>
              <div class="card col">
                <h2>Following</h2>
                <h3>${numUsersFollowing}</h3>
              </div>
            </div>
          </div>
        </div>
      </div>
    </body>
    </html>`
}

promptUser();

