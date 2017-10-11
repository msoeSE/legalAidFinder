import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const agenciesSchema = new Schema({
  _id: { type: Schema.Types.ObjectId },
  name: { type: 'String', required: true },
  categories: [{ type: Schema.Types.ObjectId, ref: 'categories' }],
  url: { type: 'String', required: true },
});

export default mongoose.model('agencies', agenciesSchema);
