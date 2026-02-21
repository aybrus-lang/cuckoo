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
        background: "radial-gradient(circle at top, #111 0%, #050505 60%)",
        color: "white",
        padding: "32px 20px",
        maxWidth: 520,
        margin: "0 auto",
      }}
    >
      <h1 style={{ marginBottom: 6 }}>Sender</h1>
      <p style={{ opacity: 0.7, marginBottom: 28 }}>
        Control access. Control timing. Choose who is included.
      </p>

      {/* Receiver link */}
      <div style={{ marginBottom: 28 }}>
        <small style={{ opacity: 0.6 }}>Receiver link</small>
        <div style={{ display: "flex", gap: 10, marginTop: 6 }}>
          <input
            value={receiverLink}
            readOnly
            style={{
              flex: 1,
              background: "rgba(255,255,255,0.06)",
              border: "1px solid rgba(255,255,255,0.12)",
              color: "white",
              padding: "10px",
              borderRadius: 8,
            }}
          />
          <button className="luxury-btn" onClick={copyLink}>
            Copy
          </button>
        </div>
      </div>

      {/* Send moment */}
      <button
        className="luxury-btn primary pulse"
        onClick={sendNotification}
        style={{ width: "100%", marginBottom: 26 }}
      >
        Send moment
      </button>

      {/* Invite input */}
      <div style={{ marginBottom: 26 }}>
        <input
          placeholder="Invite name"
          value={inviteName}
          onChange={(e) => setInviteName(e.target.value)}
          style={{
            width: "100%",
            marginBottom: 10,
            background: "rgba(255,255,255,0.06)",
            border: "1px solid rgba(255,255,255,0.12)",
            color: "white",
            padding: "12px",
            borderRadius: 8,
          }}
        />

        <button
          className="luxury-btn"
          onClick={sendInvite}
          style={{ width: "100%" }}
        >
          Send invite
        </button>
      </div>

      {/* Invitations */}
      <div>
        <h3 style={{ marginBottom: 10, opacity: 0.85 }}>Invitations</h3>

        {invitations.length === 0 && (
          <p style={{ opacity: 0.6 }}>No invitations yet</p>
        )}

        {invitations.map((invite) => (
          <div
            key={invite.id}
            style={{
              padding: "10px 12px",
              borderRadius: 8,
              background: "rgba(255,255,255,0.05)",
