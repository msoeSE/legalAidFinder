import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const categoriesSchema = new Schema({
  _id: { type: Schema.Types.ObjectId },
  name: { type: 'String', required: true },
  parent: { type: Schema.Types.ObjectId, default: null },
  subcategories: [{ type: Schema.Types.ObjectId, ref: 'import_categories' }],
  agencies: [{type: Schema.Types.ObjectId, ref: 'import_agencies' }],
});

export default mongoose.model('import_categories', categoriesSchema);
