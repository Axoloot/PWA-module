import "src/lib/database";
import User from "src/lib/models/User";
import { authOptions } from "src/pages/api/auth/[...nextauth]";
import { unstable_getServerSession } from "next-auth/next";

export default async function handler(req, res) {
  try {
    let user = null;
    const session = await unstable_getServerSession(req, res, authOptions);

    if (!session || !(user = await User.findOne({ email: session.user?.email }).exec())) {
      return (res.status(401).json({ message: "You must be logged in." }));
    }
    if (!req.body?.endpoint || !req.body?.keys?.auth || !req.body?.keys?.p256dh) {
      return (res.status(400).json({ error: "Bad Request" }));
    }

    const pushToken = user.pushTokens.findIndex((token) => (
      token.endpoint === req.body.endpoint
      && token.keys.auth === req.body.keys.auth
      && token.keys.p256dh === req.body.keys.p256dh
    ));

    switch (req.method) {
      case ("POST"):
        if (pushToken < 0) {
          user.pushTokens.push(req.body);
          user.save();

          return (res.status(200).json(user));
        }
        return (res.status(200).json(user));

      case ("DELETE"):
        if (pushToken < 0) {
          return (res.status(404).json({ error: "Not found" }));
        }
        user.pushTokens.splide(pushToken, 1);
        user.save();

        return (res.status(200).json({ success: "true" }));

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
