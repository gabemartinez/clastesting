var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var urlencodedParser = bodyParser.urlencoded({ extended: false });

var request = require('request');
var cheerio = require('cheerio');
var Case = require('case');

/* GET buttons page. */
router.get('/', function(req, res, next) {
  res.render('buttons', { title: 'Buttons Test' });
});

/* POST buttons page. */
router.post('/', urlencodedParser, function(req, res) {
  var page = req.body.page;
  console.log(page);

  request(page, function (error, response, html) {
      //var some = [];
      var $ = cheerio.load(html);

      // $('.btn').each(function () {
      //    thisText = $(this).text().trim();
      //    thisCase = Case.of(thisText);
      //    some.push(thisText, thisCase);
      // });
      // console.log(some);

      var FinalObject= {}
      $('.btn').each(function() {
         var property= $(this).text().trim();
         var value = Case.of(property);
         FinalObject[property] = value;
      });
      console.log(FinalObject);
      //console.log(JSON.stringify(FinalObject));
      var theFinalObject = JSON.stringify(FinalObject);

  });

  res.render('buttons-test', { data: req.body });


})

module.exports = router;
