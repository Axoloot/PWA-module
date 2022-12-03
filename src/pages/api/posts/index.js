import "src/lib/database";
import User from "src/lib/models/User";
import { authOptions } from "src/pages/api/auth/[...nextauth]";
import { unstable_getServerSession } from "next-auth/next";
import Post from "../../../lib/models/Post";

import notify from "src/lib/notify";

export default async function handler(req, res) {
  try {
    switch (req.method) {
      case ("GET"):
        const posts = await Post.find({}, null, { sort: { createdAt: -1 } });

        return (res.status(200).json(posts));

      case ("POST"):
        let user = null;
        const session = await unstable_getServerSession(req, res, authOptions);

        if (!session || !(user = await User.findOne({ email: session.user?.email }).exec())) {
          return (res.status(401).json({ message: "You must be logged in." }));
        }

        const post = await Post(req.body).save();
        notify.notifyAll({ title: "New post from " + user.pseudo, message: post.content }, [ user.pushTokens ]);

        return (res.status(201).json(post));

      default:
        return (res.status(405).json({ error: "Method Not Allowed" }));
    }
  } catch (err) {
    if ("statusCode" in err) {
      return (res.writeHead(err.statusCode, err.headers).json({ error: err.body }));
    } else {
      console.error(err);
      return (res.status(500).end());
    }
  }
};
