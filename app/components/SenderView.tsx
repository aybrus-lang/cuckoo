"use client";

import { useState, useEffect } from "react";
import styles from "./SenderView.module.css";

type Invitation = {
  id: number;
  name: string;
  status: "invited" | "accepted" | "rejected";
};

type SenderViewProps = {
  sendNotification: () => void;
  sendInvite: () => void;
  inviteName: string;
  setInviteName: (name: string) => void;
  invitations: Invitation[];
};

export default function SenderView({
  sendNotification,
  sendInvite,
  inviteName,
  setInviteName,
  invitations,
}: SenderViewProps) {
  const [sentFlash, setSentFlash] = useState(false);
  const [inviteFlash, setInviteFlash] = useState(false);
  const [receiverLink, setReceiverLink] = useState("");

  // Generate correct production URL at runtime
  useEffect(() => {
    if (typeof window !== "undefined") {
      setReceiverLink(`${window.location.origin}/?invite=receiver`);
    }
  }, []);

  function copyLink() {
    if (!receiverLink) return;
    navigator.clipboard.writeText(receiverLink);
  }

  return (
    <section style={{ marginBottom: 32 }}>
      <h2>Sender</h2>

      {/* Receiver link */}
      <div style={{ marginBottom: 12 }}>
        <small>Receiver link</small>
        <div style={{ display: "flex", gap: 8 }}>
          <input value={receiverLink} readOnly style={{ flex: 1 }} />
          <button onClick={copyLink}>Copy</button>
        </div>
      </div>

      {/* Send notification */}
      <button
        className={`${styles.sendBtn} ${sentFlash ? styles.sent : ""}`}
        onClick={() => {
          sendNotification();
          setSentFlash(true);
          setTimeout(() => setSentFlash(false), 600);
        }}
      >
        {sentFlash ? "Sent ✓" : "Send notification"}
      </button>

      {sentFlash && (
        <div className={styles.flash}>
          ✓ Notification sent
        </div>
      )}

      {/* Invite input */}
      <div style={{ marginTop: 16 }}>
        <input
          placeholder="Invite name"
          value={inviteName}
          onChange={(e) => setInviteName(e.target.value)}
        />
        <button
          onClick={() => {
            sendInvite();
            setInviteFlash(true);
            setTimeout(() => setInviteFlash(false), 1400);
          }}
        >
          Send invite
        </button>

        {inviteFlash && (
          <div className={styles.inviteFlash}>
            ✓ Invite sent
          </div>
        )}
      </div>

      {/* Invitations list */}
      <div style={{ marginTop: 16 }}>
        <h3>Invitations</h3>
        {invitations.map((invite) => (
          <div key={invite.id}>
            {invite.name} — {invite.status}
          </div>
        ))}
      </div>
    </section>
  );
}
