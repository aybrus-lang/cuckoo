"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

import SenderView from "./components/SenderView";
import ReceiverView from "./components/ReceiverView";

import { db } from "./lib/firebase";
import { Invitation, Notification } from "./lib/types";


import {
  collection,
  addDoc,
  onSnapshot,
  updateDoc,
  doc,
  query,
  orderBy,
} from "firebase/firestore";

export default function AppClient() {
  const searchParams = useSearchParams();
  const inviteToken = searchParams.get("invite");

  const ROLE: "sender" | "receiver" = inviteToken ? "receiver" : "sender";

  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [invitations, setInvitations] = useState<Invitation[]>([]);
  const [activeInvite, setActiveInvite] = useState<Invitation | null>(null);

  const [inviteName, setInviteName] = useState("");
  const [acceptedMessage, setAcceptedMessage] = useState<string | null>(null);
  const [now, setNow] = useState(Date.now());

  /* =======================
     Live Firestore sync
  ======================= */

  useEffect(() => {
    const notifQuery = query(collection(db, "notifications"), orderBy("expiresAt", "desc"));

    const unsubNotifs = onSnapshot(notifQuery, (snapshot) => {
      const data = snapshot.docs.map((d) => {
        const raw = d.data() as Omit<Notification, "id">;
        return { id: d.id, ...raw };
      });

      if (activeInvite) {
        setNotifications(data.filter((n) => n.inviteId === activeInvite.id));
      } else {
        setNotifications([]);
      }
    });

    const unsubInvites = onSnapshot(collection(db, "invitations"), (snapshot) => {
      const data = snapshot.docs.map((d) => {
        const raw = d.data() as Omit<Invitation, "id">;
        return { id: d.id, ...raw };
      });

      setInvitations(data);

      if (inviteToken) {
        const match = data.find((i) => i.token === inviteToken);
        setActiveInvite(match || null);
      }
    });

    return () => {
      unsubNotifs();
      unsubInvites();
    };
  }, [inviteToken, activeInvite]);

  /* =======================
     Clock
  ======================= */

  useEffect(() => {
    const interval = setInterval(() => setNow(Date.now()), 60000);
    return () => clearInterval(interval);
  }, []);

  /* =======================
     Actions
  ======================= */

  async function sendNotification() {
    const acceptedInvites = invitations.filter((i) => i.status === "accepted");

    for (const invite of acceptedInvites) {
      await addDoc(collection(db, "notifications"), {
        inviteId: invite.id,
        creator: "Someone who chose you",
        message: "A moment just happened",
        expiresAt: Date.now() + 1000 * 60 * 60 * 6,
      });
    }
  }

  async function sendInvite() {
  if (!inviteName.trim()) return;

  const token = Math.random().toString(36).substring(2, 10);

  console.log("Creating invite:", inviteName, token);

  await addDoc(collection(db, "invitations"), {
    name: inviteName.trim(),
    status: "invited",
    token,
  });

  setInviteName("");
}

  async function acceptInvite(id: string) {
    await updateDoc(doc(db, "invitations", id), {
      status: "accepted",
    });

    setAcceptedMessage("accepted");
    setTimeout(() => setAcceptedMessage(null), 2500);
  }

  async function rejectInvite(id: string) {
    await updateDoc(doc(db, "invitations", id), {
      status: "rejected",
    });
  }

  function dismissNotification(id: string) {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  }

  const hasAccess = activeInvite?.status === "accepted";

  /* =======================
     Render
  ======================= */

  if (ROLE === "receiver") {
    return (
      <ReceiverView
        invitations={activeInvite ? [activeInvite] : []}
        acceptInvite={acceptInvite}
        rejectInvite={rejectInvite}
        hasAccess={hasAccess}
        notificationsByCreator={{
          Creator: notifications,
        }}
        dismissNotification={dismissNotification}
        acceptedMessage={acceptedMessage}
        now={now}
      />
    );
  }

  return (
    <SenderView
      sendNotification={sendNotification}
      sendInvite={sendInvite}
      inviteName={inviteName}
      setInviteName={setInviteName}
      invitations={invitations}
    />
  );
}
