"use client";

import { useState, useEffect } from "react";
import { Invitation, Notification } from "../lib/types";

type ReceiverViewProps = {
  invitations: Invitation[];
  acceptInvite: (id: string) => void;
  rejectInvite: (id: string) => void;
  hasAccess: boolean;
  notificationsByCreator: { [creator: string]: Notification[] };
  dismissNotification: (id: string) => void;
  acceptedMessage: string | null;
  now: number;
};

export default function ReceiverView({
  invitations,
  acceptInvite,
  rejectInvite,
  hasAccess,
  notificationsByCreator,
  dismissNotification,
  acceptedMessage,
  now,
}: ReceiverViewProps) {
  const [showMoment, setShowMoment] = useState(false);

  useEffect(() => {
    if (acceptedMessage) {
      setShowMoment(true);
      const timer = setTimeout(() => setShowMoment(false), 2000);
      return () => clearTimeout(timer);
    }
  }, [acceptedMessage]);

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
      <h1 style={{ marginBottom: 6 }}>Receiver</h1>

      {invitations.length === 0 && (
        <p style={{ opacity: 0.7, marginBottom: 28 }}>
          You’ve been invited. <br />
          You were selected to be included in private moments.<br />
          Access is limited. Participation is optional.
        </p>
      )}

      {invitations.map((invite) =>
        invite.status === "invited" ? (
          <div
            key={invite.id}
            style={{
              padding: "20px",
              marginBottom: 16,
              borderRadius: 10,
              background: "rgba(255,255,255,0.05)",
            }}
          >
            <div style={{ marginBottom: 12 }}>
              You have been invited by the sender.
            </div>
            <div style={{ display: "flex", gap: 10 }}>
              <button
                className="luxury-btn primary"
                style={{ flex: 1 }}
                onClick={() => acceptInvite(invite.id)}
              >
                Accept
              </button>
              <button
                className="luxury-btn"
                style={{ flex: 1 }}
                onClick={() => rejectInvite(invite.id)}
              >
                Reject
              </button>
            </div>
          </div>
        ) : null
      )}

      {acceptedMessage && showMoment && (
        <div
          style={{
            marginTop: 20,
            padding: 16,
            borderRadius: 12,
            background: "rgba(255,255,255,0.1)",
            textAlign: "center",
            animation: "pulse 1.2s ease-out",
          }}
        >
          {acceptedMessage}
        </div>
      )}

      {hasAccess && (
        <div style={{ marginTop: 28 }}>
          <h3 style={{ marginBottom: 12, opacity: 0.85 }}>Moments</h3>
          {Object.entries(notificationsByCreator).map(([creator, notifs]) =>
            notifs.length === 0 ? (
              <p key={creator} style={{ opacity: 0.6 }}>
                No moments yet.
              </p>
            ) : (
              notifs.map((n) => (
                <div
                  key={n.id}
                  style={{
                    marginBottom: 12,
                    padding: "12px 14px",
                    borderRadius: 10,
                    background: "rgba(255,255,255,0.05)",
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "center",
                  }}
                >
                  <div>
                    <strong>{creator}:</strong> {n.message}{" "}
                    <span style={{ opacity: 0.6, fontSize: 12 }}>
                      {new Date(n.expiresAt).toLocaleTimeString()}
                    </span>
                  </div>
                  <button
                    className="luxury-btn"
                    style={{ height: 32, padding: "0 12px" }}
                    onClick={() => dismissNotification(n.id)}
                  >
                    Dismiss
                  </button>
                </div>
              ))
            )
          )}
        </div>
      )}

      <style jsx>{`
        @keyframes pulse {
          0% {
            transform: scale(0.95);
            opacity: 0.6;
          }
          50% {
            transform: scale(1.05);
            opacity: 1;
          }
          100% {
            transform: scale(1);
            opacity: 0.9;
          }
        }
      `}</style>
    </main>
  );
}
