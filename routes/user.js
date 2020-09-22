var mysql = require("mysql");
var con = mysql.createConnection({
    host: "",
    user: "root",
    password: "Password",
    database: "Feedback"
});
con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
});

exports.home = function(req, res) {
    res.render("home.ejs", { error1: "", error2: "" });
};

exports.putform = function(req, res) {
    var user = req.body.name;
    var pass = req.body.pass;
    check_login =
        "SELECT COUNT(*) as cnt FROM customer WHERE username = '" +
        user +
        "' AND password = '" +
        pass +
        "' LIMIT 0, 1;";
    con.query(check_login, (err, rslt) => {
        if (err) {
            console.log(err);
        } else {
            chk = 0;
            rslt.forEach(function(data) {
                chk = data.cnt;
            });
            if (chk == 1) {
                res.render("user_page.ejs");
            }
            if (chk == 0) {
                res.render("home.ejs", { error1: "Wrong User login details !", error2: "" });
            }
        }
    });
};

exports.feedpost = function(req, res) {
    var username = req.body.username;
    var email = req.body.email;
    var complaint = req.body.complaint;

    str =
        "INSERT INTO customer_feedback(username,email,complaint) VALUES('" +
        username +
        "','" +
        email +
        "','" +
        complaint +
        "')";
    console.log(str);
    con.query(str, (err, rslt) => {
        if (err) {
            console.log(err);
        } else {
            res.render("home.ejs", { error1: "Feedback successfully submitted !", error2: "" });
        }
    });
};
