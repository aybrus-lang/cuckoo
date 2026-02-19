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
    setAcceptedMessage("Access confirmed. You are now part of a privileged experience.");
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

  // Receiver route
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

  // Sender screen
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

  // Dark sensual homepage
  return (
    <main
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: 24,
        background:
          "radial-gradient(circle at 50% 30%, #1a1a1a 0%, #0a0a0a 60%)",
        color: "white",
        textAlign: "center",
      }}
    >
      <div
        style={{
          maxWidth: 520,
          width: "100%",
          padding: 32,
          borderRadius: 18,
          background: "rgba(255,255,255,0.04)",
          backdropFilter: "blur(10px)",
          boxShadow: "0 20px 60px rgba(0,0,0,0.6)",
        }}
      >
        <div style={{ fontSize: 42, marginBottom: 12 }}>🐦</div>

        <h1
          style={{
            fontSize: 32,
            fontWeight: 600,
            letterSpacing: "-0.02em",
            marginBottom: 16,
          }}
        >
          Give access to the chosen few.
        </h1>

        <p
          style={{
            fontSize: 16,
            lineHeight: 1.6,
            opacity: 0.7,
            marginBottom: 30,
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
            border: "1px solid rgba(255,255,255,0.15)",
            fontSize: 16,
            fontWeight: 500,
            background: "rgba(255,255,255,0.08)",
            color: "white",
            cursor: "pointer",
          }}
        >
          Start Sending
        </button>

        <div
          style={{
            marginTop: 24,
            fontSize: 13,
            opacity: 0.45,
            letterSpacing: "0.08em",
          }}
        >
          PRIVATE • SELECTIVE • INTENTIONAL
        </div>
      </div>
    </main>
  );
}
