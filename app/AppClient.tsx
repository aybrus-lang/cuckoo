"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";

import SenderView from "./components/SenderView";
import ReceiverView from "./components/ReceiverView";

import { db } from "@/lib/firebase";


import {
  collection,
  addDoc,
  onSnapshot,
  updateDoc,
  doc,
  query,
  orderBy,
} from "firebase/firestore";

/* =======================
   Types
======================= */

type Notification = {
  id: string;
  creator: string;
  message: string;
  time: string;
  expiresAt: number;
};

type Invitation = {
  id: string;
  name: string;
  status: "invited" | "accepted" | "rejected";
};

/* =======================
   App
======================= */

export default function AppClient() {
  const searchParams = useSearchParams();
  const inviteToken = searchParams.get("invite");

  const ROLE: "sender" | "receiver" = inviteToken ? "receiver" : "sender";

  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [invitations, setInvitations] = useState<Invitation[]>([]);
  const [inviteName, setInviteName] = useState("");
  const [acceptedMessage, setAcceptedMessage] = useState<string | null>(null);
  const [now, setNow] = useState(Date.now());

  /* =======================
     Live Firestore sync
  ======================= */

  useEffect(() => {
    const notifQuery = query(
      collection(db, "notifications"),
      orderBy("expiresAt", "desc")
    );

    const unsubNotifs = onSnapshot(notifQuery, (snapshot) => {
      const data = snapshot.docs.map((d) => {
        const raw = d.data() as Omit<Notification, "id">;
        return { id: d.id, ...raw };
      });
      setNotifications(data);
    });

    const inviteQuery = query(collection(db, "invitations"));

    const unsubInvites = onSnapshot(inviteQuery, (snapshot) => {
      const data = snapshot.docs.map((d) => {
        const raw = d.data() as Omit<Invitation, "id">;
        return { id: d.id, ...raw };
      });
      setInvitations(data);
    });

    return () => {
      unsubNotifs();
      unsubInvites();
    };
  }, []);

  /* =======================
     Clock
  ======================= */

  useEffect(() => {
    const interval = setInterval(() => setNow(Date.now()), 60_000);
    return () => clearInterval(interval);
  }, []);

  /* =======================
     Actions
  ======================= */

  async function sendNotification() {
    await addDoc(collection(db, "notifications"), {
      creator: "Creator",
      message: "A moment just happened",
      time: new Date().toLocaleTimeString(),
      expiresAt: Date.now() + 1000 * 60 * 60 * 6,
    });
  }

  async function sendInvite() {
    if (!inviteName.trim()) return;

    await addDoc(collection(db, "invitations"), {
      name: inviteName.trim(),
      status: "invited",
    });

    setInviteName("");
  }

  async function acceptInvite(id: string) {
    await updateDoc(doc(db, "invitations", id), {
      status: "accepted",
    });

    setAcceptedMessage("You are now included.");
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

  const hasAccess = invitations.some((i) => i.status === "accepted");

  /* =======================
     Render
  ======================= */

  if (ROLE === "receiver") {
    return (
      <ReceiverView
        invitations={invitations}
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
