import User from "./models/User";
import webpush from "web-push";

webpush.setVapidDetails(
  "mailto:notify@pwa-poc.dev",
  process.env.NEXT_PUBLIC_WEB_PUSH_PUBLIC_KEY,
  process.env.NEXT_PRIVATE_WEB_PUSH_PRIVATE_KEY
);

async function notifyAll(payload = { title: "", message: "" }, except = []) {
  try {
    const users = await User.find();
    const pushTokens = users.map(({ pushTokens }) => pushTokens).flat();

    except = except.map((pushToken) => (pushToken?.keys?.auth));


    pushTokens.forEach((pushToken) => {
        if (!except.includes(pushToken?.keys?.auth)) {
          webpush.sendNotification(pushToken, JSON.stringify(payload));
        }
      })
  } catch (err) {
    console.error(err);
  }
}

async function notifyOne(payload = { title: "", message: "" }, user = null) {

  try {
    if (!user) { return; }

    user.pushTokens.forEach((token) => {
      webpush.sendNotification(token, JSON.stringify(payload));
    });
  } catch (err) {
    console.error(err);
  }

}

export default { notifyAll, notifyOne };