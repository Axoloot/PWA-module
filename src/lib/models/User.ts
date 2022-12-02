import { Schema, model, models } from 'mongoose';

export interface IUser {
  pseudo: string;
  email: string;
  password: string;
  pushTokens?: Object[];
  profileImg?: string;
}

const userSchema = new Schema<IUser>({
  pseudo: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  pushTokens: Array,
  profileImg: String,
});

export default models.User || model('User', userSchema);;