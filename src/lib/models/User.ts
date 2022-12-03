import { Schema, model, models, Types } from 'mongoose';

export interface IUser {
  pseudo: string;
  email: string;
  password: string;
  pushTokens?: Object[];
  profileImg?: string;
  createdAt?: Date;
  modifiedAt?: Date;
  _id?: string;
}

const userSchema = new Schema<IUser>({
  pseudo: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  pushTokens: Array,
  profileImg: String,
}, { timestamps: true });

export default models.User || model('User', userSchema);;