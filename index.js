// My variables to ref npm packages
const fs = require("fs");
const axios = require("axios");
const util = require("util");
const inquirer = require("inquirer");
const github = require("github-scraper");
const pdf = require("html-pdf");

const writeFileAsync = util.promisify(fs.writeFile);
const appendFileAsync = util.promisify(fs.appendFile);

// My array of objects: Colors
const colors = {
    green: {
        wrapperBackground: "#E6E1C3",
        headerBackground: "#C1C72C",
        headerColor: "black",
        photoBorderColor: "#black"
    },
    blue: {
        wrapperBackground: "#5F64D3",
        headerBackground: "#26175A",
        headerColor: "white",
        photoBorderColor: "#73448C"
    },
    pink: {
        wrapperBackground: "#879CDF",
        headerBackground: "#FF8374",
        headerColor: "white",
        photoBorderColor: "#FEE24C"
    },
    red: {
        wrapperBackground: "#DE9967",
        headerBackground: "#870603",
        headerColor: "white",
        photoBorderColor: "white"
    }
};

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
            "pink",
            "blue",
            "green",
            "red"
        ]
    }
    ])
        .then(function ({
            username,
            color,
        }) {
            const queryURL = `https://api.github.com/users/${username}`;
            console.log(username);
            console.log(color);

            userFavColor = color;
        }
}

const questions = [

];

function writeToFile(fileName, data) {

}

function init() {

    init();
