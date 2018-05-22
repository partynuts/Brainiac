const express = require("express");
const app = express();
const compression = require("compression");
const bodyParser = require("body-parser");
// const { hashPassword, checkPassword } = require("./bcrypt");
const server = require("http").Server(app);
const io = require("socket.io")(server, {
  origins: "localhost:8080"
});

const cookieSession = require("cookie-session");
const cookieParser = require("cookie-parser");
const csurf = require("csurf");
// const multer = require("multer");
const uidSafe = require("uid-safe");
const path = require("path");
// const s3 = require("./s3");

const config = require("./config.json");

app.use(compression());
app.use(express.static("./public"));

const cookieSessionMiddleware = cookieSession({
  secret: `Man's not hot`,
  maxAge: 1000 * 60 * 60 * 24 * 14 //expiration of the session (like on banking pages)
});

app.use(cookieSessionMiddleware);

io.use(function(socket, next) {
  cookieSessionMiddleware(socket.request, socket.request.res, next);
});

app.use(bodyParser.json());

app.use(csurf());

app.use(function(req, res, next) {
  res.cookie("mytoken", req.csrfToken());
  next();
});

// if (process.env.NODE_ENV != "production") {
//   app.use(
//     "/bundle.js",
//     require("http-proxy-middleware")({
//       target: "http://localhost:8081/"
//     })
//   );
// } else {
//   app.use("/bundle.js", (req, res) => res.sendFile(`${__dirname}/bundle.js`));
// }

server.listen(8080, function() {
  console.log("listening");
});
