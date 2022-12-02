

import UserModel from '../../../lib/models/User';

export default function handler(req, res) {
  try {

    switch (req.method) {
      case ("POST"):
        const newUser = new UserModel(req.body);
        newUser.save();
        return (res.status(200).json(newUser));

      case ("DELETE"):
        if (!subscription) {
          return (res.status(404).json({ error: "Not found" }));
        }
        db.subscriptions.remove(subscription);

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
