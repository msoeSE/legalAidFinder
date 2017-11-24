import mongoose from 'mongoose';
import keyComparatorValue from './keyComparatorValue';

const Schema = mongoose.Schema;

const eligibilitySchema = new Schema({
  _id: { type: Schema.Types.ObjectId },
  category: { type: Schema.Types.ObjectId, ref: 'categories' },
  agency: { type: Schema.Types.ObjectId, ref: 'agencies' },
  key_comparator_value: [keyComparatorValue],
});

export default mongoose.model('eligibility', eligibilitySchema);
