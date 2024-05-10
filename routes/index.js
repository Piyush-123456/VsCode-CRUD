var express = require('express');
var router = express.Router();
var fs = require("fs");
var os = require("os");
var path = require("path");

var foldername = "piyush";
router.get("/", function (req, res, next) {
  var arr = [];
  fs.readdir(foldername, { withFileTypes: true }, (err, files) => {
    if (err) {
      throw err;
      return;
    }
    files.forEach((file) => {
      arr.push({ name: file.name, isdirectory: file.isDirectory() });
    })
    res.render("index", {
      myfiles: arr
    })
  })
})

// console.log(fs);


router.get("/createFile", (req, res, next) => {
  let data = req.query.filename;
  console.log(data);
  let pathname = path.join(`${__dirname}`, `${data}`);
  fs.writeFile(`${pathname}`, "", (err) => {
    if (err) {
      throw err;
      return;
    }
    res.redirect("/");
  })
})


router.get("/createFolder", (req, res, next) => {
  let data = req.query.foldername;
  let pathname = path.join(`${foldername}`, ` ${data}`);
  fs.mkdir(`${pathname}`, (err) => {
    if (err) {
      throw err;
      return;
    }
    res.redirect("/");
  })
})


router.get("/delete/:filename", (req, res, next) => {
  let filename = req.params.filename;
  console.log(filename);
  let pathname = path.join(`${foldername}`, `${filename}`);

  console.log(pathname)
  fs.unlink(`${pathname}`, (err) => {
    if (err) {
      throw err;
      return;
    }
    console.log("Folder deleted");
    res.redirect("/");
  })
})

router.get("/deleteFolder/:foldername", (req, res, next) => {
  let folder = req.params.foldername;
  let pathname = path.join(foldername, folder);

  fs.rmdir(pathname, (err) => {
    if (err) {
      throw err;
      return;
    }
    console.log("Folder deleted SuccessFully");
    res.redirect("/");
  })

})



module.exports = router;
