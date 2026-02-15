import { Schema, Types, model } from 'mongoose';

interface Card {
  name: string,
  link: string
  owner: Types.ObjectId,
  likes: Types.ObjectId,
  createdAt: Date,
}

const cardSchema = new Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  link: {
    type: String,
    required: true,
  },
  owner: {
    type: Types.ObjectId,
    ref: 'user',
    required: true,
  },
  likes: [{
    type: Types.ObjectId,
    default: [],
  }],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

export default model<Card>('card', cardSchema);
