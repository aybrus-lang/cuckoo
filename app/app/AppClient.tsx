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

  function sendInvite() {
    if (!inviteName.trim()) return;
    const newInvite: Invitation = {
      id: Date.now(),
      name: inviteName.trim(),
      status: "invited",
    };
    setInvitations((prev) => [newInvite, ...prev]);
    setInviteName("");
  }

  function sendNotification() {
    const newNotification: Notification = {
      id: Date.now(),
      creator: "Alex",
      message: "New moment",
      time: new Date().toLocaleTimeString(),
      emoji: "•",
      expiresAt: Date.now() + 1000 * 60 * 60,
    };
    setNotifications((prev) => [newNotification, ...prev]);
  }

  function acceptInvite(id: number) {
    setInvitations((prev) =>
      prev.map((invite) =>
        invite.id === id ? { ...invite, status: "accepted" } : invite
      )
    );
    setAcceptedMessage("Access confirmed");
  }

  function rejectInvite(id: number) {
    setInvitations((prev) =>
      prev.map((invite) =>
        invite.id === id ? { ...invite, status: "rejected" } : invite
      )
    );
  }

  function dismissNotification(id: number) {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  }

  const hasAccess = invitations.some(
    (invite) => invite.status === "accepted"
  );

  const notificationsByCreator = {
    Alex: notifications,
  };

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
    <main style={{ padding: 24, textAlign: "center" }}>
      <h1>Give access to the chosen few.</h1>
      <p>
        Cuckoo lets you invite, notify, and include selected people in
        real-time experiences — privately and on your terms.
      </p>

      <button
        onClick={() => setMode("sender")}
        style={{
          padding: "12px 20px",
          borderRadius: 8,
          border: "none",
          background: "#111",
          color: "#fff",
          cursor: "pointer",
        }}
      >
        Start Sending
      </button>
    </main>
  );
}
