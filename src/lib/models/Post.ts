import { model, models, Schema } from "mongoose";

interface IPost {
  title: string;
  content: string;
  likes: number;
  author: string;
  geolocation: {
    lat: number;
    lng: number;
  }
}

const PostSchema = new Schema<IPost>({
  title: { type: String, required: true },
  content: { type: String, required: true },
  likes: { type: Number, default: 0 },
  author: { type: String, required: true },
  geolocation: Object,
});


export default models.Post || model("Post", PostSchema);
