import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const keyComparatorValueSchema = new Schema({
  key: { type: 'String', required: true },
  comparator: { type: 'String', required: true },
  value: { type: 'String', required: true },
});

export default keyComparatorValueSchema;
