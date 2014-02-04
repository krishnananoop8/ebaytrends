

exports.list = function(req, res){

var http = require('http');
var FeedParser = require('feedparser')
  , request = require('request');
var parseString = require('xml2js').parseString;


request('http://www.google.com/trends/hottrends/atom/hourly')
  .pipe(new FeedParser([]))
  .on('error', function(error) {
    // always handle errors
  })
  .on('meta', function (meta) {
    // do something
  })
  .on('readable', function () {
    // do something else, then do the next thing
    //console.log('got data');
    var stream = this, item;
    var keywords = [];
    while (item = stream.read()) {      
      parseString(item.description, function (err, result) {
        var items = result.ol.li;
        for(i = 0; i < items.length; i++){
          keywords.push(items[i].span[0].a[0]._);
        }
        res.send(keywords);
      });      
    }
  })

  
};

