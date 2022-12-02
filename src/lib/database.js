
import { connect } from 'mongoose'
import PostSchema from './models/Post';
import userSchema from './models/User';
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

  if (cached.conn) {
    return cached.conn
  }

  if (!cached.promise) {
    const opts = {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      bufferCommands: false,
      bufferMaxEntries: 0,
      useFindAndModify: true,
      useCreateIndex: true
    }

    cached.promise = connect(MONGODB_URI, opts).then(mongoose => {
      return mongoose
    })
  }

  const Post = model<IPost>('Post', PostSchema);
  const User = model<IUser>('User', userSchema);

  cached.conn = await cached.promise


export default { db: cached.conn, Post, User };
