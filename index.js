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
    // accessKeyID: "LTMkN8HRJlKd9sk1PTsghivlY8aVRTudlJxsM7yS",
    secretAccessKey: `${key2}`
    // secretAccessKey: 'AKIAI4ECLURCC5QZBDAA'
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

        };
        // return response;
        callback(null, lambdaResponse);
    });
};

function addToDynamoDB(name) {
  
    
    // title: `${event.queryStringParameters.name}`
    var stuff = {
    TableName: 'tbl_movie',
    Item: {
        name: 'Lambda Entry',
        type: 'HTTP',
        title: name,
        timestamp: String(new Date().getTime())
    }
}

new AWS.DynamoDB.DocumentClient.put(stuff, function (err, data){
    if (err) {
        console.error("DOES NOT WORK");
    } else {
        console.log("HOORAY YOU ADDED!!!", JSON.stringify(data, null, 2));
    }
})
};


