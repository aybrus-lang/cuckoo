"use client";
<h1 style={{ marginBottom: 6 }}>🔴🐦 Cuckoo</h1>

import { useState, useEffect } from "react";
import styles from "./SenderView.module.css";
import { Invitation } from "../lib/types";

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
      setReceiverLink(`${window.location.origin}`);
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
          <button className="luxury-btn" onClick={() => copyLink(receiverLink)}>
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

      {/* Invitations with personal links */}
      <div>
        <h3 style={{ marginBottom: 10, opacity: 0.85 }}>Invitations</h3>

        {invitations.length === 0 && (
          <p style={{ opacity: 0.6 }}>No one has been invited yet.</p>
        )}

        {invitations.map((invite) => {
          const personalLink = `${receiverLink}/?invite=${invite.token}`;

          return (
            <div
              key={invite.id}
              style={{
                padding: "12px 14px",
                borderRadius: 10,
                background: "rgba(255,255,255,0.05)",
                marginBottom: 12,
              }}
            >
              <div style={{ marginBottom: 6 }}>
                {invite.name} — {invite.status}
              </div>

              {invite.token && (
                <>
                  <div style={{ fontSize: 12, opacity: 0.7 }}>
                    {personalLink}
                  </div>

                  <button
                    className="luxury-btn"
                    style={{ marginTop: 8 }}
                    onClick={() => copyLink(personalLink)}
                  >
                    Copy personal link
                  </button>
                </>
              )}
            </div>
          );
        })}
      </div>
    </main>
  );
}
