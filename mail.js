const bodyParser = require("body-parser");
const express = require("express");
const app = express();
const https = require("https");
const request = require("request");
const mailchimp = require("@mailchimp/mailchimp_marketing");


mailchimp.setConfig({
  apiKey: "3617b5ca6e55aff30e9cc5d287971964-us21",
  server: "us21",
});
const listId = "2d64d3904b";

app.use(bodyParser.urlencoded(extended=false));
app.use(express.static("public"));

app.get("/",function(req,res){
    res.sendFile(__dirname+"/signup.html")
})
app.post("/",function(req,res){
    var a = (req.body.fn);
    var b = (req.body.ln);
    var c = (req.body.ea);
    console.log(a+b+c);

    async function run() {
        try {
        const response = await mailchimp.lists.addListMember(listId, {
          email_address: c,
          status: "subscribed",
          merge_fields: {
            FNAME: a,
            LNAME: b
          }
          })
          if (response.status == "subscribed") {
            res.sendFile(__dirname + "/success.html");
            console.log("ooo");
      }
    }
      catch(err){
        res.sendFile(__dirname+"/failure.html"); 
        console.log(err);
      }
        

        //console.log(res.statusCode);
        /**if(res.statusCode==200)
        {
          res.sendFile(__dirname+"/success.html");
          console.log("ooo");
        }
        else{
          res.sendFile(__dirname+"/failure.html");
          console.log("ppp");
        } */
        /*if (response.status == "subscribed") {
          res.sendFile(__dirname + "/success.html");
          console.log("ooo");
        /*} else {
          res.sendFile(__dirname + "/failure.html");
        }*/
      
      
    }
    run();

});
app.post("/failure",function(req,res){
  res.redirect("/");
})
app.listen(5000,function(){
    console.log("paddu");
});

//b9e933722ab877db4f64b9b8ecd4bf9f-us21
//2d64d3904b
