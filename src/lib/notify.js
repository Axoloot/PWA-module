import { User } from "src/lib/database";
import webpush from "web-push";

webpush.setVapidDetails(
  "mailto:notify@pwa-poc.dev",
  process.env.NEXT_PUBLIC_WEB_PUSH_PUBLIC_KEY,
  process.env.NEXT_PRIVATE_WEB_PUSH_PRIVATE_KEY
);

async function notifyAll(payload = { title: "", message: "" }, except = []) {
  try {
    const user = User.find();
    const pushTokens = user.map(({ pushTokens }) => pushTokens).flat();

    except = except.map((subscriber) => (subscriber?.keys?.auth));


    pushTokens.forEach((subscriber) => {
        if (!except.includes(subscriber?.keys?.auth)) {
          webpush.sendNotification(subscriber, JSON.stringify(payload));
        }
      })
  } catch (err) {
    console.error(err);
  }
}

async function notifyOne(payload = { title: "", message: "" }, subscriber = null) {

  try {
    webpush.sendNotification(subscriber, JSON.stringify(payload));
  } catch (err) {
    console.error(err);
  }

}

export default { notifyAll, notifyOne };