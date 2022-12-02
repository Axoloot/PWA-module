import mongoose, { Schema, model } from 'mongoose';

export interface IUser {
  id: string;
  pseudo: string;
  email: string;
  password: string;
  pushTokens?: Object[];
  profileImg?: string;
}

const userSchema = new mongoose.Schema<IUser>({
  id: { type: String, required: true },
  pseudo: { type: String, required: true },
  email: { type: String, required: true },
  password: { type: String, required: true },
  pushTokens: Array,
  profileImg: String,
});

const Usermodel =  mongoose.models.User || model('User', userSchema);

export default Usermodel;