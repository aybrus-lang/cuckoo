import { getMessaging, getToken, onMessage } from "firebase/messaging";
import { app } from "./firebase";

export const messaging = getMessaging(app);

export async function requestNotificationPermission() {
  const permission = await Notification.requestPermission();

  if (permission === "granted") {
    const token = await getToken(messaging, {
      vapidKey: "PASTE_YOUR_VAPID_KEY_HERE",
    });

    return token;
  }

  return null;
}

export function listenForMessages() {
  onMessage(messaging, (payload) => {
    console.log("Push received:", payload);
  });
}
