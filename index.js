const express = require("express");
const app = express();

const port = 4444;

const mongo = require("./mongodb");
const dbConnect = require("./mongodb");

let response;

let display = async () => {
  let db = await dbConnect();
  response = await db.find().toArray();
  let start = 0,
    end = 2;
  let newarr = [];

  //   let response = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

  for (start = 0; start <= response.length && end <= response.length; start++) {
    if (start == end) {
      start = end;
      end = end + 2;
      //   console.log(newarr);
      migration(newarr);
      while (newarr.length != 0) {
        newarr.pop();
      }
    }
    newarr.push(response[start]);
  }
};

display();

let migration = (newarr) => {
  //   console.log(newarr);
  //   let newdata = newarr.map((element) => {
  //     let obj = { subject: element.subject, description: element.description };
  //     return obj;
  //   });
  //   console.log(newdata);
  //   var axios = require("axios");
  //   var data = JSON.stringify({
  //     tickets: newdata,
  //   });
  //   var config = {
  //     method: "POST",
  //     url: "https://pdi-xoogle.zendesk.com/api/v2/imports/tickets/create_many",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  // auth: {
  //   username: "harshit@xoogle.in",
  //   password: "Harshit#245",
  // },
  // data: data,
  //   };
  //   axios(config)
  // .then(async function (response) {
  //   console.log(JSON.stringify(response.data));
  // })
  // .catch(function (error) {
  //   console.log(error);
  // });
};

app.get("/", (req, res) => {
  //   res.send("hello world");
  res.send(response);
});
app.listen(port, () => {
  console.log("server started at port:" + port);
});
