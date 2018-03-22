import Express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cors from 'cors';
import categories from './server/routes/category.routes';
import eligibility from './server/routes/eligibility.routes';
import agencies from './server/routes/agency.routes';
import counties from './server/routes/counties.routes';
import admins from './server/routes/admin.routes';
import serverConfig from './server/config';

// Set native promises as mongoose promise
mongoose.Promise = global.Promise;

// MongoDB Connection
mongoose.connect(serverConfig.mongoURL, (error) => {
  if (error) {
    console.error('Please make sure Mongodb is installed and running!'); // eslint-disable-line no-console
    throw error;
  }

    // feed some dummy data in DB.
    // dummyData();
});

const app = Express();
app.set('port', process.env.PORT || 3001);
app.options('*', cors());
app.use(cors());

// Express only serves static assets in production
if (process.env.NODE_ENV === 'production') {
  app.use(Express.static('client/build'));
}

app.use(bodyParser({ limit: '50mb' }));
app.use(bodyParser.urlencoded({ extended: true })); // Parses urlencoded bodies
app.use(bodyParser.json()); // Send JSON responses
app.use(cors());

app.use('/api', categories); // categories routes
app.use('/api', eligibility); // eligibility routes
app.use('/api', agencies); // agencies routes
app.use('/api', counties); // counties routes
app.use('/api', admins); // admins routes

app.listen(app.get('port'), () => {
  console.log(`Find the server at: http://localhost:${app.get('port')}/`); // eslint-disable-line no-console
});
