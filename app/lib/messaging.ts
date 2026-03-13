import { getMessaging, getToken, onMessage, isSupported } from "firebase/messaging";
import { app } from "./firebase";

export async function requestNotificationPermission() {
  if (typeof window === "undefined") return null;

  const supported = await isSupported();
  if (!supported) return null;

  const messaging = getMessaging(app);

  const permission = await Notification.requestPermission();

  if (permission === "granted") {
    const token = await getToken(messaging, {
      vapidKey: "PASTE_YOUR_VAPID_KEY_HERE",
    });

    console.log("Push token:", token);
    return token;
  }

  return null;
}

export async function listenForMessages() {
  if (typeof window === "undefined") return;

  const supported = await isSupported();
  if (!supported) return;

  const messaging = getMessaging(app);

  onMessage(messaging, (payload) => {
    console.log("Push received:", payload);
  });
}
