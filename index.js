const express = require("express");
const app = express();

const port = 4444;

const mongo = require("mongodb");
const dbConnect = require("./mongodb");

let response;

let display = async () => {
  let db = await dbConnect();
  response = await db.find().toArray();
  let start = 0,
    end = 2;
  let newarr = [];

  // let response = [
  //   1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21,
  //   22, 23, 24, 25, 26, 27, 28, 29, 30, 31, 32, 33, 34, 35,
  // ];

  for (start = 0; end <= response.length; start++) {
    if (start === end) {
      // start = end;
      end += 2;
      // console.log(newarr);
      migration(newarr);
      while (newarr.length != 0) {
        newarr.pop();
      }
    }
    if (response[start] != undefined) newarr.push(response[start]);
    else break;
  }
  if (newarr.length != 0) migration(newarr);
};

display();

let migration = (newarr) => {
  // console.log(newarr);
  let newdata = newarr.map((element) => {
    let obj = { subject: element.subject, description: element.description };
    return obj;
  });
  // console.log(newdata);
  var axios = require("axios");
  var data = JSON.stringify({
    tickets: newdata,
  });
  var config = {
    method: "POST",
    url: "https://quadraforttechnologies6641.zendesk.com/api/v2/imports/tickets/create_many",
    headers: {
      "Content-Type": "application/json",
    },
    auth: {
      username: "sachinbhatt1947@gmail.com",
      password: "sachin@12345",
    },
    data: data,
  };
  axios(config)
    .then(async function (response) {
      // console.log(JSON.stringify(response.data));
      const dbConnect2 = require("./mongodb2");
      const storeData = await dbConnect2();
      const result = await storeData.insertOne(response.data);
      console.log(result);
      console.log("heello how are you");
    })
    .catch(function (error) {
      console.log(error);
    });
};

app.get("/", (req, res) => {
  //   res.send("hello world");
  res.send(response);
});
app.listen(port, () => {
  console.log("server started at port:" + port);
});
