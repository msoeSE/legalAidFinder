import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const agenciesSchema = new Schema({
  _id: { type: Schema.Types.ObjectId },
  name: { type: 'String', required: true },
  phone: { type: 'String', required: true },
  operation: [{ type: Schema.Types.String}],
  emails: [{ type: Schema.Types.String }],
  counties: [{type: Schema.Types.String}],
  url: { type: 'String', required: true },
});

export default mongoose.model('agencies', agenciesSchema);
