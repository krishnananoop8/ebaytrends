 exports.index = function(req, res){
 var http = require('http');
 var body = '';
  var googleKeyWords = [];
  // get keywords from Google
  var getGoogleTrendsOptions = {
    host: 'localhost',
    port: 3000,
    path: '/getgoogletrends'
  };

  http.get(getGoogleTrendsOptions, function(res) {
    res.on('data', function(chunk) {
      body += chunk;
    });
  });

  res.on('end', function() {
    googleKeyWords = JSON.parse(body);
  });
  // end of getting keywords from google

  // make calls to ebay's api to get results for each keyword
  var resultList = {};
  for(i = 0 ; i < googleKeyWords.length; i++){
    var geteBayProductsOptions = {
      host: 'localhost',
      port: 3000,
      path: '/geteBayProducts?q='+googleKeyWords[i]
    };

    http.get(getGoogleTrendsOptions, function(res) {
      res.on('data', function(chunk) {
        body += chunk;
      });
    });

    res.on('end', function() {
      eBayProducts = JSON.parse(body);
      resultList.push(googleKeyWords[i],eBayProducts);
    });
  }
  //res.render('index', { title: 'Express' });
  res.send(resultList);
};

