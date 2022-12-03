import { model, models, Schema, Types } from "mongoose";
export interface IPost {
  _id?: string;
  title: string;
  content: string;
  likes?: number;

  author: string;
  authorImg: string;
  geolocation?: {
    lat: number;
    lng: number;
  }
  createdAt?: Date;
  modifiedAt?: Date;
  userId?: string;
}

const PostSchema = new Schema<IPost>({
  title: { type: String, required: true },
  content: { type: String, required: true },
  likes: { type: Number, default: 0 },
  author: { type: String, required: true },
  authorImg: { type: String, required: true },
  userId: { type: String, required: true },
  geolocation: Object,
}, { timestamps: true });

export default models.Post || model("Post", PostSchema);
