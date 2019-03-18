const MongoClient = require('mongodb').MongoClient;
const url = 'mongodb://localhost:27017';

class Db {
  constructor({ dbName, collectionName }) {
    this.client = new MongoClient(url, {useNewUrlParser: true});
    this.db = dbName;
    this.collection = collectionName;
  }

  insertOne(obj) {
    return new Promise( (resolve, reject) => {
      this.client.connect( err => {
        if(err) {
          console.log(err);
          return;
        }

        const db = this.client.db(this.db).collection(this.collection);
        db.insertOne(obj, err => {
          if(err) {
            throw(err);
            return;
          }
          resolve(true);
          this.client.close();
        });
      });
    });
  }
}

module.exports = Db;

