"use client";

import { useEffect, useState } from "react";
import { Invitation } from "../lib/types";

type SenderViewProps = {
  sendNotification: () => void;
  sendInvite: () => void;
  inviteName: string;
  setInviteName: (name: string) => void;
  invitations: Invitation[];
  cancelInvite: (id: string) => void;
};

export default function SenderView({
  sendNotification,
  sendInvite,
  inviteName,
  setInviteName,
  invitations,
  cancelInvite,
}: SenderViewProps) {
  const [receiverLink, setReceiverLink] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      setReceiverLink(window.location.origin);
    }
  }, []);

  function copyLink(link: string) {
    navigator.clipboard.writeText(link);
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
      <h1 style={{ marginBottom: 6 }}>🐦 Cuckoo — Sender</h1>
      <p style={{ opacity: 0.7, marginBottom: 28 }}>
        Control access. Control timing. Choose who is included.
      </p>

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

        {invitations.map((invite) => {
          const personalLink = `${receiverLink}/?invite=${invite.token}`;

          return (
            <div
              key={invite.id}
              style={{
                padding: "12px",
                borderRadius: 10,
                background: "rgba(255,255,255,0.05)",
                marginBottom: 12,
              }}
            >
              <div style={{ marginBottom: 6 }}>
                <strong>{invite.name}</strong> — {invite.status}
              </div>

              <div
                style={{
                  fontSize: 12,
                  opacity: 0.7,
                  wordBreak: "break-all",
                  marginBottom: 8,
                }}
              >
                {personalLink}
              </div>

              <button
                className="luxury-btn"
                style={{ width: "100%", marginBottom: 8 }}
                onClick={() => copyLink(personalLink)}
              >
                Copy link
              </button>

              <button
                className="luxury-btn"
                style={{
                  width: "100%",
                  border: "1px solid rgba(255,80,80,0.4)",
                  color: "#ffb3b3",
                }}
                onClick={() => cancelInvite(invite.id)}
              >
                Cancel invitation
              </button>
            </div>
          );
        })}
      </div>
    </main>
  );
}
