const express = require("express");
const nunjucks = require("nunjucks");
const logger = require("morgan");
const bodyParser = require("body-parser"); //내장

//
//

const admin = require("./routes/admin");
const contacts = require("./routes/contatcs");

const app = express();
const port = 3000;

nunjucks.configure("templates", {
  autoescape: false,
  express: app,
});

// 미들웨어 세팅
app.use(logger("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// 정적파일
app.use("/uploads", express.static("uploads"));

// 미들웨어 로그인
app.use((req, res, next) => {
  app.locals.isLogin = false;
  app.locals.req_path = req.path;
  next();
});

app.get("/", (req, res) => {
  res.send("express start");
});

function vipMiddleware(req, res, next) {
  console.log("최우선");
  next();
}

app.use("/admin", vipMiddleware, admin);
app.use("/contacts", contacts);

app.use((req, res, _) => {
  res.status(400).render("common/404.html");
});
app.use((req, res, _) => {
  res.status(500).render("common/500.html");
});

app.listen(port, () => {
  console.log("Express listening on port", port);
});
