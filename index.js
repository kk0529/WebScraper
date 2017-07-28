var request = require('request');
var cheerio = require('cheerio');

request('http://www.hollywoodreporter.com/blogs/live-feed', function (error, response, html){
	var $ = cheerio.load(html);

  $('.image-container').each(function(i, element){

      var result = [];

      var link = $(element).children().attr('src');

      console.log(link);

      result.push({
        link:link
      });
    });
  console.log(result);
});