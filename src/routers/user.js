const express = require("express");
const router = new express.Router();
const UserList = require("../db/users");
const mongoose=require("mongoose");
const alert = require('alert');

const answersarr = [];

router.use(express.json());
router.use(express.urlencoded({ extended: false }));

router.get("/", (req, res) => {
    res.render("index");
})
router.get("/about", (req, res) => {
    res.render("about");
})
router.get("/login", (req, res) => {
    res.render("login");
})
router.get("/registration", (req, res) => {
    res.render("registration");
})
router.get("/physical", (req, res) => {
    res.render("physical");
})
router.get("/beginner", (req, res) => {
    res.render("beginner");
})
router.get("/intermediate", (req, res) => {
    res.render("intermediate");
})
router.get("/advanced", (req, res) => {
    res.render("advanced");
})
router.get("/quiz", (req, res) => {
    res.render("quiz");
})
router.get("/puzzle", (req, res) => {
    res.render("puzzle");
})
router.get("/hangman", (req, res) => {
    res.render("hangman");
})
router.get("/sudoku", (req, res) => {
    res.render("sudoku");
})
router.get("/mental", (req, res) => {
    res.render("mental");
})
router.get("/phyart", (req, res) => {
    res.render("phyart");
})
router.get("/phydise", (req, res) => {
    res.render("phydise");
})
router.get("/yoga", (req, res) => {
    res.render("yoga");
})
router.get("/yogdise", (req, res) => {
    res.render("yogdise");
})
router.get("/meditation", (req, res) => {
    res.render("meditation");
})
router.get("/dietplan", (req, res) => {
    res.render("dietplan");
})
router.get("/spiritual", (req, res) => {
    res.render("spiritual");
})



mongoose.connect("mongodb://localhost:27017/fitmee", {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true}).then(()=>{
    console.log("Database Connected Successfully...");
}).catch((err)=>{
    console.log(err);
})

const postSchema = {
  name: String,
  email: String,
  title: String,
  content: String
};

const Post = mongoose.model("Post", postSchema);

router.get("/contact", function(req, res){

  Post.find({}, function(err, posts){
    res.render("contact", {
      posts: posts
      });
  });
});


router.post("/compose", function(req, res){
  const post = new Post({
    name: req.body.name,
    email: req.body.email,
    title: req.body.postTitle,
    content: req.body.postBody
  });


  post.save(function(err){
    if (!err){
        res.redirect("/contact");
    }
  });
});

router.get("/posts/:postId", function(req, res){

const requestedPostId = req.params.postId;


  Post.findOne({_id: requestedPostId}, function(err, post){
    res.render("post", {
      title: post.title,
      content: post.content,
      answers: answersarr
    });
  });

});

router.post("/answer", (req, res)=>{
    const answer = req.body.answer;
    answersarr.push(answer);
    res.redirect("/contact");
});

router.get("*", (req, res) => {
    res.render("404error", { error: "Oops... Page couldn't be found" });
})

router.post("/login", async(req, res) => {
    console.log(req.body);
    try {
        let data = {
            email: req.body.email,
            password: req.body.password
        }
    console.log(data);

        const checkEmail= await UserList.findOne({email:data.email});
        console.log("checkemail"+checkEmail);
        // console.log("checkp "+checkEmail.password);
        // console.log("dap "+data.password);
        if(checkEmail != null  && checkEmail.password === data.password){
            res.render("index"); 
        }
        else{
            res.render("login", {
                val: req.body.email,
                errMsg: "Invalid Login Details"
            });            
        }     

    }
    catch(err) {
        console.log(err);
        res.send(err);
    }
});
router.post("/registration", async (req, res) => {
    console.log(req.body.username);
    try {
        console.log(req.body);
        let password = req.body.password;
        let cPassword = req.body.cPassword;

        if (cPassword == password) {
            let data = {
                username: req.body.username,
                email: req.body.email,
                password: req.body.password,
                height: req.body.height,
                weight: req.body.weight
            }
            const userData = new UserList(data);
            let createUser = await userData.save();
            res.render("login");
            // console.log(createUser);
            // res.status(201).send(`${createUser} REGISTERED SUCCESSFULLY...`);
        }
        else {
            alert("Please enter valid credentials");
        }
    }
    catch (err) {
        console.log(err);
    
         
    alert("Please enter valid credentials")
        // window.confirm("Please enter valid credentials");

    }
});

module.exports = router;