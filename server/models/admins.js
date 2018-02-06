import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const adminsSchema = new Schema({
  _id: { type: Schema.Types.ObjectId },
  email: { type: 'String', required: true },
});

export default mongoose.model('admins', adminsSchema);
