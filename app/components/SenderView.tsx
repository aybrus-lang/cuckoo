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
  const [receiverLink, setReceiverLink] = useState("");

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
    <main
      style={{
        minHeight: "100vh",
        background: "radial-gradient(circle at 50% 20%, #1a1a1a 0%, #0a0a0a 60%)",
        color: "white",
        display: "flex",
        justifyContent: "center",
        padding: 20,
      }}
    >
      <div
        style={{
          width: "100%",
          maxWidth: 520,
          background: "rgba(255,255,255,0.04)",
          backdropFilter: "blur(10px)",
          borderRadius: 18,
          padding: 24,
          boxShadow: "0 20px 60px rgba(0,0,0,0.6)",
        }}
      >
        <h1 style={{ fontSize: 26, marginBottom: 6 }}>Sender</h1>
        <p style={{ opacity: 0.6, marginBottom: 24 }}>
          Share moments with selected people.
        </p>

        {/* Receiver link */}
        <div style={{ marginBottom: 24 }}>
          <small style={{ opacity: 0.6 }}>Receiver link</small>
          <div style={{ display: "flex", gap: 8, marginTop: 6 }}>
            <input
              value={receiverLink}
              readOnly
              style={{
                flex: 1,
                padding: "12px 14px",
                borderRadius: 10,
                border: "1px solid rgba(255,255,255,0.12)",
                background: "rgba(255,255,255,0.06)",
                color: "white",
              }}
            />
            <button
              onClick={copyLink}
              style={{
                padding: "12px 16px",
                borderRadius: 10,
                border: "1px solid rgba(255,255,255,0.15)",
                background: "rgba(255,255,255,0.08)",
                color: "white",
                cursor: "pointer",
              }}
            >
              Copy
            </button>
          </div>
        </div>

        {/* Invite input */}
        <div style={{ display: "flex", gap: 10, marginBottom: 24 }}>
          <input
            value={inviteName}
            onChange={(e) => setInviteName(e.target.value)}
            placeholder="Invite name"
            style={{
              flex: 1,
              padding: "12px 14px",
              borderRadius: 10,
              border: "1px solid rgba(255,255,255,0.12)",
              background: "rgba(255,255,255,0.06)",
              color: "white",
            }}
          />

          <button
            onClick={sendInvite}
            style={{
              padding: "12px 16px",
              borderRadius: 10,
              border: "1px solid rgba(255,255,255,0.15)",
              background: "rgba(255,255,255,0.08)",
              color: "white",
              cursor: "pointer",
            }}
          >
            Invite
          </button>
        </div>

        {/* Send notification */}
        <button
          onClick={sendNotification}
          style={{
            width: "100%",
            padding: "14px",
            borderRadius: 12,
            border: "1px solid rgba(255,255,255,0.15)",
            background: "rgba(255,255,255,0.08)",
            color: "white",
            fontSize: 15,
            marginBottom: 24,
            cursor: "pointer",
          }}
        >
          Send Moment
        </button>

        {/* Invitations */}
        <h3 style={{ marginBottom: 12 }}>Invitations</h3>

        {invitations.length === 0 && (
          <p style={{ opacity: 0.5 }}>No invitations yet</p>
        )}

        {invitations.map((invite) => (
          <div
            key={invite.id}
            style={{
              padding: 14,
              borderRadius: 12,
              background: "rgba(255,255,255,0.05)",
              border: "1px solid rgba(255,255,255,0.08)",
              marginBottom: 10,
            }}
          >
            {invite.name} — {invite.status}
          </div>
        ))}
      </div>
    </main>
  );
}
