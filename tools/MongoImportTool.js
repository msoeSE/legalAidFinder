let mongoose = require('mongoose');
let async = require('async');
const Schema = mongoose.Schema;

// Set native promises as mongoose promise
mongoose.Promise = global.Promise;
const mongoURL = 'mongodb://LAF:ZBZMOVcIa6eWAaEg@cluster0-shard-00-00-fjfgt.mongodb.net:27017,cluster0-shard-00-01-fjfgt.mongodb.net:27017,cluster0-shard-00-02-fjfgt.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin';

// MongoDB Connection
mongoose.connect(mongoURL, (error) => {
  if (error) {
    console.error('Please make sure Mongodb is installed and running!'); // eslint-disable-line no-console
    throw error;
  }
});

const agenciesSchema = new Schema({
  _id: { type: Schema.Types.ObjectId },
  name: { type: 'String', required: true },
  categories: [{ type: Schema.Types.ObjectId, ref: 'categories' }],
  url: { type: 'String' },
}, { versionKey: false });
const Agency = mongoose.model('import_agencies', agenciesSchema);
const categoriesSchema = new Schema({
  _id: { type: Schema.Types.ObjectId },
  name: { type: 'String', required: true },
  parent: { type: Schema.Types.ObjectId, default: null },
  subcategories: [{ type: Schema.Types.ObjectId, ref: 'categories' }],
  agencies: [{ type: Schema.Types.ObjectId, ref: 'agencies' }],
}, { versionKey: false });
const Category = mongoose.model('import_categories', categoriesSchema);

const readline = require('readline');
const fs = require('fs');
let isHeader = true;
let headers = [];
let agenciesMap = new Map();
let categoryStack = [];
let categoryCounter = 0;
let deepestDepth = 0;
let calls = [];
let calls2 = [];

function getLastCategory() {
  return categoryStack[categoryStack.length - 1];
}

if (process.argv.length < 3) {
  throw new Error('TSV File not provided as argument');
}

function mainCategoryCreator(name) {
  const newCategory = new Category();
  newCategory._id = mongoose.Types.ObjectId();
  newCategory.name = name;
  calls.push(callback => {
    newCategory.save((error, saved) => {
      if (error) {
        console.log(error);
      }
      console.log(saved);
      callback(null, name);
    });
  });
  categoryStack.push({ name: newCategory.name, _id: newCategory._id });
}

function subCategoryCreator(name, parentId) {
  const newCategory = new Category();
  newCategory._id = mongoose.Types.ObjectId();
  newCategory.name = name;
  newCategory.parent = parentId;
  calls.push(callback => {
    newCategory.save((error, saved) => {
      if (error) {
        console.log(error);
      }
      console.log(saved);
      calls2.push(callback2 => {
        Category.update({ _id: parentId }, { $addToSet: { subcategories: newCategory._id } }, (error2, saved2) => {
          console.log(saved2);
          callback2(null, name);
        });
      });

      callback(null, name);
    });
  });
  categoryStack.push({ name: newCategory.name, _id: newCategory._id });
}

function createAgency(name) {
  const newAgency = new Agency();
  var nameAndUrl = name.split(':');
  newAgency._id = mongoose.Types.ObjectId();
  newAgency.name = nameAndUrl[0];
  if (nameAndUrl.length > 1){
    newAgency.url = nameAndUrl[1];
  } else {
    newAgency.url = `https://www.google.com/search?q=${nameAndUrl[0]}`;
  }
  newAgency.save((error, saved) => {
    if (error) {
      console.log(error);
    }
    console.log(saved);
    agenciesMap.set(newAgency.name, newAgency._id);
  });
}

function addAgencyToSubCategory(agencyNameAndUrl, parentId) {
  var values = agencyNameAndUrl.split(':');

  calls2.push(callback2 => {
    Agency.findOne({ name: values[0] }, (err, agency) => {
      Category.update({ _id: parentId }, { $addToSet: { agencies: agency._id } }, (error, saved) => {
        console.log(saved);
        callback2(null, values[0]);
      });
    });
  });
}

const rl = readline.createInterface({
  input: fs.createReadStream(process.argv[2])
});

var lastCategory;
rl.on('line', line => {
  if (isHeader === true) {
    headers = line.split('\t');
    headers.forEach(value => {
      if (value !== 'Main Category' && value !== 'Sub Category') {
        createAgency(value);
      } else {
        categoryCounter++;
      }
    });

    isHeader = false;
  } else {
    let currentValue = line.split('\t');

    for (let i = 0; i < headers.length; i++) {
      if (headers[i] === 'Main Category') {
        if (currentValue[i] !== '') {
          mainCategoryCreator(currentValue[i]);
          deepestDepth++;
        }
      } else if (headers[i] === 'Sub Category') {
        if (currentValue[i] !== '') {
          console.log(`Current Depth: ${deepestDepth} and Current Index: ${i}`);
          while (deepestDepth >= i + 1) {
            console.log(`Popped: ${categoryStack.pop().name}`);
            deepestDepth--;
          }

          subCategoryCreator(currentValue[i], getLastCategory()._id);

          if ((currentValue[i + 1] === '' && headers[i + 1] === 'Sub Category') || deepestDepth === categoryCounter) {
            lastCategory = categoryStack.pop();
            console.log(`Popped: ${lastCategory.name}`);
          } else {
            deepestDepth++;
          }
        }
      } else { // Legal agency
        if (currentValue[i] !== undefined && currentValue[i].toLowerCase() === 'x') {
          addAgencyToSubCategory(headers[i], lastCategory._id);
        }
      }
    }
  }
});

rl.on('close', () => {
  async.parallel(calls, (err, result) => {
    /* this code will run after all calls finished the job or
       when any of the calls passes an error */
    if (err)
      return console.log(err);
    console.log(result);
    async.parallel(calls2, (err, result) => {
      /* this code will run after all calls finished the job or
         when any of the calls passes an error */
      if (err)
        return console.log(err);
      console.log(result);
    });
  });
});

