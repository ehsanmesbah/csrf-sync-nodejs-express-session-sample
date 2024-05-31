import express from "express";
import bodyParser from "body-parser";
import { csrfSync } from "csrf-sync";
import session from "express-session";
var app = express();
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));

app.use(
  session({
    secret: "my secret to haaaaashhh9090",
    resave: false,
    saveUninitialized: false,
    cookie: { maxAge: 900000000 },
  })
);
const { generateToken, csrfSynchronisedProtection } = csrfSync({
  getTokenFromRequest: (req) => {
    return req.body.CSRFToken;
  },
});

app.get("/", (req, res) => {
  var tokenG = generateToken(req);
  res.render("login.ejs", { token: tokenG });
});
//app.use(csrfSynchronisedProtection);
app.post("/", csrfSynchronisedProtection, (req, res) => {
  res.send(req.body.email);
});
app.listen(3000, () => {
  console.log("test");
});
