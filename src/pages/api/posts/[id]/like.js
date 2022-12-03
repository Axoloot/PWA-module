import "src/lib/database";
import mongoose from "mongoose";
import Post from "../../../../lib/models/Post";
import User from "../../../../lib/models/User";
import { authOptions } from "src/pages/api/auth/[...nextauth]";
import { unstable_getServerSession } from "next-auth/next";
import notify from "../../../../lib/notify";

export default async function handler(req, res) {
  try {
    let user = null;
    const session = await unstable_getServerSession(req, res, authOptions);

    if (!session || !(user = await User.findOne({ email: session.user?.email }).exec())) {
      return (res.status(401).json({ message: "You must be logged in." }));
    }
    let { id } = req.query;
    const post = await Post.findOne({ id });

    if (!post) {
      return (res.status(404).json({ error: "Not found" }));
    }
    // let subscription = Subscriptions.findOne({ "keys.auth": req.body.keys.auth });

    // if (!subscription) {
    //   subscription = Subscriptions.insert(req.body);
    // }

    switch (req.method) {

      case ("POST"):
        await Post.findOneAndUpdate(
          { _id: new mongoose.Types.ObjectId(id) },
          { $inc: { likes: 1 } }
        );

        post.likes += 1;

        console.log(post);
        const author = await User.findOne({ $or: [{ pseudo: post.author }, { _id: post.createdBy }] });
        
        if (author) {
          notify.notifyOne({ title: "New Like By " + user.pseudo + " !", message: post.content }, author);
        }

        return (res.status(201).json(post));

      case ("DELETE"):
        post.likes = post.likes.filter((like) => like != subscription.keys.p256dh);
        Post.update(post);

        return (res.status(200).json(post));

      default:
        return (res.status(405).json({ error: "Method Not Allowed" }));
    }
  } catch (err) {
    if ("statusCode" in err) {
      return (res.writeHead(err.statusCode, err.headers).json({ error: err.body }));
    } else {
      console.error(err);
      return (res.status(500).end(err));
    }
  }
};
