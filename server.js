require("dotenv").config();
const express = require("express");
const cors = require("cors");
const path = require("path");
const mongoose = require("mongoose");
const passport = require("passport");
const bcrypt = require("bcryptjs");
const { v4: uuidv4 } = require("uuid");
const localStrategy = require("passport-local").Strategy;
const cookieParser = require("cookie-parser");
const session = require("express-session");
const User = require("./user");
const Link = require("./link");
const Traffic = require("./traffic");
const PORT = process.env.PORT || 4000;

//-------------------END OF IMPORTS-------------------//

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);
app.use(
  session({
    secret: "link-tracking-secret",
    resave: true,
    saveUninitialized: false,
  })
);
app.use(cookieParser("link-tracking-secret"));
app.use(passport.initialize());
app.use(passport.session());
require("./passportConfig")(passport);

if (process.env.NODE_ENV === "production") {
  //serve static content
  app.use(express.static(path.join(__dirname, "client/build")));
}

mongoose.connect(
  process.env.URI,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  },
  () => {
    console.log("Database Connected");
  }
);

//----------------------ROUTES-------------------------------//

//------user auth---------------
//Making a new user =>
app.post("/register", (req, res, next) => {
  User.findOne({ username: req.body.username }, async (err, doc) => {
    try {
      if (err) throw err;
      if (doc) res.send("User Already Exists");
      if (!doc) {
        const hash = await bcrypt.hash(req.body.password, 10);
        const newUser = new User({
          username: req.body.username,
          email: req.body.email,
          password: hash,
        });
        await newUser.save();
        passport.authenticate("local", (err, user) => {
          if (err) throw err;
          if (user) {
            req.login(user, (err) => {
              res.send("New user created");
            });
          }
        })(req, res, next);
      }
    } catch (error) {
      console.log(error);
    }
  });
});

//loging in the user =>
app.post("/login", (req, res, next) => {
  passport.authenticate("local", (err, user, info) => {
    if (err) throw err;
    if (!user) res.send("No User Exists");
    if (user) {
      req.logIn(user, (err) => {
        res.send("Success");
      });
    }
  })(req, res, next);
});

//sending user info to client-side =>
app.get("/user", (req, res) => {
  res.send(req.user);
});

//-------------------creating a new link by the user--------------------
app.post("/api/create", (req, res) => {
  Link.findOne({ linkName: req.body.linkName }, (err, link) => {
    if (err) throw err;
    if (link) res.send("Link Already Exists");
    if (!link) {
      const link = new Link({
        linkName: req.body.linkName,
        linkDes: req.body.linkDes,
        urlGen: req.body.url,
        linkCheck: req.body.linkName.toLowerCase(),
        createDate: new Date().toLocaleString(),
      });
      link.save((err) => {
        if (err) throw err;
        req.user.userLinks.push(link);
        req.user.save((err) => {
          if (err) throw err;
          else res.send("Link Created Successfully");
        });
      });
    }
  });
});

//-----------public link created by the user------------
app.get("/data/:username/:linkName", (req, res) => {
  const { username, linkName } = req.params;
  User.find({ username: username })
    .populate("userLinks")
    .exec((err, links) => {
      var flag = false;
      links[0].userLinks.forEach((link) => {
        if (link.linkCheck === linkName.replace(/-/g, " ")) {
          flag = true;
        }
      });
      res.send(flag);
    });
});

//---------------store visitor details-----------------------------------
app.post("/api/data", (req, res) => {
  var today = new Date()
    .toLocaleDateString("en-GB", {
      day: "numeric",
      month: "short",
      year: "numeric",
    })
    .split(" ")
    .join("-");
  //check if link Traffic exist,
  //if exist then check if ip of users exists with that link,
  //if ip exists edit,
  //if not create new user ip
  //if not create a new user for that link
  Traffic.find({ link: req.body.linkName }, (err, result) => {
    if (err) throw err;
    if (result) {
      var flag = false;
      result.forEach((element) => {
        if (element.ipAdd === req.body.ip) {
          element.lastVisit = today;
          element.totalVisits += 1;
          flag = true;
          element.save((err) => {
            if (err) throw err;
          });
        }
      });
      if (!flag) {
        const newTraf = new Traffic({
          uuid: uuidv4(),
          link: req.body.linkName,
          ipAdd: req.body.ip,
          country: req.body.country,
          firstVisit: today,
          lastVisit: today,
          totalVisits: 1,
          browser: req.body.browser,
          device: req.body.device,
        });
        newTraf.save((err) => {
          if (err) throw err;
          Link.findOne(
            { linkCheck: req.body.linkName.replace(/-/g, " ") },
            (err, link) => {
              link.linkData.push(newTraf);
              link.save((err) => {
                if (err) throw err;
              });
            }
          );
        });
      }
    }
    if (!result) {
      const newTraf = new Traffic({
        uuid: uuidv4(),
        link: req.body.linkName,
        ipAdd: req.body.ip,
        country: req.body.country,
        firstVisit: today,
        lastVisit: today,
        totalVisits: 1,
        browser: req.body.browser,
        device: req.body.device,
      });
      newTraf.save((err) => {
        if (err) throw err;
        Link.findOne(
          { linkCheck: req.body.linkName.replace(/-/g, " ") },
          (err, link) => {
            link.linkData.push(newTraf);
            link.save((err) => {
              if (err) throw err;
            });
          }
        );
      });
    }
  });
});

//--------------------------get links created by user---------------
app.get("/api/personal", (req, res) => {
  User.find({ _id: req.user._id })
    .populate("userLinks")
    .exec((err, links) => {
      if (err) throw err;
      if (links) res.send(links[0].userLinks);
    });
});

//------------------------get Traffic on each Link--------------------
app.get("/api/:id", (req, res) => {
  const { id } = req.params;
  Link.find({ _id: id })
    .populate("linkData")
    .exec((err, data) => {
      if (err) throw err;
      if (data) res.send(data[0].linkData);
      if (!data) res.send("No Data Stored");
    });
});

//--------------------catch all method-----------------------------------
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "client/build/index.html"));
});

//---------------port--------------------------
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
