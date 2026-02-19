"use client";
export const dynamic = "force-dynamic";

import { useSearchParams } from "next/navigation";
import { useState } from "react";

import SenderView from "./components/SenderView";
import ReceiverView from "./components/ReceiverView";

/* =======================
   Types
======================= */

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

/* =======================
   Page
======================= */

export default function Home() {
  const searchParams = useSearchParams();
  const inviteToken = searchParams.get("invite");

  const [mode, setMode] = useState<"home" | "sender">(
    inviteToken ? "sender" : "home"
  );

  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [invitations, setInvitations] = useState<Invitation[]>([]);
  const [inviteName, setInviteName] = useState("");

  const ROLE: "sender" | "receiver" = inviteToken
    ? "receiver"
    : "sender";

  /* =======================
     Actions
  ======================= */

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
  }

  function rejectInvite(id: number) {
    setInvitations((prev) =>
      prev.map((invite) =>
        invite.id === id ? { ...invite, status: "rejected" } : invite
      )
    );
  }

  function dismissNotification(id: number) {
    setNotifications((prev) =>
      prev.filter((n) => n.id !== id)
    );
  }

  const hasAccess = invitations.some(
    (invite) => invite.status === "accepted"
  );

  const notificationsByCreator = {
    Alex: notifications,
  };

  /* =======================
     Receiver Mode
  ======================= */

  if (ROLE === "receiver") {
    return (
      <ReceiverView
        invitations={invitations}
        acceptInvite={acceptInvite}
        rejectInvite={rejectInvite}
        hasAccess={hasAccess}
        notificationsByCreator={notificationsByCreator}
        dismissNotification={dismissNotification}
        acceptedMessage={null}
        now={Date.now()}
      />
    );
  }

  /* =======================
     Sender Mode
  ======================= */

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

  /* =======================
     Homepage
  ======================= */

  return (
    <main style={styles.page}>
      <section style={styles.hero}>
        <h1 style={styles.headline}>
          Give access to the chosen few.
        </h1>

        <p style={styles.subheadline}>
          Cuckoo lets you invite, notify, and include selected people in
          real-time experiences — privately and on your terms.
        </p>

        <button
          style={styles.primaryButton}
          onClick={() => setMode("sender")}
        >
          Start Sending
        </button>

        <p style={styles.subtle}>
          Private. Intentional. Invitation-only.
        </p>
      </section>
    </main>
  );
}

/* =======================
   Styles
======================= */

const styles: Record<string, React.CSSProperties> = {
  page: {
    fontFamily: "system-ui, sans-serif",
    maxWidth: 720,
    margin: "0 auto",
    padding: "40px 16px",
    textAlign: "center",
  },
  hero: {
    marginTop: 40,
  },
  headline: {
    fontSize: "clamp(28px, 5vw, 40px)",
    fontWeight: 600,
    marginBottom: 12,
  },
  subheadline: {
    fontSize: 18,
    opacity: 0.85,
    marginBottom: 20,
  },
  primaryButton: {
    padding: "14px 22px",
    fontSize: 16,
    borderRadius: 10,
    border: "none",
    background: "#111",
    color: "#fff",
    cursor: "pointer",
    marginBottom: 12,
  },
  subtle: {
    fontSize: 13,
    opacity: 0.6,
  },
};
