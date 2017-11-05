import mongoose from 'mongoose';
import mockgoose from 'mockgoose';

export function connectDB(t, done) {
  mockgoose(mongoose).then(() => {
    mongoose.createConnection('mongodb://LAF:ZBZMOVcIa6eWAaEg@cluster0-shard-00-00-fjfgt.mongodb.net:27017,cluster0-shard-00-01-fjfgt.mongodb.net:27017,cluster0-shard-00-02-fjfgt.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin', err => {
      if (err) t.fail('Unable to connect to test database');
      done();
    });
  });
}

export function dropDB(t) {
  mockgoose.reset(err => {
    if (err) t.fail('Unable to reset test database');
  });
}
