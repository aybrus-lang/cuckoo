"use client";

import { useSearchParams } from "next/navigation";
import { useState } from "react";
import SenderView from "./components/SenderView";
import ReceiverView from "./components/ReceiverView";

type Notification = {
  id: number;
  creator: string;
  message: string;
  time: string;
  emoji: string;
  expiresAt: number;
};

type Invitation = {
  id: number;
  name: string;
  status: "invited" | "accepted" | "rejected";
};

export default function AppClient() {
  const searchParams = useSearchParams();
  const invite = searchParams.get("invite");

  const [mode, setMode] = useState<"home" | "sender">("home");
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [invitations, setInvitations] = useState<Invitation[]>([]);
  const [inviteName, setInviteName] = useState("");
  const [acceptedMessage, setAcceptedMessage] = useState<string | null>(null);

  const hasAccess = invitations.some((i) => i.status === "accepted");
  const notificationsByCreator = { Alex: notifications };

  function sendInvite() {
    if (!inviteName.trim()) return;
    setInvitations([
      { id: Date.now(), name: inviteName.trim(), status: "invited" },
      ...invitations,
    ]);
    setInviteName("");
  }

  function sendNotification() {
    setNotifications([
      {
        id: Date.now(),
        creator: "Alex",
        message: "New moment",
        time: new Date().toLocaleTimeString(),
        emoji: "•",
        expiresAt: Date.now() + 1000 * 60 * 60,
      },
      ...notifications,
    ]);
  }

  function acceptInvite(id: number) {
    setInvitations(
      invitations.map((invite) =>
        invite.id === id ? { ...invite, status: "accepted" } : invite
      )
    );
    setAcceptedMessage("Access confirmed");
  }

  function rejectInvite(id: number) {
    setInvitations(
      invitations.map((invite) =>
        invite.id === id ? { ...invite, status: "rejected" } : invite
      )
    );
  }

  function dismissNotification(id: number) {
    setNotifications(notifications.filter((n) => n.id !== id));
  }

  if (invite === "receiver") {
    return (
      <ReceiverView
        invitations={invitations}
        acceptInvite={acceptInvite}
        rejectInvite={rejectInvite}
        hasAccess={hasAccess}
        notificationsByCreator={notificationsByCreator}
        dismissNotification={dismissNotification}
        acceptedMessage={acceptedMessage}
        now={Date.now()}
      />
    );
  }

  if (mode === "sender") {
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

  return (
  <main
    style={{
      minHeight: "100vh",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: 24,
      background:
        "linear-gradient(180deg, #0a0a0a 0%, #111 40%, #0a0a0a 100%)",
      color: "white",
      textAlign: "center",
    }}
  >
    <div style={{ maxWidth: 520, width: "100%" }}>
      <div style={{ fontSize: 42, marginBottom: 10 }}>🐦</div>

      <h1
        style={{
          fontSize: 32,
          fontWeight: 600,
          letterSpacing: "-0.02em",
          marginBottom: 14,
        }}
      >
        Give access to the chosen few.
      </h1>

      <p
        style={{
          fontSize: 16,
          lineHeight: 1.6,
          opacity: 0.75,
          marginBottom: 28,
        }}
      >
        Cuckoo lets you invite, notify, and include selected people in
        real-time experiences — privately and on your terms.
      </p>

      <button
        onClick={() => setMode("sender")}
        style={{
          width: "100%",
          padding: "14px 18px",
          borderRadius: 12,
          border: "none",
          fontSize: 16,
          fontWeight: 500,
          background: "white",
          color: "black",
          cursor: "pointer",
          transition: "transform 0.15s ease, box-shadow 0.15s ease",
          boxShadow: "0 6px 18px rgba(255,255,255,0.15)",
        }}
        onMouseDown={(e) => {
          e.currentTarget.style.transform = "scale(0.98)";
        }}
        onMouseUp={(e) => {
          e.currentTarget.style.transform = "scale(1)";
        }}
      >
        Start Sending
      </button>

      <div
        style={{
          marginTop: 24,
          fontSize: 13,
          opacity: 0.45,
        }}
      >
        Private. Selective. Intentional.
      </div>
    </div>
  </main>
);
