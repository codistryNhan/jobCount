const Db = require('./modules/Db');
const requestJob = require('./modules/requestJob');
const locations = require('./modules/locationList').countries;
const languages = require('./modules/languageList');

let urlParams = [];

for(location of locations) {
  for(language of languages) {
    urlParams.push({q:language, l:location});
  }
}

//Send each requests every 5 seconds
urlParams.forEach( (param, i) => {
  setTimeout(() => {
    jobObj = {
      language: param.q,
      location: param.l,
      date: new Date(),
      city: true,
      jobCount: 0
    };

    requestJob(param).then( jobCount => {
      jobObj.jobCount = jobCount;

      const db = new Db({dbName: 'codistry', collectionName:'jobCountsByCountry'});
      db.insertOne(jobObj);
    });

  }, i * 5000);
});
