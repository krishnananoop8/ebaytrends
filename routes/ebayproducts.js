
	/*
	* GET home page.
	*/

	var http = require('http');
	var body = '';
	var resultList = [];

	exports.index = function(req, res){
		var options = {
			host: 'rcg-ql-io-162420.phx-os1.stratus.dev.ebay.com',
			port: 3000,
			path: '/ebay/finding/keywords?keywords=cm+punk'
		};

		http.get(options, function(res) {
			res.on('data', function(chunk) {
				body += chunk;
			});

			res.on('end', function() {
				var obj = JSON.parse(body);
				var count = 1;
				for(var i in obj[0][0]) {
					resultList.push({'title':obj[0][0][i].title, 'galleryURL':obj[0][0][i].galleryURL, 'categoryName': obj[0][0][i].primaryCategory.categoryName});
					if(++count == 10)
						break;
				}
				//console.log(resultList);
			});
		});


		res.render('index', { title: 'Express' });
	};