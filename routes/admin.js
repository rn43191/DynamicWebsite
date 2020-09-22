var mysql = require("mysql");

var con = mysql.createConnection({
    host: "cs351assgn5db.cljoqmicfcfk.ap-south-1.rds.amazonaws.com",
    user: "root",
    password: "Password",
    database: "Feedback"
});
con.connect(function(err) {
    if (err) throw err;
    console.log("Connected!");
});

exports.putview = function(req, res) {
    var user = req.body.name;
    var pass = req.body.pass;
    if (user === "admin" && pass === "admin") {
        var s =
            "select cf.compID,cf.username,c.fullname,cf.email,cf.complaint \
            from customer as c, customer_feedback as cf \
            where c.username = cf.username \
            order by cf.compID;";

        con.query(s, (err, rslt) => {
            if (err) {
                console.log(err);
            } else {
                res.render("admin.ejs", { userData: rslt });
            }
        });
    } else {
        res.render("home.ejs", { error1: "", error2: "Wrong Credentials" });
    }
};
