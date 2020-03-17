//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");
truncate = require("truncate");

const homeStartingContent = "Lacus vel facilisis volutpat est velit egestas dui id ornare. Semper auctor neque vitae tempus quam. Sit amet cursus sit amet dictum sit amet justo. Viverra tellus in hac habitasse. Imperdiet proin fermentum leo vel orci porta. Donec ultrices tincidunt arcu non sodales neque sodales ut. Mattis molestie a iaculis at erat pellentesque adipiscing. Magnis dis parturient montes nascetur ridiculus mus mauris vitae ultricies. Adipiscing elit ut aliquam purus sit amet luctus venenatis lectus. Ultrices vitae auctor eu augue ut lectus arcu bibendum at. Odio euismod lacinia at quis risus sed vulputate odio ut. Cursus mattis molestie a iaculis at erat pellentesque adipiscing.";
const aboutContent = "Hac habitasse platea dictumst vestibulum rhoncus est pellentesque. Dictumst vestibulum rhoncus est pellentesque elit ullamcorper. Non diam phasellus vestibulum lorem sed. Platea dictumst quisque sagittis purus sit. Egestas sed sed risus pretium quam vulputate dignissim suspendisse. Mauris in aliquam sem fringilla. Semper risus in hendrerit gravida rutrum quisque non tellus orci. Amet massa vitae tortor condimentum lacinia quis vel eros. Enim ut tellus elementum sagittis vitae. Mauris ultrices eros in cursus turpis massa tincidunt dui.";
const contactContent = "Scelerisque eleifend donec pretium vulputate sapien. Rhoncus urna neque viverra justo nec ultrices. Arcu dui vivamus arcu felis bibendum. Consectetur adipiscing elit duis tristique. Risus viverra adipiscing at in tellus integer feugiat. Sapien nec sagittis aliquam malesuada bibendum arcu vitae. Consequat interdum varius sit amet mattis. Iaculis nunc sed augue lacus. Interdum posuere lorem ipsum dolor sit amet consectetur adipiscing elit. Pulvinar elementum integer enim neque. Ultrices gravida dictum fusce ut placerat orci nulla. Mauris in aliquam sem fringilla ut morbi tincidunt. Tortor posuere ac ut consequat semper viverra nam libero.";

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({
  extended: true
}));
app.use(express.static("public"));

//global variable containing array for posts
let posts = [];

// set Home.ejs as home page + render homeStartingContent
app.get("/", function(req, res) {
  res.render("home", {
    startingContent: homeStartingContent,
    homePosts: posts
  });

});

// set About.ejs as about page + render
app.get("/about", function(req, res) {
  res.render("about", {
    aboutContent: aboutContent
  });
});

// set Contact content as contact page + render
app.get("/contact", function(req, res) {
  res.render("contact", {
    contactContent: contactContent
  });
});
//set Compose page to render
app.get("/compose", function(req, res) {
  res.render("compose");
});



//Post new input with submit
app.post("/compose", function(req, res) {
  const postForm = {
    title: req.body.postTitle,
    content: req.body.postText
  };
  //push postForm to global variable array type posts
  posts.push(postForm);
  res.redirect("/");
});


//Express routing from URL
app.get("/posts/:postName", function(req, res) {
  //lodash function inside parameter of input in url
  const requestedTitle = _.lowerCase(req.params.postName);
  //Search through array posts
  posts.forEach(function(post) {
    const storedTitle = _.lowerCase(post.title);
    //compare asked path with array
    if (storedTitle === requestedTitle) {
      //set Post page to render
        res.render("post", {
          title:post.title,
          content:post.content
        });
    }
  });

});


app.listen(3000, function() {
  console.log("Server started on port 3000");
});
