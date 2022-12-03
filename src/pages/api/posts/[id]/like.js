import mongoose from "mongoose";
import Post from "../../../../lib/models/Post";
import notify from "../../../../lib/notify";

export default async function handler(req, res) {
  try {
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
        // notify.notifyOne({ title: "New Like By #" + subscription?.keys?.p256dh?.slice(0, 8) + " !", message: post.content }, post.subscriber);

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
