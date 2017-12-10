import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const eligibilitySchema = new Schema({
  _id: { type: Schema.Types.ObjectId },
  category: { type: Schema.Types.ObjectId },
  agency: { type: Schema.Types.ObjectId },
  key_comparator_value: [{
    key: { type: 'String', required: true },
    comparator: { type: 'String', required: true },
    value: { type: 'String', required: true },
  }],
});

export default mongoose.model('eligibility', eligibilitySchema);
