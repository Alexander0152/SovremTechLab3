var express = require('express');
var router = express.Router();

/* POST users listing. */
router.post('/', function (req, res, next) {
  
  var history = req.body.item;

  const fs = require("fs");
  var destinationFile = fs.createWriteStream(__dirname + '/history.txt');
  destinationFile.write(history);
  // fs.readFile('D:/LABS_6_SEM/sovremenniyeTechnologiiWeb/lab4express/react-backend/routes/history.txt', 'utf8', function (err,data) {
  fs.readFile(__dirname + '/history.txt', 'utf8', function (err,data) {
    if (err) {
      return console.log(err);
    }
    res.json([{
      id: 1,
      data: data
    }]);
  });

  // res.json([{
  //   id: 1,
  //   username: data
  // }]);
});

module.exports = router;

