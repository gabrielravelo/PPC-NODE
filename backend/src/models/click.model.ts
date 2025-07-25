import { Schema, model, Document, Types } from 'mongoose'

export interface IClick extends Document {
  user: Types.ObjectId
  ad: Types.ObjectId
  createdAt: Date
}

const clickSchema = new Schema<IClick>(
  {
    user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
    ad: { type: Schema.Types.ObjectId, ref: 'Ad', required: true },
  },
  { timestamps: true }
)

export const Click = model<IClick>('Click', clickSchema)
