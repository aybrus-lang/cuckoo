"use client";

import { useState } from "react";
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

  return (
    <section style={{ marginBottom: 32 }}>
      

      <h2>Sender</h2>

      {/* Receiver link */}
      <div style={{ marginBottom: 12 }}>
        <small>Receiver link</small>
        <div style={{ display: "flex", gap: 8 }}>
          <input
            value={
              typeof window !== "undefined"
                ? `${window.location.origin}/?invite=receiver`
                : ""
            }
            readOnly
            style={{ flex: 1 }}
          />
          <button
            onClick={() => {
              navigator.clipboard.writeText(
                `${window.location.origin}/?invite=receiver`
              );
            }}
          >
            Copy
          </button>
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
  Send notification
</button>


{sentFlash ? "Sent ✓" : "Send notification"}

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
