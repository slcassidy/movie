// const axios = require("axios");
var request = require('request');
// import entire SDK
var AWS = require('aws-sdk');
require('dotenv').config()
// const queryURL = `https://www.omdbapi.com/?t=${movie}&y=&plot=short&apikey=trilogy`

const key = process.env.OMDB
const key1 = process.env.ACCESS
const key2 = process.env.SECRET

AWS.config.update({
    region: 'us-east-2',
    endpoint: 'http://dynamodb:us-east-2:805129476280:table/tbl_movie',
    accessKeyId: `${key1}`,
    secretAccessKey: `${key2}`
});


exports.handler = (event, context, callback) => {
    // TODO implement
    // requesting 
request(`https://www.omdbapi.com/?t=${event.queryStringParameters.name}&y=&plot=short&apikey=${key}`, (error, apiResponse, body) => {
    // response below to show the information
  const lambdaResponse = {
    statusCode: 200,
    // body: JSON.stringify(`${event['queryStringParameters']['name']}`)

    body: body,
    headers: {
        "Access-Control-Allow-Origin": "*",
        "Content-Type": "application/json"
    }
    // ,
    // Item: {
    //     name: 'movie_search',
    //     type: 'HTTP',
    //     title: `${event.queryStringParameters.name}`,
    //     timestamp: String(new Date().getTime())
    // }
};
// return response;
callback(null, lambdaResponse);
});

    
};


