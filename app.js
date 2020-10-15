var express = require("express");
var app = express();
var bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static("public"));
app.set("view engine", "ejs");

user = require("./routes/user");
app.get("/", user.home);

app.post("/user", user.putform);
app.post("/feed", user.feedpost);

admin = require("./routes/admin");
app.post("/admin", admin.putview);

app.listen(3000, function() {
    console.log("Hmmm...");
});
