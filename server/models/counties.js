import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const countiesSchema = new Schema({
    _id: { type: Schema.Types.ObjectId },
    name: { type: 'String', required: true },
    state: { type: 'String', required: true },
});

export default mongoose.model('counties', countiesSchema);