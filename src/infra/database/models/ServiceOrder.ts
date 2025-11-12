import { Schema, model } from 'mongoose';

const schema = new Schema({
  organizationId: { type: Schema.Types.ObjectId, ref: 'Organization', required: true },
  humanId: { type: String, required: true },
  status: { type: String, required: true },
  client: {
    name: { type: String, required: true },
    phone: { type: String, required: true }
  },
  equipment: {
    brand: { type: String, required: true },
    model: { type: String, required: true },
    problemReported: { type: String, required: true }
  },
  observedState: [{ type: String }],
  accessories: [{ type: String }],
  notes: { type: String },
}, { timestamps: true });

schema.index({ organizationId: 1, humanId: 1 }, { unique: true });

export const serviceOrderSchema = model('ServiceOrder', schema);

