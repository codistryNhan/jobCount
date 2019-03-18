const request = require('request');
const cheerio = require('cheerio');
const url = `https://www.indeed.com/jobs?`;


function requestJob(param) {
  return new Promise( (resolve, reject) => {

    request({url:url, qs:param}, (error, response, body) => {
      if(error) {
        reject(error);
        return;
      }

      const $ = cheerio.load(body, {
        xml: { normalizeWhitespace: true },
      });

      if( $('#searchCount').text() ) {
        let numOfJobs = parseInt($('#searchCount').text().split(' ')[4].replace(',',""));
        resolve(numOfJobs);
      } else {
        resolve(0);
     }
    });

  });
}

module.exports = requestJob;
