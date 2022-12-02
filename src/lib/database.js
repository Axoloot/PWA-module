
import { connect, model } from 'mongoose'
import PostSchema, { IPost } from './models/Post';
import userSchema, { IUser } from './models/User';
const MONGODB_URI = process.env.MONGODB_URI

if (!MONGODB_URI) {
  throw new Error(
    'Please define the MONGODB_URI environment variable inside .env.local'
  )
}

/**
 * Global is used here to maintain a cached connection across hot reloads
 * in development. This prevents connections growing exponentially
 * during API Route usage.
 */
let cached = global.mongoose

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null }
}

async function dbConnect() {
  if (cached.conn) {
    return cached.conn
  }

  if (!cached.promise) {
    const opts = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }

    cached.promise = connect(MONGODB_URI, opts).then(mongoose => {
      return mongoose
    }).catch((err) => console.error(global.mongoose))
  }
  cached.conn = await cached.promise
  return cached.conn;
}

dbConnect();

const Post = model < IPost > ('Post', PostSchema);
const User = model < IUser > ('User', userSchema);



export default { db: cached.conn, Post, User };
