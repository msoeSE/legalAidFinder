import mongoose from 'mongoose';
import keyComparatorValue from './key_comparator_value';

const Schema = mongoose.Schema;

const eligibilitySchema = new Schema({
  _id: { type: Schema.Types.ObjectId },
  category_id: { type: Schema.Types.ObjectId, ref: 'categories' },
  agency_id: { type: Schema.Types.ObjectId, ref: 'agencies' },
  key_comparator_value: [keyComparatorValue],
});

export default mongoose.model('eligibility', eligibilitySchema);
