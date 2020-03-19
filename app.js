//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
// require mongoose
const mongoose = require("mongoose");
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

//connect mongoose
mongoose.connect("mongodb://localhost:27017/blogDB", {
  useUnifiedTopology:true,
  useNewUrlParser:true,
  useCreateIndex:true
})
.then(() => console.log('DB connected!'))
.catch(err => {
  console.log(`DB Connection Error: ${err.message}`);
});

//Scheme for db
const postSchema = {
  title:String,
  content:String
};

//Mongoose model
const Post = mongoose.model("Post", postSchema);


// set Home.ejs as home page + render homeStartingContent
app.get("/", function(req, res) {
  Post.find({}, function(err, posts){
    res.render("home", {
      startingContent: homeStartingContent,
      posts: posts
  });
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
  const post = new Post ({
    title: req.body.postTitle,
    content: req.body.postBody
  });
  //push postForm to global variable array type posts
  post.save(function(err){
    if(!err){
    res.redirect("/");
    }
  });
});

//Express routing from URL
app.get("/posts/:postId", function(req, res) {
  //lodash function inside parameter of input in url
  const requestedPostId = req.params.postId;
  //Search through array posts
  Post.findOne({_id:requestedPostId}, function(err,post){
    res.render("post", {
      title:post.title,
      content:post.content
  });
  });
});

app.listen(3000, function() {
  console.log("Server started on port 3000");
});
